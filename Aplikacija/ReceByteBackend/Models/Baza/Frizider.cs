using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReceByteBackend.Models.Baza
{
    [Table("Frizider")]
    public class Frizider
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }
        [Required(ErrorMessage = "KorisnikID Required")]
        public ApplicationUser ApplicationUser  { get; set; }
        [Required(ErrorMessage = "NamirniceID Required")]
        public Namirnice Namirnice { get; set; }
        //ForeignKey Korisnik
        //ForeignKey Namirnica
    }
}