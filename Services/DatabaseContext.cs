namespace kino.Services;

using kino.Entities;
using Microsoft.EntityFrameworkCore;

public class DatabaseContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Movie> Movies { get; set; }
    public DbSet<Viewing> Viewings { get; set; }
    public DbSet<Reservation> Reservations { get; set; }
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
}