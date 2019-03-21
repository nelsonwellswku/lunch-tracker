using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Octogami.LunchTracker.Api.Features.User.CreateLunch;
using Octogami.LunchTracker.Api.Features.User.GetJwt;
using Octogami.LunchTracker.Api.Features.User.GetLunch;
using Octogami.LunchTracker.Api.Features.User.UpdateLunch;

namespace Octogami.LunchTracker.Api.Features.User
{
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

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

        [HttpPost("{userId}/lunch")]
        public async Task<ActionResult<CreateLunchResponse>> CreateLunch(
            int userId,
            [FromBody] CreateLunchRequest request)
        {
            request.UserId = userId;
            var result = await _mediator.Send(request);
            return Ok(result);
        }

        [HttpPut("{userId}/lunch/{lunchId}")]
        public async Task<ActionResult<UpdateLunchResponse>> UpdateLunch(
            int userId,
            int lunchId,
            [FromBody] UpdateLunchRequest request
        )
        {
            request.UserId = userId;
            request.LunchId = lunchId;
            var result = await _mediator.Send(request);
            return Ok(result);
        }
    }
}
