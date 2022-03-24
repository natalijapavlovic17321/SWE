using Microsoft.EntityFrameworkCore.Migrations;

namespace ReceByteBackend.Migrations
{
    public partial class newMigrations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VremePripreme",
                table: "Recept",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ReceptID",
                table: "Namirnice",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Namirnice_ReceptID",
                table: "Namirnice",
                column: "ReceptID");

            migrationBuilder.AddForeignKey(
                name: "FK_Namirnice_Recept_ReceptID",
                table: "Namirnice",
                column: "ReceptID",
                principalTable: "Recept",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Namirnice_Recept_ReceptID",
                table: "Namirnice");

            migrationBuilder.DropIndex(
                name: "IX_Namirnice_ReceptID",
                table: "Namirnice");

            migrationBuilder.DropColumn(
                name: "VremePripreme",
                table: "Recept");

            migrationBuilder.DropColumn(
                name: "ReceptID",
                table: "Namirnice");
        }
    }
}
