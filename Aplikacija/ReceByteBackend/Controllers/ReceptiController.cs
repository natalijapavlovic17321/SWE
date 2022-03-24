using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReceByteBackend.Models.Baza;
using ReceByteBackend.Models.Recepti;
using System;
using Microsoft.AspNetCore.Authorization;
using System.IO;
using System.Net.Http.Headers;

namespace ReceByteBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReceptiController : ControllerBase
    {
        public ReceByteContext Context { get; set; }
        public ReceptiController(ReceByteContext context)
        {
            Context = context;
        }

        [HttpGet]
        [Route("getImage/{img}")]
        public IActionResult getPic(string img)
        {
            var folderName = Path.Combine("Resources", "Images");
            var pathOne = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            var fullPath = Path.Combine(pathOne, img);
            var stream = new FileStream(fullPath, FileMode.Open);

            return File(stream, "image/jpg");
        }
        [HttpDelete]
        [Route("deleteImg/{img}")]
        public IActionResult deletePic(string img)
        {
            var folderName = Path.Combine("Resources", "Images");
            var pathOne = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            var fullPath = Path.Combine(pathOne, img);

            System.IO.File.Delete(fullPath);
            return Ok();
        }

        [HttpPost, DisableRequestSizeLimit]
        [Authorize]
        public async Task<IActionResult> UploadAsync()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var uniqueFileName = HttpContext.User.Identity.Name + Guid.NewGuid().ToString() + fileName;
                    var fullPath = Path.Combine(pathToSave, uniqueFileName);
                    var dbPath = Path.Combine(folderName, uniqueFileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { uniqueFileName });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }



        #region Namirnice

        [HttpGet]
        [Authorize]
        [Route("proveriPostojanje/{namirnica}")]
        public async Task<Namirnice> proveriPostojanje(string namirnica)
        {
            return await Context.Namirnices.Where(p => p.Naziv == namirnica).FirstAsync();
        }

        //vraca sve vrste namirnica, brise duplikate, ovo koristis kad dinamicki iscrtavas tabelice u frizideru
        [HttpGet]
        [Authorize]
        // [Authorize(Roles ="Prijavljeni")]
        [Route("getSveVrsteNamirnica")]
        public Task<List<string>> GetVrsteAsync()
        {
            var l = Context.Namirnices.Select(p => p.Vrsta).ToList();
            return Task.FromResult(l.Distinct().ToList());
        }

        //Testirana, radi dobro
        // fja za get sve namirnice
        [HttpGet]
        [Authorize]
        [Route("getNamirnice")]
        public async Task<List<Namirnice>> GetNamirnicesAsync()
        {
            return await Context.Namirnices.ToListAsync();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        [Route("postNamirnice")]
        public async Task PostNamirnice([FromBody] Namirnice n)
        {
            if (ModelState.IsValid)
            {
                var possibility = await Context.Namirnices.Where(p => p.Naziv == n.Naziv).FirstOrDefaultAsync();
                if (possibility == null)
                {
                    Context.Namirnices.Add(n);
                    await Context.SaveChangesAsync();

                }
            }

        }
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        [Route("deleteNamirnica/{naziv}")]
        public async Task DeleteNamirnica(string naziv)
        {
            var namirnica = await Context.Namirnices.Where(p => p.Naziv == naziv).FirstOrDefaultAsync();
            if (namirnica != null)
            {
                Context.Remove(namirnica);
                await Context.SaveChangesAsync();
            }
        }



        #endregion

        #region Recepti



        [HttpPut]
        [Authorize(Roles = "Privilegovani,Admin")]
        [Route("OdobravanjeRecepta/{receptID}")]
        public async Task odobriRecept(int receptID)
        {
            var username = HttpContext.User.Identity.Name;

            var user = await Context.ApplicationUser.Where(p => p.UserName == username).FirstAsync();
            var recept = await Context.Recepts.Where(p => p.ID == receptID && p.Odobrio == null).FirstAsync();
            recept.Odobrio = user;
            if (user != null && recept != null)
            {
                Context.Update<Recept>(recept);
                await Context.SaveChangesAsync();
            }
        }

        //Testirana,radi dobro
        //Preuzimanje svih recepta koji su objavljeni
        [HttpGet]
        [Route("PreuzmiRecepte")]
        public async Task<List<DTORecept>> PreuzmiRecepte()
        {


            var lista = await Context.Recepts.Where(l => l.Odobrio != null).Select(p => new DTORecept
            {
                ID = p.ID,
                Naziv = p.Naziv,
                Tekst = p.Tekst,
                ImgPath = p.ImgPath,
                BrojPorcija = p.BrojPorcija,
                VremePripreme = p.VremePripreme,
                ProsecnaOcena = p.ProsecnaOcena,
                KcalVrednost = p.KcalVrednost,
                Autor = p.Objavio.UserName
            }).ToListAsync();
            int idrep;
            foreach (DTORecept r in lista)
            {
                idrep = r.ID;
                var namirince = await Context.ReceptiNamirnices.Include(p => p.Namirnice).Where(p => p.Recept.ID == idrep).ToListAsync();
                List<Namirnice> nam = new List<Namirnice>();
                foreach (ReceptiNamirnice n in namirince)
                {
                    var t = await Context.Namirnices.Where(p => p.ID == n.Namirnice.ID).FirstAsync();
                    nam.Add(t);
                }
                r.Namirnicee = nam;

            }

            return lista.OrderBy(x => Guid.NewGuid()).ToList();
            //dodao sam da se promesa lista pri refreshu

        }

        //tested,vraca dobro
        //Vraca sve informacije o receptu 
        [HttpGet]
        [Route("getRecept/{id}")]
        public async Task<DTORecept> getReceptByID(int id)
        {
            var namirince = await Context.ReceptiNamirnices.Include(p => p.Namirnice).Where(p => p.Recept.ID == id).ToListAsync();
            List<Namirnice> nam = new List<Namirnice>();
            foreach (ReceptiNamirnice n in namirince)
            {
                var t = await Context.Namirnices.Where(p => p.ID == n.Namirnice.ID).FirstAsync();
                nam.Add(t);
            }

            // prvo ucitam sve komentare koje postoje da bih mogao dole u koments2 da izracunam koliko LAJCI ima
            var koments = await Context.Komentars.Include(p => p.ApplicationUser).Where(p => p.Recept.ID == id).Select(p => new DTOKomentari
            {
                ID = p.ID,
                Tekst = p.Tekst,
                OcenaKomentara = 420,
                UserName = p.ApplicationUser.UserName
            }).ToListAsync();

            List<DTOKomentari> koments2 = new List<DTOKomentari>();
            foreach (DTOKomentari k in koments)
            {
                koments2.Add(new DTOKomentari
                {
                    ID = k.ID,
                    Tekst = k.Tekst,
                    OcenaKomentara = Context.OceneNaKoms.Where(p => p.Komentar.ID == k.ID).Count(),
                    UserName = k.UserName
                });

            }

            return await Context.Recepts.Where(p => p.ID == id).Select(p => new DTORecept
            {
                ID = p.ID,
                Naziv = p.Naziv,
                Tekst = p.Tekst,
                ImgPath = p.ImgPath,
                KcalVrednost = p.KcalVrednost,
                BrojPorcija = p.BrojPorcija,
                VremePripreme = p.VremePripreme,
                Autor = p.Objavio.UserName + " : \"" + p.Objavio.Description + "\"",
                ProsecnaOcena = p.ProsecnaOcena,
                Namirnicee = nam,
                Komentarii = koments2
            }).FirstAsync();
        }

        [HttpPost]
        [Authorize]
        [Route("DodajReceptNamirniceVezu/{receptID}/{namirniceNaziv}")]
        public async Task updateNamirniceRecept(int receptID, string namirniceNaziv)
        {
            ReceptiNamirnice receptiNamirnice = new ReceptiNamirnice();
            receptiNamirnice.Recept = await Context.Recepts.Where(p => p.ID == receptID).FirstAsync();
            receptiNamirnice.Namirnice = await Context.Namirnices.Where(p => p.Naziv == namirniceNaziv).FirstAsync();
            Context.ReceptiNamirnices.Add(receptiNamirnice);
            await Context.SaveChangesAsync();
        }
        [HttpPost]
        [Authorize]
        [Route("UnosRecepta")]
        public async Task UnosRecepta([FromBody] Recept recept)
        {
            if (ModelState.IsValid)
            {


                var username = HttpContext.User.Identity.Name;
                var obj = await Context.ApplicationUser.Where(p => p.UserName == username).FirstAsync();
                List<Namirnice> namirnices = new List<Namirnice>();
                recept.Objavio = obj;
                namirnices = recept.Namirnice.ToList();

                Recept recept1 = recept;
                recept1.Objavio = recept.Objavio;
                recept1.Komentari = null;
                recept1.Namirnice = null;

                Context.Recepts.Add(recept1);
                await Context.SaveChangesAsync();

                foreach (Namirnice n in namirnices)
                {
                    await this.updateNamirniceRecept(recept1.ID, n.Naziv);
                }
            }
        }



        //tested,radi
        //Preuzimanje svih recepata koji nisu verifikovani
        [HttpGet]
        [Authorize(Roles = "Admin,Privilegovani")]
        [Route("NeverifikovaniRecepti")]
        public async Task<List<DTORecept>> getNeverifikovaniRecepti()
        {
            return await Context.Recepts.Include(p => p.Namirnice).Where(l => l.Odobrio == null).Select(p => new DTORecept
            {
                ID = p.ID,
                Naziv = p.Naziv,
                Tekst = p.Tekst,
                ImgPath = p.ImgPath,
                KcalVrednost = p.KcalVrednost,
                BrojPorcija = p.BrojPorcija,
                VremePripreme = p.VremePripreme,
                Autor = p.Objavio.UserName
            }).ToListAsync();
        }

        //tested,radi
        //brisanje recepata sa odgovarajucim ID-om
        [HttpDelete]
        [Authorize(Roles = "Admin,Privilegovani")]
        [Route("DeleteRecept/{receptID}")]
        public async Task deleteRecept(int receptID)
        {
            var recept = await Context.Recepts.Where(p => p.ID == receptID).FirstOrDefaultAsync();
            var receptiNamirnice = await Context.ReceptiNamirnices.Where(p => p.Recept.ID == receptID).ToListAsync();

            deletePic(recept.ImgPath);
            if (recept != null)
            {
                if (receptiNamirnice != null)
                {
                    foreach (ReceptiNamirnice n in receptiNamirnice)
                    {
                        Context.Remove(n);
                        await Context.SaveChangesAsync();
                    }
                }
                Context.Remove(recept);
                await Context.SaveChangesAsync();
            }
        }

        #endregion

        #region BookMarks

        //TODO: Proveriti sa Natalijom da li vracam trazeno
        //Ostali funkcije za bookmark testirane rade dobro

        [HttpGet]
        [Authorize]
        [Route("Bookmark")]
        public async Task<List<DTORecept>> GetBookMarkAsync()
        {
            var username = HttpContext.User.Identity.Name;
            return await Context.BookMarks.Where(p => p.ApplicationUser.UserName == username).Select(p => new DTORecept
            {
                ID = p.Recept.ID,
                Naziv = p.Recept.Naziv,
                Tekst = p.Recept.Tekst,
                ImgPath = p.Recept.ImgPath,
                KcalVrednost = p.Recept.KcalVrednost,
                BrojPorcija = p.Recept.BrojPorcija,
                VremePripreme = p.Recept.VremePripreme,
                ProsecnaOcena = p.Recept.ProsecnaOcena
            }).ToListAsync();
        }

        [HttpPost]
        [Authorize]
        [Route("PostBookmark/{receptID}")]
        public async Task PostBookmark(int receptID)
        {
            var user = HttpContext.User.Identity.Name;
            var r = await Context.Recepts.Where(p => p.ID == receptID).FirstAsync();
            var u = await Context.ApplicationUser.Where(p => p.UserName == user).FirstAsync();
            var possibility = await Context.BookMarks.Where(p => p.Recept == r && p.ApplicationUser == u).FirstOrDefaultAsync();
            if (possibility != null)
            {
                return;
            }
            BookMark bookmark = new BookMark();
            bookmark.Recept = r;
            bookmark.ApplicationUser = u;

            Context.BookMarks.Add(bookmark);
            await Context.SaveChangesAsync();
        }

        [HttpDelete]
        [Authorize]
        [Route("deleteBookMark/{receptID}")]
        public async Task deleteBookmark(int receptID)
        {
            var user = HttpContext.User.Identity.Name;
            var bookmark = await Context.BookMarks.Where(p => p.ApplicationUser.UserName == user && p.Recept.ID == receptID).FirstAsync();
            if (bookmark != null)
            {
                Context.Remove(bookmark);
                await Context.SaveChangesAsync();

            }
        }

        #endregion

        #region Komentari

        //Tested, radi dobro  !!     
        [HttpPost]
        [Authorize]
        [Route("postaviKom/{receptID}")]
        public async Task postKomentar([FromBody] Komentar komentar, int receptID)
        {
            if (ModelState.IsValid)
            {


                var username = HttpContext.User.Identity.Name;
                var korisnik = await Context.ApplicationUser.Where(p => p.UserName == username).FirstAsync();
                var recepts = await Context.Recepts.Where(p => p.ID == receptID && p.Odobrio != null).FirstAsync();
                if (korisnik == null || recepts == null)
                {
                    return;
                }
                komentar.ApplicationUser = korisnik;
                komentar.Recept = recepts;

                Context.Komentars.Add(komentar);
                await Context.SaveChangesAsync();
            }
        }
        //Tested radi dobro
        //ovo sve treba da stavimo authorization jos nzm kako
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        [Route("deleteKom/{komentarID}")]
        public async Task deleteKomentar(int komentarID)
        {
            var komentar = await Context.Komentars.Where(p => p.ID == komentarID).FirstOrDefaultAsync();
            var OcenaKomentara = await Context.OceneNaKoms.Where(p => p.Komentar.ID == komentarID).ToListAsync();
            if (komentar != null)
            {
                if (OcenaKomentara != null)
                {
                    foreach (OceneNaKom o in OcenaKomentara)
                    {
                        Context.Remove(o);
                        await Context.SaveChangesAsync();
                    }
                }

                Context.Remove(komentar);
                await Context.SaveChangesAsync();

            }
        }
        #endregion

        #region OcenjivanjeRecepta

        //Tested, radi       
        [HttpPost]
        [Authorize]
        [Route("PostOcena/{receptID}/{ocena}")]
        public async Task<float> postOcena(int receptID, int ocena)
        {
            //ispituje dal je vec ocenio
            //ako nije
            //dodaje veza i izracuvana nova ocena recepta
            //menja vrednost pcene kod recepta
            //ovako stoji i kod PrijaviRecept i prijaviKorisnika u User ako je lose [promeni]
            var korisnik = HttpContext.User.Identity.Name;
            var posibility = await Context.ReakcijaNaReceptes.Where(p => p.ApplicationUser.UserName == korisnik
                                                                  && p.Recept.ID == receptID).FirstOrDefaultAsync();
            if (posibility == null)
            {
                var opt = await Context.ApplicationUser.Where(p => p.UserName == korisnik).FirstAsync();
                var tz = await Context.Recepts.Where(p => p.ID == receptID).FirstAsync();
                if (opt != null && tz != null)
                {
                    ReakcijaNaRecepte o = new ReakcijaNaRecepte();
                    o.ApplicationUser = opt;
                    o.Recept = tz;
                    o.Ocena = ocena;


                    var e = await this.IzmeniOcenu(tz, ocena);

                    Context.ReakcijaNaReceptes.Add(o);
                    await Context.SaveChangesAsync();
                    return e;
                }
            }
            return 10000;
        }
        #region PomocnaFjaZaOcenuRecepta
        //tested, radi
        //ovo je pomocna funkcija za gornji deo gde update recept
        [HttpPut]
        [Authorize]
        public async Task<float> IzmeniOcenu(Recept recept, float ocena)
        {
            if (recept != null && ocena >= 1 && ocena <= 5)
            {
                var brOcenjivanja = await Context.ReakcijaNaReceptes.Where(p => p.Recept.ID == recept.ID).CountAsync();
                recept.ProsecnaOcena = ((recept.ProsecnaOcena * brOcenjivanja) + ocena) / (brOcenjivanja + 1);
                Context.Update<Recept>(recept);
                await Context.SaveChangesAsync();
                return recept.ProsecnaOcena;
            }
            return 10000;

        }
        #endregion
        #endregion

        #region OcenjivanjeKomentara

        //tested, radi        
        [HttpPost]
        [Authorize]
        [Route("PostOcenaKomentara/{komentar}")]

        public async Task<IActionResult> postOcenaKom(int komentar)
        {
            var korisnik = HttpContext.User.Identity.Name;
            var posibility = await Context.OceneNaKoms.Where(p => p.ApplicationUser.UserName == korisnik
                                                            && p.Komentar.ID == komentar).FirstOrDefaultAsync();
            if (posibility == null) //ukoliko vec nije ocenio
            {
                OceneNaKom ocena = new OceneNaKom();
                var opt = await Context.ApplicationUser.Where(p => p.UserName == korisnik).FirstAsync();
                var tz = await Context.Komentars.Where(p => p.ID == komentar).FirstAsync();
                if (opt != null && tz != null)
                {
                    ocena.ApplicationUser = opt;
                    ocena.Komentar = tz;
                    //bilo je pitanje kako za prikazivanje ocena komentara
                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    //Vi na frontendu kada klikne na dugme lajk povecajte ocenu 'staticki' a sledeci put kad refresa bice napisana ta ocena
                    Context.OceneNaKoms.Add(ocena);
                    await Context.SaveChangesAsync();
                    return Ok();
                }
                else
                {

                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }
        }
        #endregion

    }
}