namespace kino.Services;

using kino.Entities;
using kino.Models;
using AutoMapper;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<User, SignInRequest>();
        CreateMap<User, SignInResponse>();
        CreateMap<SignUpRequest, SignInRequest>();
        CreateMap<UpdateUserRequest, User>()
            .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember != null));
    }
}