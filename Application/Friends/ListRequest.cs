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

namespace Application.Friends
{
    public class ListRequest
    {
        public class Query : IRequest<RequestDto>
        {
            public Query(string predicate)
            {
                this.Predicate = predicate;
            }

            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, RequestDto>
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
            public async Task<RequestDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                    .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetCurrentUsername());

                List<FriendRequest> requestList;
                RequestDto requestDto = new RequestDto();

                switch (request.Predicate)
                {
                    case "sent":
                        requestList = await context.FriendRequest
                            .Include(x => x.User)
                            .Where(x => x.Request == user).ToListAsync();
                        requestDto.SentRequests = mapper
                            .Map<List<FriendRequest>, List<SentReqDto>>(requestList);
                        break;

                    case "received":
                        requestList = await context.FriendRequest
                            .Include(x => x.Request)
                            .Where(x => x.User == user).ToListAsync();
                        requestDto.ReceivedRequests = mapper
                            .Map<List<FriendRequest>, List<ReceivedReqDto>>(requestList);
                        break;
                }

                return requestDto;
            }
        }
    }
}