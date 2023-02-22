using System.ComponentModel.DataAnnotations;

namespace Models;

public class Movie
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public string PosterUrl { get; set; }
    [Required]
    public TimeSpan Duration { get; set; }
}