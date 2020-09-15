using System.Collections.Generic;
using Application.Message.Channel;

namespace Application.Friends
{
    public class FriendDto
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public string Code { get; set; }
        public string Image { get; set; }
        public string FriendshipID { get; set; }
        public ICollection<MessageDto> Messages { get; set; }
    }
}