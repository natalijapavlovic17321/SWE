using Microsoft.EntityFrameworkCore.Migrations;

namespace ReceByteBackend.Migrations
{
    public partial class RazloziZaPrijavu : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Razlog",
                table: "PrijavljeniRecepti",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Razlog",
                table: "PrijavljeniRecepti");
        }
    }
}
