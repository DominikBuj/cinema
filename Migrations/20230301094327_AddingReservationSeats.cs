using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace kino.Migrations
{
    /// <inheritdoc />
    public partial class AddingReservationSeats : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SelectedSeats",
                table: "Reservations",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SelectedSeats",
                table: "Reservations");
        }
    }
}
