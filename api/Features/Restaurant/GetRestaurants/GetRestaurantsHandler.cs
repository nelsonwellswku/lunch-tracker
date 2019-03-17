using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace Octogami.LunchTracker.Api.Features.Restaurant.GetRestaurants
{
    public class GetRestaurantsRequest : IRequest<GetRestaurantsResponse>
    {
        public string Name { get; set; }

        public bool Verified { get; set; } = true;
    }

    public class GetRestaurantsResponse
    {
        public List<Restaurant> Restaurants { get; set; } = new List<Restaurant>();
    }

    public class Restaurant
    {
        public int RestaurantId { get; set; }

        public string Name { get; set; }

        public bool Verified { get; set; }
    }

    public class GetRestaurantsRequestHandler : IRequestHandler<GetRestaurantsRequest, GetRestaurantsResponse>
    {
        public Task<GetRestaurantsResponse> Handle(GetRestaurantsRequest request, CancellationToken cancellationToken)
        {
            return Task.FromResult(new GetRestaurantsResponse());
        }
    }
}
