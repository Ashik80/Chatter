using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Application.Channels
{
    public class ChannelDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsAdmin { get; set; }
    }
}