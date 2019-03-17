using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Newtonsoft.Json;
using NSwag.Annotations;

namespace Octogami.LunchTracker.Api.Features.User.UpdateLunch
{
    public class UpdateLunchRequest : IRequest<UpdateLunchResponse>
    {
        [SwaggerIgnore]
        [JsonIgnore]
        public int UserId { get; set; }

        [SwaggerIgnore]
        [JsonIgnore]
        public int LunchId { get; set; }

        public string Revisit { get; set; }

        public string Restaurant { get; set; }

        public decimal Cost { get; set; }
    }

    public class UpdateLunchResponse
    {
        public int LunchId { get; set; }
    }

    public class UpdateLunchRequestHandler : IRequestHandler<UpdateLunchRequest, UpdateLunchResponse>
    {
        public Task<UpdateLunchResponse> Handle(UpdateLunchRequest request, CancellationToken cancellationToken)
        {
            return Task.FromResult(new UpdateLunchResponse());
        }
    }
}
