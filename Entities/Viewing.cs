namespace kino.Entities;

using System.ComponentModel.DataAnnotations;

public class Viewing
{
    [Key]
    public int Id { get; set; }
    [Required]
    public DateOnly Date { get; set; }
    [Required]
    public TimeOnly StartTime { get; set; }
    [Required]
    public TimeOnly EndTime { get; set; }
    [Required]
    public int MovieId { get; set; }
    public Movie? Movie { get; set; }
}