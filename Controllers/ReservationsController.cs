namespace kino.Controllers;

using Microsoft.AspNetCore.Mvc;
using kino.Services;
using kino.Entities;

[ApiController]
[Route("api/[controller]")]
public class ReservationsController : ControllerBase
{
    private readonly IReservationService _reservationsService;

    public ReservationsController(IReservationService reservationService)
    {
        _reservationsService = reservationService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
    {
        IEnumerable<Reservation> reservations = await _reservationsService.GetReservations();
        if (reservations == null) return NotFound();
        return Ok(reservations);
    }

    [HttpGet("users/{userId}")]
    public async Task<ActionResult<IEnumerable<Reservation>>> GetReservationsByUserId(int userId)
    {
        IEnumerable<Reservation> reservations = await _reservationsService.GetReservationsByUserId(userId);
        if (reservations == null) return NotFound();
        return Ok(reservations);
    }

    [HttpGet("viewings/{viewingId}")]
    public async Task<ActionResult<IEnumerable<Reservation>>> GetReservationsByViewingId(int viewingId)
    {
        IEnumerable<Reservation> reservations = await _reservationsService.GetReservationsByViewingId(viewingId);
        if (reservations == null) return NotFound();
        return Ok(reservations);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Reservation>> GetReservationById(int id)
    {
        Reservation reservation = await _reservationsService.GetReservationById(id);
        if (reservation == null) return NotFound();
        return Ok(reservation);
    }

    [HttpPut]
    public async Task<ActionResult<Reservation>> AddReservation(Reservation reservation)
    {
        Reservation _reservation = await _reservationsService.AddReservation(reservation);
        if (_reservation == null) return BadRequest();
        return Ok(_reservation);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeleteReservationById(int id)
    {
        bool success = await _reservationsService.DeleteReservationById(id);
        if (!success) return NotFound();
        return Ok();
    }
}