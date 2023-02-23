namespace kino.Entities;

using System.ComponentModel.DataAnnotations;

public class Reservation
{
    [Key]
    public int Id { get; set; }
    [Required]
    public List<int> Seats { get; set; }
}