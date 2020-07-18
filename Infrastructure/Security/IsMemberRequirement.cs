using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security
{
    public class IsMemberRequirement : IAuthorizationRequirement
    {

    }

    public class IsMemberRequirementHandler : AuthorizationHandler<IsMemberRequirement>
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor accessor;
        public IsMemberRequirementHandler(DataContext context, IHttpContextAccessor accessor)
        {
            this.accessor = accessor;
            _context = context;
        }

        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            IsMemberRequirement requirement)
        {
            var currentUsername = accessor.HttpContext.User?.Claims?
                .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var currentUser = _context.Users.FirstOrDefault(x => x.UserName == currentUsername);

            var channelId = Guid.Parse(accessor.HttpContext.Request.RouteValues
                .FirstOrDefault(x => x.Key == "id").ToString());

            var channelUser = _context.ChannelUser
                .FirstOrDefault(x => x.AppUser == currentUser && x.ChannelId == channelId);

            if(channelUser != null)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}