using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Friends
{
    public class Add
    {
        public class Command : IRequest
        {
            public string Code { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Code).NotEmpty()
                    .MinimumLength(7).WithMessage("User code is 7 letters long");
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                    .FirstOrDefaultAsync(x => x.Code == request.Code);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { User = "not found" });
                }

                var currentUser = await context.Users
                    .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetCurrentUsername());

                var existingFriendReq = await context.FriendRequest
                    .AnyAsync(x => x.Request == currentUser && x.User == user);

                var existingFriendReq2 = await context.FriendRequest
                    .AnyAsync(x => x.User == currentUser && x.Request == user);
                
                if(existingFriendReq || existingFriendReq2)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new{Request = "already exists"});
                }

                var existingFriend = await context.Friends
                    .AnyAsync(x => x.AppUser == currentUser && x.Friend == user);
                
                if(existingFriend)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new{Friend = "already exists"});
                }

                var friendRequest = new FriendRequest
                {
                    User = user,
                    Request = currentUser
                };

                context.FriendRequest.Add(friendRequest);

                var success = await context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem adding friend");
            }
        }
    }
}