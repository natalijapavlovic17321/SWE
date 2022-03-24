using System.ComponentModel.DataAnnotations;

namespace ReceByteBackend.Models.LoginRegister
{
    public class RegistrationModel
    {
        [Required(ErrorMessage = "UserName is required")]
        public string UserName { get; set;}
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set;}
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set;}
        
        [Required(ErrorMessage = " Password is required")]
        [DataType(DataType.Password)]
        [Display(Name = "Potvrdi lozinku")]
        [Compare("Password", ErrorMessage = "Paswords doesn't match")]
        public string ConfirmPassword { get; set; }

       
        [Required(ErrorMessage = "Name is required")]
        public string Name  { get; set; }

        
        [Required(ErrorMessage = "LastName is required")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "Description is required")]
        
        public string Description{ get; set; }
    }
}