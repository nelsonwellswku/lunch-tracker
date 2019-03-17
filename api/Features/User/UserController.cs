using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;

public class UserController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("/api/{userId}/lunch")]
    public async Task<ActionResult<GetLunchesResponse>> GetLunches(
        int userId,
        [FromQuery] DateTime startDate,
        [FromQuery] DateTime endDate)
    {
        var result = await _mediator.Send(new GetLunchesRequest
        {
            UserId = userId,
            StartDate = startDate,
            EndDate = endDate
        });

        return Ok(result);
    }
}
