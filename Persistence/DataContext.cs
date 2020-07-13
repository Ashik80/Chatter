using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Channel> Channel { get; set; }
        public DbSet<ChannelUser> ChannelUser { get; set; }
        public DbSet<Friends> Friends { get; set; }
        public DbSet<FriendRequest> FriendRequest { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ChannelUser>().HasKey(x => new { x.AppUserId, x.ChannelId });

            builder.Entity<Friends>(x => {
                x.HasKey(x => new { x.AppUserId, x.FriendId });

                x.HasOne(x => x.AppUser)
                    .WithMany(x => x.Friends);
            });

            builder.Entity<FriendRequest>(x => {
                x.HasKey(x => new {x.UserId, x.RequestId});

                x.HasOne(x => x.User)
                    .WithMany(x => x.FriendRequests);
            });
        }
    }
}