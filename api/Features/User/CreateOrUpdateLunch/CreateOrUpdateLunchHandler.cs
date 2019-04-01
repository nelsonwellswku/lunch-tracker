using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NSwag.Annotations;
using Octogami.LunchTracker.Api.Infrastructure;
using Octogami.LunchTracker.Api.Infrastructure.Data;
using Octogami.LunchTracker.Api.Infrastructure.Data.Entities;

namespace Octogami.LunchTracker.Api.Features.User.CreateOrUpdateLunch
{
    public class CreateOrUpdateLunchRequest : IRequest<CreateOrUpdateLunchResponse>
    {
        [SwaggerIgnore]
        [JsonIgnore]
        public int UserId { get; set; }

        [SwaggerIgnore]
        [JsonIgnore]
        public DateTime Date { get; set; }

        public string Revisit { get; set; }

        public string Restaurant { get; set; }

        public decimal Cost { get; set; }
    }

    public class CreateOrUpdateLunchResponse
    {
        public int LunchId { get; set; }
    }

    public class CreateOrUpdateLunchRequestValidator : AbstractValidator<CreateOrUpdateLunchRequest>
    {
        private readonly ICurrentUserReader _currentUserReader;

        public CreateOrUpdateLunchRequestValidator(ICurrentUserReader currentUserReader)
        {
            _currentUserReader = currentUserReader;

            RuleFor(request => request.UserId).Must(MatchCurrentlyLoggedInUser);
            RuleFor(request => request.Date).GreaterThan(default(DateTime)).LessThan(DateTime.Now.AddDays(2));
            RuleFor(request => request.Cost).GreaterThan(0).LessThan(100);
            RuleFor(request => request.Revisit).Must(BeValidRevisitValue);
            RuleFor(request => request.Restaurant).MinimumLength(3).MaximumLength(50);
        }

        private bool MatchCurrentlyLoggedInUser(int userId)
        {
            var user = _currentUserReader.GetCurrentUser();
            return user.UserId == userId;
        }

        private bool BeValidRevisitValue(string revisit)
        {
            var validValues = new List<string> { "yes", "no", "unsure" };
            return validValues.Any(validValue => revisit.ToLowerInvariant() == validValue);
        }
    }

    public class CreateOrUpdateLunchRequestHandler : IRequestHandler<CreateOrUpdateLunchRequest, CreateOrUpdateLunchResponse>
    {
        private readonly LunchTrackerContext _db;

        public CreateOrUpdateLunchRequestHandler(LunchTrackerContext db)
        {
            _db = db;
        }

        public async Task<CreateOrUpdateLunchResponse> Handle(CreateOrUpdateLunchRequest request, CancellationToken cancellationToken)
        {
            var isCreate = false;
            var lunch = await _db.Lunch.FirstOrDefaultAsync(x => x.Date == request.Date.Date);
            if (lunch == null)
            {
                lunch = new Lunch();
                isCreate = true;
            }

            var restaurant = await _db.Restaurant.FirstOrDefaultAsync(x => x.Name == request.Restaurant);
            if (restaurant == null)
            {
                restaurant = new Api.Infrastructure.Data.Entities.Restaurant
                {
                    Name = request.Restaurant,
                    Verified = false,
                };

                _db.Restaurant.Add(restaurant);
            }

            var appUser = await _db.AppUser.FindAsync(request.UserId);
            var revisit = await _db.Revisit.FirstAsync(x => x.Value == request.Revisit);

            lunch.AppUser = appUser;
            lunch.Cost = request.Cost;
            lunch.Date = request.Date;
            lunch.Restaurant = restaurant;
            lunch.Revisit = revisit;

            if (isCreate)
            {
                _db.Lunch.Add(lunch);
            }

            await _db.SaveChangesAsync();

            return new CreateOrUpdateLunchResponse
            {
                LunchId = lunch.LunchId,
            };
        }
    }
}
