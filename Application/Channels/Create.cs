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

namespace Application.Channels
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
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
                    .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetCurrentUsername());

                var channel = new Channel
                {
                    Id = request.Id,
                    Name = "#" + request.Name
                };

                var channelUser = new ChannelUser
                {
                    AppUser = user,
                    Channel = channel,
                    isAdmin = true
                };

                context.Channel.Add(channel);
                context.ChannelUser.Add(channelUser);

                var result = await context.SaveChangesAsync() > 0;

                if(result) return Unit.Value;

                throw new Exception("Problem creating channel");
            }
        }
    }
}