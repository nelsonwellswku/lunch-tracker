using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.IdentityModel.Tokens;
using Octogami.LunchTracker.Api.Infrastructure.Configuration.Crypto;
using Octogami.LunchTracker.Api.Infrastructure.Data;
using Octogami.LunchTracker.Api.Infrastructure.Data.Entities;

namespace Octogami.LunchTracker.Api.Features.User.GetJwt
{
    public class GetJwtRequest : IRequest<GetJwtResponse>
    {
        public string ExternalToken { get; set; }
    }

    public class GetJwtResponse
    {
        public string Token { get; set; }
    }

    public class GetJwtRequestHandler : IRequestHandler<GetJwtRequest, GetJwtResponse>
    {
        private readonly LunchTrackerContext _db;
        private readonly CryptoConfiguration _cryptoConfiguration;

        public GetJwtRequestHandler(LunchTrackerContext db, CryptoConfiguration cryptoConfiguration)
        {
            _db = db;
            _cryptoConfiguration = cryptoConfiguration;
        }

        public async Task<GetJwtResponse> Handle(GetJwtRequest request, CancellationToken cancellationToken)
        {
            var decodedUserData = DecodeJwt(request.ExternalToken);
            var user = _db.AppUser.FirstOrDefault(x => x.ExternalUserId == decodedUserData.ExternalUserId);

            if (user == null)
            {
                var google = _db.IdentityProvider.Find(1);

                user = new AppUser
                {
                    ExternalUserId = decodedUserData.ExternalUserId,
                    FirstName = decodedUserData.FirstName,
                    LastName = decodedUserData.LastName,
                    CreateDate = DateTime.UtcNow,
                    UpdateDate = DateTime.UtcNow,
                    IdentityProvider = google,
                };

                _db.AppUser.Add(user);
            }

            await _db.SaveChangesAsync();
            var token = CreateJwt(user);
            var getJwtResponse = new GetJwtResponse { Token = token };

            return getJwtResponse;
        }

        private DecodedUserData DecodeJwt(string jwt)
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

        private string CreateJwt(AppUser user)
        {
            var key = _cryptoConfiguration.JwtKey;
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credentials);
            var payload = new JwtPayload
            {
                { "appUserId", user.AppUserId }
            };
            var jwtSecurityToken = new JwtSecurityToken(header, payload);
            var jwtHandler = new JwtSecurityTokenHandler();
            var tokenString = jwtHandler.WriteToken(jwtSecurityToken);
            return tokenString;
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
