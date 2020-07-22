using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Channels
{
    public class Details
    {
        public class Query : IRequest<ChannelDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ChannelDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;

            }
            public async Task<ChannelDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var channel = await context.Channel
                    .Include(x => x.ChannelMessages)
                        .ThenInclude(x => x.Sender)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                if (channel == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Channel = "not found" });
                }

                var channelDto = mapper.Map<Channel, ChannelDto>(channel);

                return channelDto;
            }
        }
    }
}