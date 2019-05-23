using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Octogami.LunchTracker.Api.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "lt");

            migrationBuilder.CreateTable(
                name: "IdentityProvider",
                schema: "lt",
                columns: table => new
                {
                    IdentityProviderId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IdentityProvider", x => x.IdentityProviderId);
                    table.UniqueConstraint("AK_IdentityProvider_Name", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "AppUser",
                schema: "lt",
                columns: table => new
                {
                    AppUserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ExternalUserId = table.Column<string>(nullable: false),
                    FirstName = table.Column<string>(maxLength: 50, nullable: false),
                    LastName = table.Column<string>(maxLength: 50, nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    UpdateDate = table.Column<DateTime>(nullable: false),
                    IdentityProviderId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUser", x => x.AppUserId);
                    table.UniqueConstraint("AK_AppUser_AppUserId_IdentityProviderId", x => new { x.AppUserId, x.IdentityProviderId });
                    table.ForeignKey(
                        name: "FK_AppUser_IdentityProvider_IdentityProviderId",
                        column: x => x.IdentityProviderId,
                        principalSchema: "lt",
                        principalTable: "IdentityProvider",
                        principalColumn: "IdentityProviderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                schema: "lt",
                table: "IdentityProvider",
                columns: new[] { "IdentityProviderId", "Name" },
                values: new object[] { 1, "Google" });

            migrationBuilder.CreateIndex(
                name: "IX_AppUser_IdentityProviderId",
                schema: "lt",
                table: "AppUser",
                column: "IdentityProviderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppUser",
                schema: "lt");

            migrationBuilder.DropTable(
                name: "IdentityProvider",
                schema: "lt");
        }
    }
}
