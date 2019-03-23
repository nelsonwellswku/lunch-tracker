using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
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

    public class GetJwtRequestValidation : AbstractValidator<GetJwtRequest>
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IJwtDecoder _jwtDecoder;

        private const string INVALID_GOOGLE_TOKEN = "Invalid Google token provided.";

        public GetJwtRequestValidation(IHttpClientFactory httpClientFactory, IJwtDecoder jwtDecoder)
        {
            RuleFor(x => x.ExternalToken)
                .Must(BeIssuedByGoogle).WithMessage(INVALID_GOOGLE_TOKEN)
                .When(request => BeIssuedByGoogle(request.ExternalToken))
                .MustAsync(BeValidatedByGoogle).WithMessage(INVALID_GOOGLE_TOKEN);

            _httpClientFactory = httpClientFactory;
            _jwtDecoder = jwtDecoder;
        }

        private bool BeIssuedByGoogle(string jwt)
        {
            var decoded = _jwtDecoder.DecodeJwt(jwt);
            if (decoded.Issuer != "accounts.google.com" || decoded.Issuer != "https://accounts.google.com")
            {
                return false;
            }

            return true;
        }

        private async Task<bool> BeValidatedByGoogle(string jwt, CancellationToken cancellationToken)
        {
            var httpClient = _httpClientFactory.CreateClient();
            var url = $"https://oauth2.googleapis.com/tokeninfo?id_token={jwt}";
            var response = await httpClient.GetAsync(url);
            return response.IsSuccessStatusCode;
        }
    }

    public class GetJwtRequestHandler : IRequestHandler<GetJwtRequest, GetJwtResponse>
    {
        private readonly LunchTrackerContext _db;
        private readonly CryptoConfiguration _cryptoConfiguration;
        private readonly IJwtDecoder _jwtDecoder;

        public GetJwtRequestHandler(LunchTrackerContext db, CryptoConfiguration cryptoConfiguration, IJwtDecoder jwtDecoder)
        {
            _db = db;
            _cryptoConfiguration = cryptoConfiguration;
            _jwtDecoder = jwtDecoder;
        }

        public async Task<GetJwtResponse> Handle(GetJwtRequest request, CancellationToken cancellationToken)
        {
            var decodedUserData = _jwtDecoder.DecodeJwt(request.ExternalToken);
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

        private string CreateJwt(AppUser user)
        {
            var key = _cryptoConfiguration.JwtKey;
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credentials);
            var unixNow = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            var payload = new JwtPayload
            {
                // typical fields
                { "iss", "lunchtracker" },
                { "sub", user.AppUserId },
                { "aud", "any" },  // TODO
                { "exp", DateTimeOffset.UtcNow.AddHours(1).ToUnixTimeSeconds() },
                { "nbf",  unixNow },
                { "iat", unixNow },

                // custom fields
                { "appUserId", user.AppUserId },
                { "firstName", user.FirstName },
                { "lastName", user.LastName }
            };
            var jwtSecurityToken = new JwtSecurityToken(header, payload);
            var jwtHandler = new JwtSecurityTokenHandler();
            var tokenString = jwtHandler.WriteToken(jwtSecurityToken);
            return tokenString;
        }
    }
}
