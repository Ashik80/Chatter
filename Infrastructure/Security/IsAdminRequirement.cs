using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security
{
    public class IsAdminRequirement : IAuthorizationRequirement
    {

    }

    public class IsAdminRequirementHandler : AuthorizationHandler<IsAdminRequirement>
    {
        private readonly DataContext dataContext;
        private readonly IHttpContextAccessor accessor;
        public IsAdminRequirementHandler(DataContext dataContext, IHttpContextAccessor accessor)
        {
            this.accessor = accessor;
            this.dataContext = dataContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            IsAdminRequirement requirement)
        {
            var userName = accessor.HttpContext.User?.Claims?
                .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var channelId = Guid.Parse(accessor.HttpContext.Request.RouteValues
                .FirstOrDefault(x => x.Key == "id").Value.ToString());

            var user = dataContext.Users.FirstOrDefault(x => x.UserName == userName);

            var admin = dataContext.ChannelUser
                .FirstOrDefault(x => x.ChannelId == channelId && x.AppUserId == user.Id && x.isAdmin);

            if(admin != null)
            {
                context.Succeed(requirement);
            }
            
            return Task.CompletedTask;
        }
    }
}