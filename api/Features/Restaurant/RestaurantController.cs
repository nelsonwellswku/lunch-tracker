using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Octogami.LunchTracker.Api.Features.Restaurant.GetRestaurants;

namespace Octogami.LunchTracker.Api.Features.Restaurant
{
    [Route("api/restaurant")]
    public class RestaurantController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RestaurantController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("")]
        public async Task<ActionResult<GetRestaurantsResponse>> GetRestaurants([FromQuery] GetRestaurantsRequest request)
        {
            var result = await _mediator.Send(request);
            return Ok(result);
        }
    }
}
