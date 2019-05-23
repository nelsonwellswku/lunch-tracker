using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NSwag.Annotations;
using Octogami.LunchTracker.Api.Infrastructure;
using Octogami.LunchTracker.Api.Infrastructure.Data;

namespace Octogami.LunchTracker.Api.Features.User.GetLunches
{
    public class GetLunchesRequest : IRequest<GetLunchesResponse>
    {
        public GetLunchesRequest()
        {
            var today = DateTime.Now;
            StartDate = new DateTime(today.Year, today.Month, 1);
            EndDate = new DateTime(
                today.Year,
                today.Month,
                DateTime.DaysInMonth(today.Year, today.Month)
            ).Date;
        }

        [JsonIgnore]
        [SwaggerIgnore]
        public int UserId { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }
    }

    public class GetLunchesResponse
    {
        public IEnumerable<LunchModel> Lunches { get; set; } = new List<LunchModel>();
    }

    public class LunchModel
    {
        public int LunchId { get; set; }
        public string Revisit { get; set; }
        public decimal Cost { get; set; }
        public string Restaurant { get; set; }
        public DateTime Date { get; set; }
    }

    public class GetLunchesHandler : IRequestHandler<GetLunchesRequest, GetLunchesResponse>
    {
        private readonly LunchTrackerContext _db;
        private readonly ICurrentUserReader _currentUserReader;

        public GetLunchesHandler(LunchTrackerContext db, ICurrentUserReader currentUserReader)
        {
            _db = db;
            _currentUserReader = currentUserReader;
        }

        public async Task<GetLunchesResponse> Handle(GetLunchesRequest request, CancellationToken cancellationToken)
        {
            var currentUser = _currentUserReader.GetCurrentUser();

            var lunches = await _db.Lunch
                .Where(x => x.AppUserId == currentUser.UserId)
                .Where(x => x.Date >= request.StartDate && x.Date <= request.EndDate)
                .Select(lunch => new LunchModel
                {
                    Cost = lunch.Cost,
                    Date = lunch.Date,
                    LunchId = lunch.LunchId,
                    Restaurant = lunch.Restaurant.Name,
                    Revisit = lunch.Revisit.Value,
                })
                .ToListAsync();

            return new GetLunchesResponse
            {
                Lunches = lunches,
            };
        }
    }
}
