using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;

using ValidationException = Octogami.LunchTracker.Api.Infrastructure.Exceptions.ValidationException;

namespace Octogami.LunchTracker.Api.Features.Infrastructure.Behaviors
{
    public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    {
        private readonly IEnumerable<IValidator<TRequest>> _validators;

        public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
        {
            _validators = validators;
        }

        public Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            var validationResults = _validators
                .Select(async x => await x.ValidateAsync(request))
                .SelectMany(x => x.Result.Errors)
                .Where(x => x != null)
                .ToList();

            if (validationResults.Any())
            {
                var groupedByField = validationResults.GroupBy(x => x.PropertyName);
                var errors = groupedByField.Select(grouping =>
                {
                    return new ValidationResult
                    {
                        Field = grouping.Key,
                        Messages = grouping.Select(x => x.ErrorMessage)
                    };
                });

                throw new ValidationException(errors);
            }

            return next();
        }
    }

    public class ValidationResult
    {
        public string Field { get; set; }
        public IEnumerable<string> Messages { get; set; }
    }
}
