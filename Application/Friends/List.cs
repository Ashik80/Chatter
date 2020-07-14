using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Friends
{
    public class List
    {
        public class Query : IRequest<List<FriendDto>> { }

        public class Handler : IRequestHandler<Query, List<FriendDto>>
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
            public async Task<List<FriendDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var friends = await context.Friends
                    .Include(x => x.Friend)
                    .Where(x => x.AppUser.UserName == userAccessor.GetCurrentUsername())
                    .ToListAsync();

                var friendDto = mapper.Map<List<Domain.Friends>, List<FriendDto>>(friends);

                return friendDto;
            }
        }
    }
}