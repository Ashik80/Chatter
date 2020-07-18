using System;

namespace Domain
{
    public class Message
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public DateTime SentTime { get; set; }
        public string SenderId { get; set; }
        public AppUser Sender { get; set; }
    }
}