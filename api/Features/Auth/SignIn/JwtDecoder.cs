using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace Octogami.LunchTracker.Api.Features.Auth.SignIn
{
    public interface IJwtDecoder
    {
        DecodedUserData DecodeJwt(string jwt);
    }

    public class JwtDecoder : IJwtDecoder
    {
        public DecodedUserData DecodeJwt(string jwt)
        {
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadJwtToken(jwt);
            return new DecodedUserData
            {
                Issuer = jsonToken.Claims.First(x => x.Type == "iss").Value,
                Audience = jsonToken.Claims.First(x => x.Type == "aud").Value,
                ExternalUserId = jsonToken.Claims.First(x => x.Type == "sub").Value,
                FirstName = jsonToken.Claims.First(x => x.Type == "given_name").Value,
                LastName = jsonToken.Claims.First(x => x.Type == "family_name").Value,
            };
        }
    }

    public class CachingJwtDecoder : IJwtDecoder
    {
        private readonly IJwtDecoder _jwtDecoder;
        private Dictionary<string, DecodedUserData> _cache = new Dictionary<string, DecodedUserData>();

        public CachingJwtDecoder(IJwtDecoder jwtDecoder)
        {
            _jwtDecoder = jwtDecoder;
        }

        public DecodedUserData DecodeJwt(string jwt)
        {
            var found = _cache.TryGetValue(jwt, out DecodedUserData data);
            if (found)
            {
                return data;
            }

            var decoded = _jwtDecoder.DecodeJwt(jwt);
            _cache.TryAdd(jwt, decoded);
            return decoded;
        }
    }


    public class DecodedUserData
    {
        public string Issuer { get; set; }

        public string Audience { get; set; }

        public string ExternalUserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}
