namespace Domain
{
    public class Friends
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public string FriendId { get; set; }
        public AppUser Friend { get; set; }
    }
}