using System;
using System.Collections.Generic;

namespace Domain
{
    public class Channel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<ChannelUser> ChannelUsers { get; set; }
        public ICollection<ChannelMessage> ChannelMessages { get; set; }
    }
}