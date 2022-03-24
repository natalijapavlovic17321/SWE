using System.ComponentModel.DataAnnotations;

namespace ReceByteBackend.Models.Korisnik
{
    public class DTONamirniceUFrizideru
    {
        public int ID { get; set; }
        
        [Required(ErrorMessage = "Namirnice Required")]
        public string Naziv { get; set; }
        public string Vrsta { get; set; }
        public int KcalVrednost { get; set; }  
    }
}