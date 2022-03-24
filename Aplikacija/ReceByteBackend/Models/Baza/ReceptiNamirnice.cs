using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReceByteBackend.Models.Baza
{
    [Table("ReceptiNamirnice")]
    public class ReceptiNamirnice
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Required(ErrorMessage = "ReceptID required")]
        public Recept Recept { get; set; }

        [Required(ErrorMessage = "NamirniceID Required")]
        public Namirnice Namirnice { get; set;}

    }
}