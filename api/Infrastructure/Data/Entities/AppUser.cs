using System;
using System.ComponentModel.DataAnnotations;

namespace Octogami.LunchTracker.Api.Infrastructure.Data.Entities
{
    public class AppUser
    {
        [Key]
        public int AppUserId { get; set; }

        [Required]
        public string ExternalUserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }

        [Required]
        public DateTime UpdateDate { get; set; }

        [Required]
        public int IdentityProviderId { get; set; }

        public IdentityProvider IdentityProvider { get; set; }
    }
}
