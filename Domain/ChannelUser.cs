using System;

namespace Domain
{
    public class ChannelUser
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid ChannelId { get; set; }
        public Channel Channel { get; set; }
        public bool isAdmin { get; set; }
    }
}