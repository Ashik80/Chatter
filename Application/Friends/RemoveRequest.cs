using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Friends
{
    public class RemoveRequest
    {
        public class Command : IRequest
        {
            public Command(string id, string predicate)
            {
                this.Id = id;
                this.Predicate = Predicate;
            }
            public string Id { get; set; }
            public string Predicate { get; set; }
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
                var currentUser = await context.Users
                    .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetCurrentUsername());

                var queryAble = context.FriendRequest.AsQueryable();

                switch (request.Predicate)
                {
                    case "sent":
                        queryAble = context.FriendRequest
                            .Where(x => x.RequestId == currentUser.Id && x.UserId == request.Id);
                        break;

                    case "received":
                        queryAble = context.FriendRequest
                            .Where(x => x.RequestId == request.Id && x.User == currentUser);
                        break;
                }

                var friendRequest = await queryAble.FirstOrDefaultAsync();

                if (friendRequest == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Request = "not found" });
                }

                context.FriendRequest.Remove(friendRequest);

                var success = await context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem removing request");
            }
        }
    }
}