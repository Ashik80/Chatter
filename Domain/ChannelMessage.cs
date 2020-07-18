using System;

namespace Domain
{
    public class ChannelMessage : Message
    {
        public Guid ChannelId { get; set; }
        public Channel Channel { get; set; }
    }
}