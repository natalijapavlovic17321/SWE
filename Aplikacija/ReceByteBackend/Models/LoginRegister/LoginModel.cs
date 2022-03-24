using System.ComponentModel.DataAnnotations;

namespace ReceByteBackend.Models.LoginRegister
{
    public class LoginModel
    {
        [Required(ErrorMessage = "UserName is required")]
        public string UserName { get; set;}
        
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set;}
       
    }
}