namespace cinema.Models;

using System.ComponentModel.DataAnnotations;

public class SignUpRequest
{
    public string Name { get; set; }
    public string Surname { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
}