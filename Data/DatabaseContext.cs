using Microsoft.EntityFrameworkCore;
using Models;

namespace kino.Data;

public class DatabaseContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Movie> Movies { get; set; }
    public DbSet<Viewing> Viewings { get; set; }
    public DbSet<Reservation> Reservations { get; set; }
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
}