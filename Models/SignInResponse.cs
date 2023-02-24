namespace kino.Models;

using static kino.Entities.User;

public class SignInResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public string Token { get; set; }
    public UserRole Role { get; set; }
}