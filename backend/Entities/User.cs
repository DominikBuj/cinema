namespace cinema.Entities;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class User
{
    public enum UserRole
    {
        User,
        Admin
    }

    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    [JsonIgnore]
    public string PasswordHash { get; set; }
    [Required]
    [Column(TypeName = "varchar(32)")]
    public UserRole Role { get; set; }
    public List<Reservation>? Reservations { get; set; }
}