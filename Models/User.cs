using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models;

public class User
{
    public enum UserRole
    {
        User,
        Admin
    }

    [Key]
    public int Id { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string PasswordHash { get; set; }
    [Required]
    [Column(TypeName = "varchar(32)")]
    public UserRole Role { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Surname { get; set; }
}