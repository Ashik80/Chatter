using System;

namespace Domain
{
    public class FriendRequest
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public string RequestId { get; set; }
        public AppUser Request { get; set; }
    }
}