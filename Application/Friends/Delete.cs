using System;
using System.Linq;
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
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
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
                
                var friend = await context.Friends
                    .FirstOrDefaultAsync(x => x.AppUser == currentUser && x.FriendId == request.Id);

                var friend2 = await context.Friends
                    .FirstOrDefaultAsync(x => x.AppUserId == request.Id && x.Friend == currentUser);

                if(friend == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new{Friend = "not found"});
                }

                context.Friends.Remove(friend);
                context.Friends.Remove(friend2);

                var success = await context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem deleting friend");
            }
        }
    }
}