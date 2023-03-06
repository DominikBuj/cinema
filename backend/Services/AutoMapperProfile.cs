namespace cinema.Services;

using cinema.Entities;
using cinema.Models;
using AutoMapper;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<User, SignInRequest>();
        CreateMap<User, SignInResponse>();
        CreateMap<SignUpRequest, SignInRequest>();
        CreateMap<SignUpRequest, User>();
        CreateMap<UpdateUserRequest, User>()
            .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember != null));
    }
}