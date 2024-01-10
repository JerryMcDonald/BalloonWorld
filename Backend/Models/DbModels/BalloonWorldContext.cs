using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class BalloonWorldContext : DbContext 
{
    public BalloonWorldContext(DbContextOptions<BalloonWorldContext> options)
        : base(options)
        {

        }

        public DbSet<Balloon> Balloons { get; set; }

}