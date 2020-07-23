using Application.Message.Channel;
using AutoMapper;
using Domain;

namespace Application.Friends
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<FriendRequest, ReceivedReqDto>()
                .ForMember(x => x.DisplayName, opt => opt.MapFrom(s => s.Request.DisplayName))
                .ForMember(x => x.Code, opt => opt.MapFrom(s => s.Request.Code))
                .ForMember(x => x.Image, opt => opt.MapFrom(s => s.Request.Image))
                .ForMember(x => x.Id, opt => opt.MapFrom(s => s.Request.Id));

            CreateMap<FriendRequest, SentReqDto>()
                .ForMember(x => x.DisplayName, opt => opt.MapFrom(s => s.User.DisplayName))
                .ForMember(x => x.Code, opt => opt.MapFrom(s => s.User.Code))
                .ForMember(x => x.Image, opt => opt.MapFrom(s => s.User.Image))
                .ForMember(x => x.Id, opt => opt.MapFrom(s => s.User.Id));

            CreateMap<Domain.Friends, FriendDto>()
                .ForMember(x => x.Id, opt => opt.MapFrom(s => s.Friend.Id))
                .ForMember(x => x.DisplayName, opt => opt.MapFrom(s => s.Friend.DisplayName))
                .ForMember(x => x.Code, opt => opt.MapFrom(s => s.Friend.Code))
                .ForMember(x => x.Image, opt => opt.MapFrom(s => s.Friend.Image));

            CreateMap<FriendMessage, MessageDto>()
                .ForMember(x => x.UserId, o => o.MapFrom(s => s.Sender.Id))
                .ForMember(x => x.DisplayName, o => o.MapFrom(s => s.Sender.DisplayName))
                .ForMember(x => x.Image, o => o.MapFrom(s => s.Sender.Image));
        }
    }
}