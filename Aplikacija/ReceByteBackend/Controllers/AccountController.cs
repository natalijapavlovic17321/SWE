using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ReceByteBackend.Models.Baza;
using ReceByteBackend.Models.LoginRegister;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using ReceByteBackend.Models.Korisnik;

namespace ReceByteBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {

        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;

        public AccountController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("Register")]
        public async Task<Object> Registration(RegistrationModel model)
        {
            if (ModelState.IsValid)
            {


                var applicationUser = new ApplicationUser()
                {
                    UserName = model.UserName,
                    Email = model.Email,
                    LastName = model.LastName,
                    Name = model.Name,
                    Description = model.Description
                };
                if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
                {
                    await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
                }

                if (!await roleManager.RoleExistsAsync(UserRoles.Privilegovani))
                {
                    await roleManager.CreateAsync(new IdentityRole(UserRoles.Privilegovani));
                }
                if (!await roleManager.RoleExistsAsync(UserRoles.Prijavljeni))
                {
                    await roleManager.CreateAsync(new IdentityRole(UserRoles.Prijavljeni));
                }

                try
                {
                    var result = await userManager.CreateAsync(applicationUser, model.Password);
                    await userManager.AddToRoleAsync(applicationUser, UserRoles.Prijavljeni);
                    return Ok(result);
                }

                catch (Exception ex)
                {

                    throw ex;
                }
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPost]
        [AllowAnonymous]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.FindByNameAsync(model.UserName);
                if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
                {
                    var userRoles = await userManager.GetRolesAsync(user);
                    var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };
                    foreach (var userRole in userRoles)
                    {
                        authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                    }
                    var authSiginKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]));
                    var token = new JwtSecurityToken(
                        issuer: _configuration["JWT:ValidIssuer"],
                        audience: _configuration["JWT:ValidAudience"],
                        expires: DateTime.Now.AddDays(1),
                        claims: authClaims,
                        signingCredentials: new SigningCredentials(authSiginKey, SecurityAlgorithms.HmacSha256Signature)
                        );

                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        ValidTo = token.ValidTo.ToString("yyyy-MM-ddThh:mm:ss")
                    });
                }
            }
            return Unauthorized();
        }

        // Skida role PRIJAVLJENI i dodaje mu role PRIVILEGOVANI
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [Route("promoteMember/{userName}")]
        public async Task UpdateRole(string userName)
        {
            var user = await userManager.FindByNameAsync(userName);
            if (user != null)
            {
                if (await userManager.IsInRoleAsync(user, "Prijavljeni") == true)
                {
                    await userManager.RemoveFromRoleAsync(user, "Prijavljeni");
                    await userManager.AddToRoleAsync(user, "Privilegovani");
                }

            }
        }

        //Vraca informacije koje su nam bitne za korisnika  
        [HttpGet]
        [Authorize]
        [Route("UserInformation")]
        public async Task<DTOUserInformations> UserInformation()
        {
            var userName = HttpContext.User.Identity.Name;
            var user = await userManager.FindByNameAsync(userName);
            var role = await userManager.GetRolesAsync(user);

            DTOUserInformations uinfo = new DTOUserInformations
            {
                UserName = user.UserName,
                Email = user.Email,
                Name = user.Name,
                LastName = user.LastName,
                Description = user.Description,
                Role = (List<string>)role
            };
            return uinfo;
        }
    }
}