using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReceByteBackend.Models;
using ReceByteBackend.Models.Baza;

namespace ReceByteBackend
{
    public class ReceByteContext : IdentityDbContext<ApplicationUser>
    {

    public DbSet<BookMark> BookMarks{ get; set;}   
    public DbSet<Frizider> Friziders{ get; set;}
    public DbSet<Komentar> Komentars{ get; set;}
    public DbSet<Namirnice> Namirnices{ get; set;}
    public DbSet<OceneNaKom> OceneNaKoms{ get; set;}
    public DbSet<ReakcijaNaRecepte> ReakcijaNaReceptes{ get; set;}
    public DbSet<Recept> Recepts{ get; set;}
    public DbSet<ReceptiNamirnice> ReceptiNamirnices{ get; set;}
    public DbSet<ApplicationUser> ApplicationUser{get;set;}

     public ReceByteContext(DbContextOptions<ReceByteContext> options): base(options)
     {
         
     }
     protected override void OnModelCreating(ModelBuilder builder)
     {
       base.OnModelCreating(builder);
     }
    }
}