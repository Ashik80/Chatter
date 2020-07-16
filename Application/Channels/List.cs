using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Channels
{
    public class List
    {
        public class Query : IRequest<List<ChannelDto>> { }

        public class Handler : IRequestHandler<Query, List<ChannelDto>>
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
            public async Task<List<ChannelDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                    .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetCurrentUsername());

                var userChannels = await context.ChannelUser
                    .Include(x => x.Channel)
                    .Where(x => x.AppUser == user).ToListAsync();

                var channels = new List<Channel>();

                foreach (var userChannel in userChannels)
                {
                    channels.Add(userChannel.Channel);
                }

                var channelDto = mapper.Map<List<Channel>, List<ChannelDto>>(channels);

                return channelDto;
            }
        }
    }
}