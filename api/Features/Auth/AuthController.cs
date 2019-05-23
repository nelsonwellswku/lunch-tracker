using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Octogami.LunchTracker.Api.Features.Auth.SignIn;
using Octogami.LunchTracker.Api.Features.Auth.SignOut;

namespace Octogami.LunchTracker.Api.Features.User
{
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("sign-in")]
        public async Task<ActionResult<SignInResponse>> SignIn([FromBody]SignInRequest request)
        {
            var result = await _mediator.Send(request);
            return Ok(result);
        }

        [HttpGet("sign-out")]
        public async Task<ActionResult> SignOut()
        {
            await _mediator.Send(new SignOutRequest());
            return Ok();
        }
    }
}
