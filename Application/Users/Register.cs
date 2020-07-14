using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).NotEmpty()
                    .MinimumLength(6).WithMessage("Password must be at least 6 characters long")
                    .Matches("[A-Z]").WithMessage("Password must contain at least one uppercase letter")
                    .Matches("[a-z]").WithMessage("Password must contain at least one lowercase letter")
                    .Matches("[0-9]").WithMessage("Password must contain at least one number");
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly UserManager<AppUser> userManager;
            private readonly DataContext context;
            private readonly ICodeGenerator codeGenerator;
            private readonly IJwtGenerator jwtGenerator;
            public Handler(
                DataContext context, UserManager<AppUser> userManager,
                IJwtGenerator jwtGenerator, ICodeGenerator codeGenerator
            )
            {
                this.context = context;
                this.userManager = userManager;
                this.codeGenerator = codeGenerator;
                this.jwtGenerator = jwtGenerator;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await context.Users.AnyAsync(x => x.Email == request.Email))
                {
                    throw new RestException(HttpStatusCode.Unauthorized, 
                        new {user = "User with email already exists"});
                }

                if (await context.Users.AnyAsync(x => x.UserName == request.UserName))
                {
                    throw new RestException(HttpStatusCode.Unauthorized, 
                        new {user = "User with username already exists"});
                }

                var user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    UserName = request.UserName,
                    Email = request.Email,
                    Code = codeGenerator.GetUserCode()
                };

                var result = await userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        UserName = user.UserName,
                        Code = user.Code,
                        Token = jwtGenerator.GetToken(user),
                        Image = user.Image
                    };
                }

                throw new Exception("Problem registering user");
            }
        }
    }
}