using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly IJwtGenerator jwtGenerator;
            public Handler(DataContext context, IUserAccessor userAccessor, IJwtGenerator jwtGenerator)
            {
                this.jwtGenerator = jwtGenerator;
                this.userAccessor = userAccessor;
                this.context = context;
            }
            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUser = await context.Users
                    .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetCurrentUsername());

                var user = new User
                {
                    DisplayName = currentUser.DisplayName,
                    UserName = currentUser.UserName,
                    Code = currentUser.Code,
                    Token = jwtGenerator.GetToken(currentUser),
                    Image = currentUser.Image
                };

                return user;
            }
        }
    }
}