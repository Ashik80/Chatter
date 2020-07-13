using System.Linq;
using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor accessor;
        public UserAccessor(IHttpContextAccessor accessor)
        {
            this.accessor = accessor;
        }

        public string GetCurrentUsername()
        {
            var userName = accessor.HttpContext.User?.Claims?
                .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            return userName;
        }
    }
}