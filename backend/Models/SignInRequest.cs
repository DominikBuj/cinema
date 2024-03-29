namespace cinema.Models;

using System.ComponentModel.DataAnnotations;

public class SignInRequest
{
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
}