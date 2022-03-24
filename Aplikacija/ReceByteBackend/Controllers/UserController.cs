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
using Microsoft.EntityFrameworkCore;
using ReceByteBackend.Models.Korisnik;
using ReceByteBackend.Models.Recepti;
using Microsoft.AspNetCore.Authorization;

namespace ReceByteBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        public ReceByteContext Context { get; set; }
        public UserController(ReceByteContext context)
        {
            Context = context;
        }
        #region Frizider

        //tested, radi
        [HttpGet]
        [Authorize]
        [Route("getNamirniceFromFrizider")]
        public async Task<List<DTONamirniceUFrizideru>> getNamirniceFromFridge()
        {
            var userName = HttpContext.User.Identity.Name;
            return await Context.Friziders.Where(p => p.ApplicationUser.UserName == userName).Select(p => new DTONamirniceUFrizideru
            {
                ID = p.Namirnice.ID,
                Naziv = p.Namirnice.Naziv,
                Vrsta = p.Namirnice.Vrsta,
                KcalVrednost = p.Namirnice.KcalVrednost
            }).ToListAsync();
        }

        //tested,radi
        [HttpPost]
        [Authorize]
        [Route("postNamirniceInFrizider/{namirnica}")]
        public async Task ubaciNamirnicuUFrizider(string namirnica)
        {
            var username = HttpContext.User.Identity.Name;
            var possibility = await Context.Friziders.Where(p => p.Namirnice.Naziv == namirnica &&
                                                            p.ApplicationUser.UserName == username).FirstOrDefaultAsync();
            if (possibility == null)
            {
                Frizider frizider = new Frizider();
                var namir = await Context.Namirnices.Where(l => l.Naziv == namirnica).FirstAsync();
                var user = await Context.ApplicationUser.Where(l => l.UserName == username).FirstAsync();
                frizider.ApplicationUser = user;
                frizider.Namirnice = namir;
                Context.Friziders.Add(frizider);
                await Context.SaveChangesAsync();
            }
        }

        [HttpDelete]
        [Authorize]
        [Route("deleteNamirniceFromFrizider/{nazivNamirnice}")]
        public async Task deleteNamirniceFromFrizider(string nazivNamirnice)
        {
            var username = HttpContext.User.Identity.Name;
            var namirnica = await Context.Friziders.Where(i => i.Namirnice.Naziv == nazivNamirnice && i.ApplicationUser.UserName == username).FirstOrDefaultAsync();
            Context.Remove(namirnica);
            await Context.SaveChangesAsync();
        }
        #endregion
    }
}

