using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReceByteBackend.Models.Baza
{
    [Table("ReakcijaNaRecepte")]
    public class ReakcijaNaRecepte
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Ocena")]
        [Required(ErrorMessage = "Ocena Required")]
        public float Ocena { get; set; }

        [Required(ErrorMessage = "KorisnikID Required")]
        public ApplicationUser ApplicationUser { get; set; }
        
        [Required(ErrorMessage = "ReceptID Required")]
        public Recept Recept { get; set; } 
    }
}
