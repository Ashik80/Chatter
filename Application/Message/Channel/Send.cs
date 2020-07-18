using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Message.Channel
{
    public class Send
    {
        public class Command : IRequest<MessageDto>
        {
            public Guid Id { get; set; }
            public string Text { get; set; }
        }

        public class Handler : IRequestHandler<Command, MessageDto>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly IMapper mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                this.mapper = mapper;
                this.userAccessor = userAccessor;
                this.context = context;
            }

            public async Task<MessageDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var channel = await context.Channel.FindAsync(request.Id);

                if (channel == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { channel = "Not found" });
                }

                var user = await context.Users
                    .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetCurrentUsername());

                var channelMessage = new ChannelMessage
                {
                    Text = request.Text,
                    SentTime = DateTime.Now,
                    Sender = user,
                    Channel = channel
                };

                context.ChannelMessage.Add(channelMessage);

                var success = await context.SaveChangesAsync() > 0;

                if (success)
                {
                    var messageDto = mapper.Map<ChannelMessage, MessageDto>(channelMessage);
                    return messageDto;
                }

                throw new Exception("Problem saving activity");
            }
        }
    }
}