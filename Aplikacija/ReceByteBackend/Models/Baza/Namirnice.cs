using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReceByteBackend.Models.Baza
{
    [Table("Namirnice")]
    public class Namirnice
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [Required(ErrorMessage = "Naziv Required")]
        public string Naziv { get; set; }

        [Column("Vrsta")]
        public string Vrsta { get; set; }

        [Column("KcalVrednost")]
        public int KcalVrednost { get; set; }  
    }
}
