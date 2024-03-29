namespace cinema.Models;

using static cinema.Entities.User;

public class SignInResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public UserRole Role { get; set; }
}