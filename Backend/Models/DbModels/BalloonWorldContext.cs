using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class LibraryContext : DbContext 
{
    public LibraryContext(DbContextOptions<LibraryContext> options)
        : base(options)
        {

        }

        public DbSet<Balloon> Balloons { get; set; }

}