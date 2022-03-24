using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ReceByteBackend.Models.Korisnik
{
    public class DTOUserInformations
    {

        [Required(ErrorMessage = "UserName Required")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Email Required")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Ime Required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Prezime Required")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "Opis Required")]
        public string Description { get; set; }
        [Required(ErrorMessage = "Role Required")]

        public List<string> Role { get; set; }


    }
}