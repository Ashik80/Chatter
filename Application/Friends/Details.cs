using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Message.Channel;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Friends
{
    public class Details
    {
        public class Query : IRequest<FriendDto>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, FriendDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor accessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor accessor)
            {
                this.accessor = accessor;
                this.mapper = mapper;
                this.context = context;
            }
            public async Task<FriendDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.Users.FindAsync(request.Id);

                var currentUser = await context.Users
                    .FirstOrDefaultAsync(x => x.UserName == accessor.GetCurrentUsername());

                var friend = await context.Friends
                    .FirstOrDefaultAsync(x => x.AppUser == currentUser && x.Friend == user);

                if(friend == null)
                {
                    throw new RestException(HttpStatusCode.Forbidden, new{Friend = "does not exist"});
                }

                var receivedMessages = await context.FriendMessage
                    .Where(x => x.Sender == user && x.Receiver == currentUser)
                    .ToListAsync();

                var sentMessages = await context.FriendMessage
                    .Where(x => x.Receiver == user && x.Sender == currentUser)
                    .ToListAsync();
                
                var rcvMsgDto = mapper.Map<List<FriendMessage>, List<MessageDto>>(receivedMessages);

                var sntMsgDto = mapper.Map<List<FriendMessage>, List<MessageDto>>(sentMessages);

                var messages = new List<MessageDto>();

                foreach(var message in rcvMsgDto)
                {
                    messages.Add(message);
                }

                foreach(var message in sntMsgDto)
                {
                    messages.Add(message);
                }

                messages.OrderBy(x => x.SentTime);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { User = "not found" });
                }

                var friendDto = new FriendDto
                {
                    Id = user.Id,
                    DisplayName = user.DisplayName,
                    Code = user.Code,
                    Image = user.Image,
                    FriendshipID = friend.FriendshipId,
                    Messages = messages
                };

                return friendDto;
            }
        }
    }
}