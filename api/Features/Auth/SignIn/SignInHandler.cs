using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Octogami.LunchTracker.Api.Infrastructure.Data;

namespace Octogami.LunchTracker.Api.Features.Auth.SignIn
{
    public class SignInRequest : IRequest<SignInResponse>
    {
        public string ExternalToken { get; set; }
    }

    public class SignInResponse
    {
        public int AppUserId { get; set; }
    }

    public class GetJwtRequestValidation : AbstractValidator<SignInRequest>
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

    public class SignInRequestHandler : IRequestHandler<SignInRequest, SignInResponse>
    {
        private readonly LunchTrackerContext _db;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IJwtDecoder _jwtDecoder;

        public SignInRequestHandler(LunchTrackerContext db, IHttpContextAccessor httpContextAccessor, IJwtDecoder jwtDecoder)
        {
            _db = db;
            _httpContextAccessor = httpContextAccessor;
            _jwtDecoder = jwtDecoder;
        }

        public async Task<SignInResponse> Handle(SignInRequest request, CancellationToken cancellationToken)
        {
            var decoded = _jwtDecoder.DecodeJwt(request.ExternalToken);
            var user = await _db.AppUser.FirstOrDefaultAsync(x => x.ExternalUserId == decoded.ExternalUserId);

            var claims = new List<Claim>
            {
                new Claim(CustomClaimTypes.AppUserId, user.AppUserId.ToString()),
                new Claim(CustomClaimTypes.FirstName, user.FirstName),
                new Claim(CustomClaimTypes.LastName, user.LastName)
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                AllowRefresh = true,
                ExpiresUtc = DateTimeOffset.Now.AddMinutes(60),
                IsPersistent = true,
            };

            var httpContext = _httpContextAccessor.HttpContext;
            await httpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);

            return new SignInResponse
            {
                AppUserId = user.AppUserId,
            };
        }
    }
}
