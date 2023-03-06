namespace cinema.Entities;

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
    public int DurationHours { get; set; }
    [Required]
    public int DurationMinutes { get; set; }
    public List<Viewing>? Viewings { get; set; }
}