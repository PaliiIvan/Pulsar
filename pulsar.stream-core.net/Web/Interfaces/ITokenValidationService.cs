using Models;

namespace StreamInterfaces
{
    public interface ITokenValidationService
    {
        TokenModel ValidateToken(string token);
    }
}