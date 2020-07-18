using System;

namespace Application.Message.Channel
{
    public class MessageDto
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public DateTime SentTime { get; set; }
        public string UserId { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
    }
}