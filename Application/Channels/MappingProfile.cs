using System.Linq;
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
        }
    }
}