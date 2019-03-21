using Microsoft.EntityFrameworkCore;
using Octogami.LunchTracker.Api.Infrastructure.Data.Entities;

namespace Octogami.LunchTracker.Api.Infrastructure.Data
{
    public class LunchTrackerContext : DbContext
    {
        public LunchTrackerContext(DbContextOptions<LunchTrackerContext> options) : base(options) { }

        public DbSet<AppUser> AppUser { get; set; }

        public DbSet<IdentityProvider> IdentityProvider { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("lt");

            modelBuilder.Entity<AppUser>()
                .HasAlternateKey(x => new { x.AppUserId, x.IdentityProviderId });

            modelBuilder.Entity<IdentityProvider>()
                .HasAlternateKey(x => x.Name);

            modelBuilder.Entity<IdentityProvider>()
                .HasData(new IdentityProvider { IdentityProviderId = 1, Name = "Google" });
        }
    }
}
