using Microsoft.EntityFrameworkCore.Migrations;

namespace ReceByteBackend.Migrations
{
    public partial class initBazaBezVirtualFja : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Namirnice",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Vrsta = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KcalVrednost = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Namirnice", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "PrijavljeniKorisnici",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TuzibabaId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    PrijavljenId = table.Column<string>(type: "nvarchar(450)", nullable: true)
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
                name: "Recept",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tekst = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImgPath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KcalVrednost = table.Column<int>(type: "int", nullable: false),
                    BrojPorcija = table.Column<int>(type: "int", nullable: false),
                    ObjavioId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    OdobrioId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recept", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Recept_AspNetUsers_ObjavioId",
                        column: x => x.ObjavioId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Recept_AspNetUsers_OdobrioId",
                        column: x => x.OdobrioId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Frizider",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    NamirniceID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Frizider", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Frizider_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Frizider_Namirnice_NamirniceID",
                        column: x => x.NamirniceID,
                        principalTable: "Namirnice",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BookMark",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ReceptID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookMark", x => x.ID);
                    table.ForeignKey(
                        name: "FK_BookMark_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BookMark_Recept_ReceptID",
                        column: x => x.ReceptID,
                        principalTable: "Recept",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Komentar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tekst = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ReceptID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Komentar", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Komentar_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Komentar_Recept_ReceptID",
                        column: x => x.ReceptID,
                        principalTable: "Recept",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PrijavljeniRecepti",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
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

            migrationBuilder.CreateTable(
                name: "ReakcijaNaRecepte",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ocena = table.Column<int>(type: "int", nullable: false),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ReceptID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReakcijaNaRecepte", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ReakcijaNaRecepte_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ReakcijaNaRecepte_Recept_ReceptID",
                        column: x => x.ReceptID,
                        principalTable: "Recept",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ReceptiNamirnice",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReceptID = table.Column<int>(type: "int", nullable: true),
                    NamirniceID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReceptiNamirnice", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ReceptiNamirnice_Namirnice_NamirniceID",
                        column: x => x.NamirniceID,
                        principalTable: "Namirnice",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ReceptiNamirnice_Recept_ReceptID",
                        column: x => x.ReceptID,
                        principalTable: "Recept",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OceneNaKom",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ocena = table.Column<int>(type: "int", nullable: false),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    KomentarID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OceneNaKom", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OceneNaKom_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OceneNaKom_Komentar_KomentarID",
                        column: x => x.KomentarID,
                        principalTable: "Komentar",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_BookMark_ApplicationUserId",
                table: "BookMark",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_BookMark_ReceptID",
                table: "BookMark",
                column: "ReceptID");

            migrationBuilder.CreateIndex(
                name: "IX_Frizider_ApplicationUserId",
                table: "Frizider",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Frizider_NamirniceID",
                table: "Frizider",
                column: "NamirniceID");

            migrationBuilder.CreateIndex(
                name: "IX_Komentar_ApplicationUserId",
                table: "Komentar",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Komentar_ReceptID",
                table: "Komentar",
                column: "ReceptID");

            migrationBuilder.CreateIndex(
                name: "IX_OceneNaKom_ApplicationUserId",
                table: "OceneNaKom",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_OceneNaKom_KomentarID",
                table: "OceneNaKom",
                column: "KomentarID");

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

            migrationBuilder.CreateIndex(
                name: "IX_ReakcijaNaRecepte_ApplicationUserId",
                table: "ReakcijaNaRecepte",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ReakcijaNaRecepte_ReceptID",
                table: "ReakcijaNaRecepte",
                column: "ReceptID");

            migrationBuilder.CreateIndex(
                name: "IX_Recept_ObjavioId",
                table: "Recept",
                column: "ObjavioId");

            migrationBuilder.CreateIndex(
                name: "IX_Recept_OdobrioId",
                table: "Recept",
                column: "OdobrioId");

            migrationBuilder.CreateIndex(
                name: "IX_ReceptiNamirnice_NamirniceID",
                table: "ReceptiNamirnice",
                column: "NamirniceID");

            migrationBuilder.CreateIndex(
                name: "IX_ReceptiNamirnice_ReceptID",
                table: "ReceptiNamirnice",
                column: "ReceptID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookMark");

            migrationBuilder.DropTable(
                name: "Frizider");

            migrationBuilder.DropTable(
                name: "OceneNaKom");

            migrationBuilder.DropTable(
                name: "PrijavljeniKom");

            migrationBuilder.DropTable(
                name: "PrijavljeniKorisnici");

            migrationBuilder.DropTable(
                name: "PrijavljeniRecepti");

            migrationBuilder.DropTable(
                name: "ReakcijaNaRecepte");

            migrationBuilder.DropTable(
                name: "ReceptiNamirnice");

            migrationBuilder.DropTable(
                name: "Komentar");

            migrationBuilder.DropTable(
                name: "Namirnice");

            migrationBuilder.DropTable(
                name: "Recept");
        }
    }
}
