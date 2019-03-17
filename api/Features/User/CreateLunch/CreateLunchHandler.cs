using System.Threading;
using System.Threading.Tasks;
using MediatR;
using NSwag.Annotations;

public class CreateLunchRequest : IRequest<CreateLunchResponse>
{
    [SwaggerIgnore]
    public int UserId { get; set; }

    public string Restaurant { get; set; }

    public string Revisit { get; set; }

    public float Cost { get; set; }
}

public class CreateLunchResponse
{
    public int LunchId { get; set; }
}

public class CreateLunchRequestHandler : IRequestHandler<CreateLunchRequest, CreateLunchResponse>
{
    public Task<CreateLunchResponse> Handle(CreateLunchRequest request, CancellationToken cancellationToken)
    {
        return Task.FromResult(new CreateLunchResponse { LunchId = 5 });
    }
}
