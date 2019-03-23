using System;
using System.Collections.Generic;
using Octogami.LunchTracker.Api.Features.Infrastructure.Behaviors;

namespace Octogami.LunchTracker.Api.Infrastructure.Exceptions
{
    public class ValidationException : Exception
    {
        public ValidationException(IEnumerable<ValidationResult> errors)
        {
            Errors = errors;
        }

        public IEnumerable<ValidationResult> Errors { get; }
    }
}
