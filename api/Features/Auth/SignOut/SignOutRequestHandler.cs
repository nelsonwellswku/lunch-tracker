using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;

namespace Octogami.LunchTracker.Api.Features.Auth.SignOut
{
    public class SignOutRequest : IRequest
    {
    }

    public class SignOutRequestHandler : IRequestHandler<SignOutRequest>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public SignOutRequestHandler(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Unit> Handle(SignOutRequest request, CancellationToken cancellationToken)
        {
            await _httpContextAccessor.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Unit.Value;
        }
    }
}
