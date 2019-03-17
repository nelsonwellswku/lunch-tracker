using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;

[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
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
