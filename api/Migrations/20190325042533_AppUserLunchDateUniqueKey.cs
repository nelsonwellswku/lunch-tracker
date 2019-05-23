using Microsoft.EntityFrameworkCore.Migrations;

namespace Octogami.LunchTracker.Api.Migrations
{
    public partial class AppUserLunchDateUniqueKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Lunch_AppUserId",
                schema: "lt",
                table: "Lunch");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Lunch_AppUserId_Date",
                schema: "lt",
                table: "Lunch",
                columns: new[] { "AppUserId", "Date" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_Lunch_AppUserId_Date",
                schema: "lt",
                table: "Lunch");

            migrationBuilder.CreateIndex(
                name: "IX_Lunch_AppUserId",
                schema: "lt",
                table: "Lunch",
                column: "AppUserId");
        }
    }
}
