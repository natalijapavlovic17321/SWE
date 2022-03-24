using System.ComponentModel.DataAnnotations;

namespace ReceByteBackend.Models.Recepti
{
    public class DTOKomentari
    {

        public int ID { get; set; }

        [Required(ErrorMessage = "Ocena Required")]
        public int OcenaKomentara { get; set; }

        [Required(ErrorMessage = "Tekst Required")]
        public string Tekst { get; set; }

        [Required(ErrorMessage = "Username Required")]
        public string UserName { get; set; }

    }
}