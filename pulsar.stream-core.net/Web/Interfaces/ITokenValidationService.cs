
namespace StreamService
{
    public interface ITokenValidationService
    {
        TokenModel ValidateToken(string token);
    }
}