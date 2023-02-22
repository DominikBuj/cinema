using System.ComponentModel.DataAnnotations;

namespace Models;

public class Viewing
{
    [Key]
    public int Id { get; set; }
    [Required]
    public DateTime Time { get; set; }
}