namespace Domain
{
    public class FriendMessage : Message
    {
        public string ReceiverId { get; set; }
        public AppUser Receiver { get; set; }
    }
}