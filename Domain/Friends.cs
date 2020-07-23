using System;

namespace Domain
{
    public class Friends
    {
        public Guid Id { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public string FriendId { get; set; }
        public AppUser Friend { get; set; }
        public string FriendshipId { get; set; }
    }
}