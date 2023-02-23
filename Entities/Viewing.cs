namespace kino.Entities;

using System.ComponentModel.DataAnnotations;

public class Viewing
{
    [Key]
    public int Id { get; set; }
    [Required]
    public DateTime Time { get; set; }
}