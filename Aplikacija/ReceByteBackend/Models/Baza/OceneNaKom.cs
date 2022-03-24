using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReceByteBackend.Models.Baza
{
    [Table("OceneNaKom")]
    public class OceneNaKom
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }       
        
        [Required(ErrorMessage = "KorisnikID Required")]
        public ApplicationUser ApplicationUser { get; set; }

        [Required(ErrorMessage = "KomentarID Required")]
        public Komentar Komentar { get; set;}   
    }
}
