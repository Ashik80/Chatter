using System;
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

namespace Application.Message.Friend
{
    public class Send
    {
        public class Command : IRequest<MessageDto>
        {
            public string Id { get; set; }
            public string Text { get; set; }
            public string CommonId { get; set; }
        }

        public class Handler : IRequestHandler<Command, MessageDto>
        {
            private readonly DataContext context;
            private readonly IUserAccessor accessor;
            private readonly IMapper mapper;
            public Handler(DataContext context, IUserAccessor accessor, IMapper mapper)
            {
                this.mapper = mapper;
                this.accessor = accessor;
                this.context = context;
            }

            public async Task<MessageDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.FindAsync(request.Id);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { User = "not found" });
                }

                var currentUser = await context.Users
                    .FirstOrDefaultAsync(x => x.UserName == accessor.GetCurrentUsername());

                var isFriend = await context.Friends
                    .AnyAsync(x => x.AppUser == currentUser && x.Friend == user);

                if (!isFriend)
                {
                    throw new RestException(HttpStatusCode.Forbidden, new { User = "is not a friend" });
                }

                var message = new FriendMessage
                {
                    Text = request.Text,
                    SentTime = DateTime.Now,
                    Sender = currentUser,
                    Receiver = user
                };

                context.FriendMessage.Add(message);

                var success = await context.SaveChangesAsync() > 0;

                if (success)
                {
                    var messageDto = mapper.Map<FriendMessage, MessageDto>(message);
                    return messageDto;
                }

                throw new Exception("Problem sending message");
            }
        }
    }
}