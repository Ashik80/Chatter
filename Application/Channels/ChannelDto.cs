using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Application.Message.Channel;

namespace Application.Channels
{
    public class ChannelDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsAdmin { get; set; }
        [JsonPropertyName("messages")]
        public ICollection<MessageDto> ChannelMessages { get; set; }
    }
}