namespace kino.Entities;

using System.ComponentModel.DataAnnotations;

public class Reservation
{
    [Key]
    public int Id { get; set; }
    [Required]
    public int ViewingId { get; set; }
    public Viewing? Viewing { get; set; }
    [Required]
    public int UserId { get; set; }
    public User? User { get; set; }
    [Required]
    public string SelectedSeats { get; set; }
}