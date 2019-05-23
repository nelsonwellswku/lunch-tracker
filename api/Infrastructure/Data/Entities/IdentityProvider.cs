using System.ComponentModel.DataAnnotations;

namespace Octogami.LunchTracker.Api.Infrastructure.Data.Entities
{
    public class IdentityProvider
    {
        [Key]
        public int IdentityProviderId { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
