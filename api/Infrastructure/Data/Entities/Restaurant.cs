using System.ComponentModel.DataAnnotations;

namespace Octogami.LunchTracker.Api.Infrastructure.Data.Entities
{
    public class Restaurant
    {
        [Key]
        public int RestaurantId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public bool Verified { get; set; }
    }
}
