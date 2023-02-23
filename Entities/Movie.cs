namespace kino.Entities;

using System.ComponentModel.DataAnnotations;

public class Movie
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public string Description { get; set; }
    public string PosterUrl { get; set; }
    [Required]
    public TimeSpan Duration { get; set; }
}