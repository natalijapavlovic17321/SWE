using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ReceByteBackend.Models.Baza
{
    [Table("Komentar")]
    public class Komentar
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Tekst")]
        [Required(ErrorMessage = "Tekst Required")]
        public string Tekst { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }

        [JsonIgnore]
        public Recept Recept { get; set;}  
    }
}