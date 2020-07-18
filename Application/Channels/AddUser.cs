using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Channels
{
    public class AddUser
    {
        public class Command : IRequest
        {
            public Command(Guid id, string userId)
            {
                this.ChannelId = id;
                this.UserId = userId;
            }

            public Guid ChannelId { get; set; }
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.FindAsync(request.UserId);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { user = "Not found" });
                }

                var channel = await context.Channel.FindAsync(request.ChannelId);

                if (channel == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { channel = "Not found" });
                }

                var existing = await context.ChannelUser
                    .FirstOrDefaultAsync(x => x.AppUser == user && x.Channel == channel);

                if (existing != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest,
                        new{user = "Already exists in this channel"});
                }

                var channelUser = new ChannelUser
                {
                    Channel = channel,
                    AppUser = user,
                    isAdmin = false
                };

                context.ChannelUser.Add(channelUser);

                var success = await context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving activity");
            }
        }
    }
}