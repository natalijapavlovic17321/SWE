using Microsoft.EntityFrameworkCore.Migrations;

namespace ReceByteBackend.Migrations
{
    public partial class RazloziZaPrijavu2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Razlog",
                table: "PrijavljeniKorisnici",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Razlog",
                table: "PrijavljeniKorisnici");
        }
    }
}
