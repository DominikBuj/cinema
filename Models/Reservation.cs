using System.ComponentModel.DataAnnotations;

namespace Models;

public class Reservation
{
    [Key]
    public int Id { get; set; }
    [Required]
    public List<int> Seats { get; set; }
}