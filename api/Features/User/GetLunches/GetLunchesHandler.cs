using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Newtonsoft.Json;
using NSwag.Annotations;

namespace Octogami.LunchTracker.Api.Features.User.GetLunch
{
    public class GetLunchesRequest : IRequest<GetLunchesResponse>
    {
        [SwaggerIgnore]
        public int UserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class GetLunchesResponse
    {
        public List<Lunch> Lunches { get; set; } = new List<Lunch>();
    }

    public class Lunch
    {
        public int LunchId { get; set; }
        public bool Revisit { get; set; }
        public decimal Cost { get; set; }
        public string Restaurant { get; set; }
        public DateTime Date { get; set; }
    }

    public class GetLunchesHandler : IRequestHandler<GetLunchesRequest, GetLunchesResponse>
    {
        public Task<GetLunchesResponse> Handle(GetLunchesRequest request, CancellationToken cancellationToken)
        {
            return Task.FromResult(new GetLunchesResponse());
        }
    }
}
