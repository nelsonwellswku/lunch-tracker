using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Octogami.LunchTracker.Api.Features.User.CreateOrUpdateLunch;
using Octogami.LunchTracker.Api.Features.User.GetJwt;
using Octogami.LunchTracker.Api.Features.User.GetLunches;

namespace Octogami.LunchTracker.Api.Features.User
{
    [Route("api/user")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [AllowAnonymous]
        [HttpPost("getJwt")]
        public async Task<ActionResult<GetJwtResponse>> GetJwt([FromBody]GetJwtRequest request)
        {
            var result = await _mediator.Send(request);
            return result;
        }

        [HttpGet("{userId}/lunch")]
        public async Task<ActionResult<GetLunchesResponse>> GetLunches(
            int userId,
            [FromQuery] GetLunchesRequest request)
        {
            request.UserId = userId;
            var result = await _mediator.Send(request);
            return Ok(result);
        }

        [HttpPut("{userId}/lunch/date/{lunchDate}")]
        public async Task<ActionResult<CreateOrUpdateLunchResponse>> CreateOrUpdateLunch(
            int userId,
            DateTime lunchDate,
            [FromBody]CreateOrUpdateLunchRequest request)
        {
            request.UserId = userId;
            request.Date = lunchDate;
            var response = await _mediator.Send(request);
            return Ok(response);
        }
    }
}
