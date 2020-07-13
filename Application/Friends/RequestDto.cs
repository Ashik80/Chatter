using System.Collections.Generic;

namespace Application.Friends
{
    public class RequestDto
    {
        public List<ReceivedReqDto> ReceivedRequests {get; set;}
        public List<SentReqDto> SentRequests { get; set; }
    }
}