using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReceByteBackend.Models.Baza
{
    [Table("Recept")]
    public class Recept
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [Required(ErrorMessage = "NazivRecepta Required")]
        public string Naziv { get; set; }

        [Column("Tekst")]
        [Required(ErrorMessage = "Tekst Required")]
        public string Tekst { get; set; }

        [Column("ImgPath")]
        [Required(ErrorMessage = "ImgPath Required")]
        public string ImgPath { get; set; }

        [Column("KcalVrednost")]
        public int KcalVrednost { get; set; }

        [Column("BrojPorcija")]
        [Required(ErrorMessage = "BrojPorcijaRequired")]
        public int BrojPorcija { get; set; }

        [Column("VremePripreme")]
        [Required(ErrorMessage = "VremePripreme Required")]
        public int VremePripreme { get; set; }        

        [Column("ProsecnaOcena")]
        public float ProsecnaOcena { get; set; } 

        public virtual ApplicationUser Objavio { get; set;}

        public virtual ApplicationUser Odobrio { get; set; }

        public virtual List<Komentar> Komentari { get; set;}

        public virtual List<Namirnice> Namirnice { get; set;}
    }
}