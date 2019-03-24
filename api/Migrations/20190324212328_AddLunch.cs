using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Octogami.LunchTracker.Api.Migrations
{
    public partial class AddLunch : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Restaurant",
                schema: "lt",
                columns: table => new
                {
                    RestaurantId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Verified = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Restaurant", x => x.RestaurantId);
                });

            migrationBuilder.CreateTable(
                name: "Revisit",
                schema: "lt",
                columns: table => new
                {
                    RevisitId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Revisit", x => x.RevisitId);
                });

            migrationBuilder.CreateTable(
                name: "Lunch",
                schema: "lt",
                columns: table => new
                {
                    LunchId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AppUserId = table.Column<int>(nullable: false),
                    RestaurantId = table.Column<int>(nullable: false),
                    Cost = table.Column<decimal>(type: "decimal(9,2)", nullable: false),
                    RevisitId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lunch", x => x.LunchId);
                    table.ForeignKey(
                        name: "FK_Lunch_AppUser_AppUserId",
                        column: x => x.AppUserId,
                        principalSchema: "lt",
                        principalTable: "AppUser",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Lunch_Restaurant_RestaurantId",
                        column: x => x.RestaurantId,
                        principalSchema: "lt",
                        principalTable: "Restaurant",
                        principalColumn: "RestaurantId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Lunch_Revisit_RevisitId",
                        column: x => x.RevisitId,
                        principalSchema: "lt",
                        principalTable: "Revisit",
                        principalColumn: "RevisitId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                schema: "lt",
                table: "Restaurant",
                columns: new[] { "RestaurantId", "Name", "Verified" },
                values: new object[,]
                {
                    { 1, "McDonald's", true },
                    { 160, "Which Wich Superior Sandwiches", true },
                    { 161, "Big Boy", true },
                    { 162, "Newk's Eatery", true },
                    { 163, "Rubio's", true },
                    { 164, "Bahama Breeze Island Grille", true },
                    { 165, "Mastro's Restaurants", true },
                    { 166, "Legal Sea Foods", true },
                    { 167, "Luby's", true },
                    { 168, "Claim Jumper", true },
                    { 169, "Fuddruckers", true },
                    { 170, "Shoney's", true },
                    { 171, "Penn Station East Coast Subs", true },
                    { 172, "Cafe Rio Mexican Grill", true },
                    { 173, "McCormick and Schmick's", true },
                    { 174, "Old Country Buffet", true },
                    { 175, "Mimi's Cafe", true },
                    { 176, "Buca di Beppo", true },
                    { 177, "Taco Bueno", true },
                    { 178, "Johnny Rockets", true },
                    { 179, "la Madeleine Country French Cafe", true },
                    { 180, "Bubba Gump Shrimp Co. Restaurant and Market", true },
                    { 181, "Le Pain Quotidien", true },
                    { 182, "Beef 'O' Brady's", true },
                    { 183, "Uncle Julio's", true },
                    { 184, "Fuzzy's Taco Shop", true },
                    { 185, "Menchie's Frozen Yogurt", true },
                    { 186, "Houlihan's", true },
                    { 159, "UNO Pizzeria and Grill", true },
                    { 187, "Pret a Manger", true },
                    { 158, "Romano's Macaroni Grill", true },
                    { 156, "AandW All-American Food", true },
                    { 129, "Taco Cabana", true },
                    { 130, "Rally's Hamburgers", true },
                    { 131, "Fogo de Chao", true },
                    { 132, "Peet's Coffee and Tea", true },
                    { 133, "Friendly's", true },
                    { 134, "Hard Rock Cafe", true },
                    { 135, "Joe's Crab Shack", true },
                    { 136, "Blaze Pizza", true },
                    { 137, "MOD Pizza", true },
                    { 138, "Wienerschnitzel", true },
                    { 139, "Old Chicago Pizza and Taproom", true },
                    { 140, "Caribou Coffee", true },
                    { 141, "Huddle House", true },
                    { 142, "Godfather's Pizza", true },
                    { 143, "Black Bear Diner", true },
                    { 144, "Morton's The Steakhouse", true },
                    { 145, "Seasons 52", true },
                    { 146, "Bill Miller Bar-B-Q", true },
                    { 147, "Sizzler", true },
                    { 148, "Saltgrass Steak House", true },
                    { 149, "Cooper's Hawk Winery and Restaurants", true },
                    { 150, "Brio Tuscan Grille", true },
                    { 151, "Sbarro", true },
                    { 152, "Dutch Bros. Coffee", true },
                    { 153, "Souplantation and Sweet Tomatoes", true },
                    { 154, "Pizza Ranch", true },
                    { 155, "Fazoli's", true },
                    { 157, "Sonny's BBQ", true },
                    { 188, "Torchy's Tacos", true },
                    { 189, "Sarku Japan", true },
                    { 190, "Bertucci's", true },
                    { 223, "Togo's Sandwiches", true },
                    { 224, "Mountain Mike's Pizza", true },
                    { 225, "Grand Lux Cafe", true },
                    { 226, "Roy Rogers Restaurants", true },
                    { 227, "Cantina Laredo", true },
                    { 228, "Freebirds World Burrito", true },
                    { 229, "Tijuana Flats", true },
                    { 230, "Duffy's Sports Grill", true },
                    { 231, "Lazy Dog Restaurant and Bar", true },
                    { 232, "Biggby Coffee", true },
                    { 233, "PDQ", true },
                    { 234, "Johnny Carino's", true },
                    { 235, "Marie Callender's Restaurant and Bakery", true },
                    { 236, "Pizza Pro", true },
                    { 237, "Villa Fresh Italian Kitchen", true },
                    { 238, "STK", true },
                    { 239, "Great American Cookies", true },
                    { 240, "Wayback Burgers", true },
                    { 241, "Pollo Campero", true },
                    { 242, "The Coffee Bean and Tea Leaf", true },
                    { 243, "Main Event", true },
                    { 244, "Papa Gino's Pizzeria", true },
                    { 245, "Quaker Steak and Lube", true },
                    { 246, "Gatti's Pizza", true },
                    { 247, "Rita's Ice", true },
                    { 248, "Ponderosa", true },
                    { 249, "Il Fornaio", true },
                    { 222, "Roosters", true },
                    { 221, "Bravo Cucina Italiana", true },
                    { 220, "Tilted Kilt Pub and Eatery", true },
                    { 219, "Wetzel's Pretzels", true },
                    { 191, "The Melting Pot", true },
                    { 192, "J. Alexander's", true },
                    { 193, "Smokey Bones Bar and Fire Grill", true },
                    { 194, "Kona Grill", true },
                    { 195, "Bruegger's Bagels", true },
                    { 196, "Cinnabon", true },
                    { 197, "Islands Fine Burgers and Drinks", true },
                    { 198, "Del Frisco's Double Eagle Steak House", true },
                    { 199, "Yogurtland", true },
                    { 200, "Pappasito's Cantina", true },
                    { 201, "Eat'n Park", true },
                    { 202, "Donatos Pizza", true },
                    { 203, "Golden Chick", true },
                    { 128, "Texas de Brazil Churrascaria", true },
                    { 204, "The Original Pancake House", true },
                    { 206, "WaBa Grill", true },
                    { 207, "Rainforest Cafe", true },
                    { 208, "Farmer Boys", true },
                    { 209, "Baja Fresh Mexican Grill", true },
                    { 210, "LaRosa's Pizzeria", true },
                    { 211, "Lucille's Smokehouse Bar-B-Que", true },
                    { 212, "Shari's Cafe and Pies", true },
                    { 213, "Jack's", true },
                    { 214, "BurgerFi", true },
                    { 215, "Black Angus Steakhouse", true },
                    { 216, "Hurricane Grill and Wings", true },
                    { 217, "The Old Spaghetti Factory", true },
                    { 218, "Anthony's Coal Fired Pizza", true },
                    { 205, "Firebirds Wood Fired Grill", true },
                    { 127, "Fleming's Prime Steakhouse and Wine Bar", true },
                    { 126, "Ninety Nine Restaurants", true },
                    { 62, "Tim Hortons", true },
                    { 35, "The Cheesecake Factory", true },
                    { 36, "Zaxby's", true },
                    { 37, "Golden Corral", true },
                    { 38, "LongHorn Steakhouse", true },
                    { 39, "Red Robin Gourmet Burgers and Brews", true },
                    { 40, "Carl's Jr.", true },
                    { 41, "Five Guys Burgers and Fries", true },
                    { 42, "Culver's", true },
                    { 43, "TGI Fridays", true },
                    { 44, "Waffle House", true },
                    { 45, "Bojangles' Famous Chicken 'N Biscuits", true },
                    { 46, "Steak 'n Shake", true },
                    { 47, "Wingstop", true },
                    { 48, "BJ's Restaurant and Brewhouse", true },
                    { 49, "Jersey Mike's Subs", true },
                    { 50, "Raising Cane's Chicken Fingers", true },
                    { 51, "Bob Evans", true },
                    { 52, "In-N-Out Burger", true },
                    { 53, "Krispy Kreme", true },
                    { 54, "P.F. Chang's", true },
                    { 55, "Hooters", true },
                    { 56, "El Pollo Loco", true },
                    { 57, "Papa Murphy's Pizza", true },
                    { 58, "Ruby Tuesday", true },
                    { 59, "Qdoba Mexican Eats", true },
                    { 60, "Del Taco", true },
                    { 61, "Church's Chicken", true },
                    { 34, "Whataburger", true },
                    { 125, "First Watch", true },
                    { 33, "Red Lobster", true },
                    { 31, "Cracker Barrel Old Country Store", true },
                    { 4, "Taco Bell", true },
                    { 5, "Burger King", true },
                    { 6, "Wendy's", true },
                    { 7, "Chick-fil-A", true },
                    { 8, "Dunkin' Donuts", true },
                    { 9, "Domino's", true },
                    { 10, "Pizza Hut", true },
                    { 11, "Panera Bread", true },
                    { 12, "KFC", true },
                    { 13, "Chipotle Mexican Grill", true },
                    { 14, "Sonic Drive-In", true },
                    { 15, "Applebee's", true },
                    { 16, "Olive Garden", true },
                    { 17, "Buffalo Wild Wings", true },
                    { 18, "Little Caesars", true },
                    { 19, "Dairy Queen", true },
                    { 20, "Arby's", true },
                    { 21, "Chili's Grill and Bar", true },
                    { 22, "Jack in the Box", true },
                    { 23, "IHOP", true },
                    { 24, "Panda Express", true },
                    { 25, "Popeyes Louisiana Kitchen", true },
                    { 26, "Papa John's", true },
                    { 27, "Denny's", true },
                    { 28, "Outback Steakhouse", true },
                    { 29, "Texas Roadhouse", true },
                    { 30, "Jimmy John's Gourmet Sandwiches", true },
                    { 32, "Hardee's", true },
                    { 63, "Cheddar's Scratch Kitchen", true },
                    { 64, "Moe's Southwest Grill", true },
                    { 65, "Firehouse Subs", true },
                    { 98, "Miller's Ale House", true },
                    { 99, "Famous Dave's", true },
                    { 100, "Krystal Co.", true },
                    { 101, "Tropical Smoothie Cafe", true },
                    { 102, "Charleys Philly Steaks", true },
                    { 103, "Cold Stone Creamery", true },
                    { 104, "Corner Bakery Cafe", true },
                    { 105, "Jet's Pizza", true },
                    { 106, "Village Inn", true },
                    { 107, "Chuy's", true },
                    { 108, "Taco John's", true },
                    { 109, "Shake Shack", true },
                    { 110, "Pollo Tropical", true },
                    { 111, "Pei Wei Asian Diner", true },
                    { 112, "The Habit Burger Grill", true },
                    { 113, "On the Border Mexican Grill and Cantina", true },
                    { 114, "Au Bon Pain", true },
                    { 115, "Pappadeaux Seafood Kitchen", true },
                    { 116, "Schlotzsky's", true },
                    { 117, "Portillo's", true },
                    { 118, "Benihana", true },
                    { 119, "Braum's Ice Cream and Dairy Stores", true },
                    { 120, "Smashburger", true },
                    { 121, "Zoes Kitchen", true },
                    { 122, "Twin Peaks", true },
                    { 123, "Bar Louie", true },
                    { 124, "Smoothie King", true },
                    { 97, "Chuck E. Cheese's", true },
                    { 96, "Hungry Howie's Pizza", true },
                    { 95, "Maggiano's Little Italy", true },
                    { 94, "Freddy's Frozen Custard and Steakburgers", true },
                    { 66, "California Pizza Kitchen", true },
                    { 67, "Ruth's Chris Steak House", true },
                    { 68, "Carrabba's Italian Grill", true },
                    { 69, "McAlister's Deli", true },
                    { 70, "Jason's Deli", true },
                    { 71, "Perkins Restaurant and Bakery", true },
                    { 72, "Bonefish Grill", true },
                    { 73, "Dickey's Barbecue Pit", true },
                    { 74, "Baskin-Robbins", true },
                    { 75, "Logan's Roadhouse", true },
                    { 76, "Boston Market", true },
                    { 77, "Auntie Anne's", true },
                    { 78, "Captain D's Seafood Kitchen", true },
                    { 3, "Subway", true },
                    { 79, "Checkers Drive-In Restaurants", true },
                    { 81, "White Castle", true },
                    { 82, "Einstein Bros. Bagels", true },
                    { 83, "Yard House", true },
                    { 84, "Noodles and Co.", true },
                    { 85, "Jamba Juice", true },
                    { 86, "Dave and Buster's", true },
                    { 87, "O'Charly's", true },
                    { 88, "Potbelly Sandwich Shop", true },
                    { 89, "Long John Silver's", true },
                    { 90, "Mellow Mushroom", true },
                    { 91, "Round Table Pizza", true },
                    { 92, "Cicis", true },
                    { 93, "The Capital Grille", true },
                    { 80, "Marco's Pizza", true },
                    { 2, "Starbucks", true }
                });

            migrationBuilder.InsertData(
                schema: "lt",
                table: "Revisit",
                columns: new[] { "RevisitId", "Value" },
                values: new object[,]
                {
                    { 2, "Yes" },
                    { 1, "Unsure" },
                    { 3, "No" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lunch_AppUserId",
                schema: "lt",
                table: "Lunch",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Lunch_RestaurantId",
                schema: "lt",
                table: "Lunch",
                column: "RestaurantId");

            migrationBuilder.CreateIndex(
                name: "IX_Lunch_RevisitId",
                schema: "lt",
                table: "Lunch",
                column: "RevisitId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Lunch",
                schema: "lt");

            migrationBuilder.DropTable(
                name: "Restaurant",
                schema: "lt");

            migrationBuilder.DropTable(
                name: "Revisit",
                schema: "lt");
        }
    }
}
