using System;
using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace StreamService
{
    public class TokenValidationService: ITokenValidationService
    {
        private readonly IJwtAlgorithm _algorithm;
        private readonly IJsonSerializer _serializer;
        private readonly IDateTimeProvider _provider;
        private readonly IJwtValidator _validator;
        private readonly IBase64UrlEncoder _urlEncoder;
        private readonly IJwtDecoder _decoder;
        private readonly IOptions<SecretKeys> _secretKeys;
        private readonly ILogger<TokenValidationService> _logger;

        public TokenValidationService(IOptions<SecretKeys> secretKeys, ILogger<TokenValidationService> logger)
        {
            _algorithm = new HMACSHA256Algorithm();
            _serializer = new JsonNetSerializer();
            _provider = new UtcDateTimeProvider();
            _urlEncoder = new JwtBase64UrlEncoder();
            _validator = new JwtValidator(_serializer, _provider);
            _decoder = new JwtDecoder(_serializer, _validator, _urlEncoder, _algorithm);
            _secretKeys = secretKeys;
            _logger = logger;
        }

        public TokenModel ValidateToken(string token)
        {
            try
            {
                var tokenJsonData = _decoder.Decode(token, _secretKeys.Value.StreamTokenSecretKey, verify: true);
                var tokenModel = JsonConvert.DeserializeObject<TokenModel>(tokenJsonData);

                return tokenModel;
            }
            catch (Exception ex)
            {
                _logger.LogError("Token validation filed", ex);
                throw;
            }

        }
    }
}