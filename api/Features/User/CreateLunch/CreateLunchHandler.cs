using System;
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

namespace Octogami.LunchTracker.Api.Features.User.CreateLunch
{
    public class CreateLunchRequest : IRequest<CreateLunchResponse>
    {
        [SwaggerIgnore]
        [JsonIgnore]
        public int UserId { get; set; }

        public string Restaurant { get; set; }

        public string Revisit { get; set; }

        public decimal Cost { get; set; }

        public DateTime LunchDate { get; set; }
    }

    public class CreateLunchResponse
    {
        public int LunchId { get; set; }
    }

    public class CreateLunchRequestValidator : AbstractValidator<CreateLunchRequest>
    {
        public CreateLunchRequestValidator(ICurrentUserReader currentUserReader)
        {
            RuleFor(x => x.UserId)
                .Must(value => ValidateMatchingUserId(value, currentUserReader.GetCurrentUser().UserId));
        }

        public static bool ValidateMatchingUserId(int userId, int currentUserId)
        {
            return userId == currentUserId;
        }
    }

    public class CreateLunchRequestHandler : IRequestHandler<CreateLunchRequest, CreateLunchResponse>
    {
        private readonly LunchTrackerContext _db;

        public CreateLunchRequestHandler(LunchTrackerContext db)
        {
            _db = db;
        }

        public async Task<CreateLunchResponse> Handle(CreateLunchRequest request, CancellationToken cancellationToken)
        {
            var appUser = await _db.AppUser.FindAsync(request.UserId);
            var restaurant = await _db.Restaurant.FirstOrDefaultAsync(x => x.Name == request.Restaurant);
            var revisit = await _db.Revisit.FirstOrDefaultAsync(x => x.Value == request.Revisit);

            if (restaurant == null)
            {
                restaurant = new Api.Infrastructure.Data.Entities.Restaurant
                {
                    Name = request.Restaurant,
                    Verified = false,
                };

                _db.Restaurant.Add(restaurant);
            }

            var lunch = new Lunch
            {
                AppUser = appUser,
                Restaurant = restaurant,
                Revisit = revisit,
                Cost = request.Cost,
                Date = request.LunchDate,
            };

            _db.Lunch.Add(lunch);

            await _db.SaveChangesAsync();

            return new CreateLunchResponse
            {
                LunchId = lunch.LunchId,
            };
        }
    }
}
