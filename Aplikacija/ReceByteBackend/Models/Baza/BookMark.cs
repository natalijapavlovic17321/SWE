using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReceByteBackend.Models.Baza
{
    [Table("BookMark")]
    public class BookMark
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Required(ErrorMessage = "KorisnikID Required")]
        public ApplicationUser ApplicationUser { get; set; }

        [Required(ErrorMessage = "ReceptID Required")]
        public Recept Recept { get; set; }
    }
}