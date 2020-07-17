using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public string Code { get; set; }
        public ICollection<ChannelUser> ChannelUsers { get; set; }
        public ICollection<Friends> Friends { get; set; }
        public ICollection<FriendRequest> SentRequests { get; set; }
        public ICollection<FriendRequest> ReceivedRequests { get; set; }
    }
}