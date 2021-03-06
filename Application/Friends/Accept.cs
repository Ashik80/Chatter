using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Friends
{
    public class Accept
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly IIdGenerator idGenerator;
            public Handler(DataContext context, IUserAccessor userAccessor, IIdGenerator idGenerator)
            {
                this.idGenerator = idGenerator;
                this.userAccessor = userAccessor;
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                    .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetCurrentUsername());

                var friend = await context.Users.FindAsync(request.Id);

                var frndRqst = await context.FriendRequest
                    .FirstOrDefaultAsync(x => x.Request == friend && x.User == user);

                if (frndRqst == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Request = "not found" });
                }

                var commonID = idGenerator.GetCommonId();

                var friends = new Domain.Friends
                {
                    AppUser = user,
                    Friend = friend,
                    FriendshipId = commonID
                };

                var frineds2 = new Domain.Friends
                {
                    AppUser = friend,
                    Friend = user,
                    FriendshipId = commonID
                };

                context.Friends.Add(friends);
                context.Friends.Add(frineds2);
                context.FriendRequest.Remove(frndRqst);

                var success = await context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("A problem occurred");
            }
        }
    }
}