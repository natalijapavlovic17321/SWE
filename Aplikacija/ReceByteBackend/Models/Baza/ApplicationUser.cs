using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace ReceByteBackend.Models.Baza
{
    public class ApplicationUser : IdentityUser
    {
        [Column("Name")]
        [Required(ErrorMessage = "Required")]
        public string Name  { get; set; }

        [Column("LastName")]
        [Required(ErrorMessage = "Required")]
        public string LastName { get; set; }

        [Column("Description")]
        [StringLength(40)]
        public string Description{ get; set; }
    }
}