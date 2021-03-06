using System.Linq;
using Application.Message.Channel;
using AutoMapper;
using Domain;

namespace Application.Channels
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Channel, ChannelDto>()
                .ForMember(x => x.IsAdmin, o => o.MapFrom(s => 
                    s.ChannelUsers.FirstOrDefault(x => x.isAdmin).isAdmin));

            CreateMap<ChannelMessage, MessageDto>()
                .ForMember(x => x.UserId, o => o.MapFrom(s => s.Sender.Id))
                .ForMember(x => x.DisplayName, o => o.MapFrom(s => s.Sender.DisplayName))
                .ForMember(x => x.Image, o => o.MapFrom(s => s.Sender.Image));
        }
    }
}