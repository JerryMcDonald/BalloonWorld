using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Balloon
    {
        [Key]
        public int Id { get; set; }
        public string? Color { get; set; }
        public string? Guardian { get; set; }
    }
}