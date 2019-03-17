using System.Threading;
using System.Threading.Tasks;
using MediatR;

public class UpdateLunchRequest : IRequest<UpdateLunchResponse>
{
    public int UserId { get; set; }

    public int LunchId { get; set; }

    public string Revisit { get; set; }

    public string Restaurant { get; set; }

    public decimal Cost { get; set; }
}

public class UpdateLunchResponse
{
}

public class UpdateLunchRequestHandler : IRequestHandler<UpdateLunchRequest, UpdateLunchResponse>
{
    public Task<UpdateLunchResponse> Handle(UpdateLunchRequest request, CancellationToken cancellationToken)
    {
        return Task.FromResult(new UpdateLunchResponse());
    }
}
