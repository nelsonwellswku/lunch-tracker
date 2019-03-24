using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Octogami.LunchTracker.Api.Infrastructure.Data.Entities
{
    public class Lunch
    {
        [Key]
        public int LunchId { get; set; }

        [Required]
        public int AppUserId { get; set; }

        [Required]
        public AppUser AppUser { get; set; }

        public int RestaurantId { get; set; }

        [Required]
        public Restaurant Restaurant { get; set; }

        [Required]
        [Column(TypeName = "decimal(9,2)")]
        public decimal Cost { get; set; }

        [Required]
        public int RevisitId { get; set; }

        [Required]
        public Revisit Revisit { get; set; }
    }
}
