using Domain;

namespace Application.Interfaces
{
    public interface IJwtGenerator
    {
        string GetToken(AppUser user);
    }
}