using AutoMapper;
using Domain;

namespace Application.Message.Channel
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ChannelMessage, MessageDto>()
                .ForMember(x => x.UserId, o => o.MapFrom(s => s.Sender.Id))
                .ForMember(x => x.DisplayName, o => o.MapFrom(s => s.Sender.DisplayName))
                .ForMember(x => x.Image, o => o.MapFrom(s => s.Sender.Image));
        }
    }
}