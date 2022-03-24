using Microsoft.EntityFrameworkCore.Migrations;

namespace ReceByteBackend.Migrations
{
    public partial class FinalTouch : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Komentar_Recept_ReceptID",
                table: "Komentar");

            migrationBuilder.DropTable(
                name: "PrijavljeniKom");

            migrationBuilder.DropTable(
                name: "PrijavljeniKorisnici");

            migrationBuilder.DropTable(
                name: "PrijavljeniRecepti");

            migrationBuilder.DropColumn(
                name: "Ocena",
                table: "OceneNaKom");

            migrationBuilder.AlterColumn<string>(
                name: "Tekst",
                table: "Recept",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Naziv",
                table: "Recept",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ImgPath",
                table: "Recept",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Vrsta",
                table: "Namirnice",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Naziv",
                table: "Namirnice",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Tekst",
                table: "Komentar",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ReceptID",
                table: "Komentar",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "AspNetUsers",
                type: "nvarchar(40)",
                maxLength: 40,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Komentar_Recept_ReceptID",
                table: "Komentar",
                column: "ReceptID",
                principalTable: "Recept",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Komentar_Recept_ReceptID",
                table: "Komentar");

            migrationBuilder.AlterColumn<string>(
                name: "Tekst",
                table: "Recept",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Naziv",
                table: "Recept",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "ImgPath",
                table: "Recept",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "Ocena",
                table: "OceneNaKom",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Vrsta",
                table: "Namirnice",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Naziv",
                table: "Namirnice",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Tekst",
                table: "Komentar",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "ReceptID",
                table: "Komentar",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(40)",
                oldMaxLength: 40,
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "PrijavljeniKom",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    KomentarID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrijavljeniKom", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PrijavljeniKom_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PrijavljeniKom_Komentar_KomentarID",
                        column: x => x.KomentarID,
                        principalTable: "Komentar",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PrijavljeniKorisnici",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PrijavljenId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Razlog = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TuzibabaId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrijavljeniKorisnici", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PrijavljeniKorisnici_AspNetUsers_PrijavljenId",
                        column: x => x.PrijavljenId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PrijavljeniKorisnici_AspNetUsers_TuzibabaId",
                        column: x => x.TuzibabaId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PrijavljeniRecepti",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Razlog = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReceptID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrijavljeniRecepti", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PrijavljeniRecepti_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PrijavljeniRecepti_Recept_ReceptID",
                        column: x => x.ReceptID,
                        principalTable: "Recept",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PrijavljeniKom_ApplicationUserId",
                table: "PrijavljeniKom",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_PrijavljeniKom_KomentarID",
                table: "PrijavljeniKom",
                column: "KomentarID");

            migrationBuilder.CreateIndex(
                name: "IX_PrijavljeniKorisnici_PrijavljenId",
                table: "PrijavljeniKorisnici",
                column: "PrijavljenId");

            migrationBuilder.CreateIndex(
                name: "IX_PrijavljeniKorisnici_TuzibabaId",
                table: "PrijavljeniKorisnici",
                column: "TuzibabaId");

            migrationBuilder.CreateIndex(
                name: "IX_PrijavljeniRecepti_ApplicationUserId",
                table: "PrijavljeniRecepti",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_PrijavljeniRecepti_ReceptID",
                table: "PrijavljeniRecepti",
                column: "ReceptID");

            migrationBuilder.AddForeignKey(
                name: "FK_Komentar_Recept_ReceptID",
                table: "Komentar",
                column: "ReceptID",
                principalTable: "Recept",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
