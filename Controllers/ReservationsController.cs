namespace kino.Controllers;

using Microsoft.AspNetCore.Mvc;
using kino.Services;
using kino.Entities;
using kino.Models;

[ApiController]
[Route("api/[controller]")]
public class ReservationsController : ControllerBase
{
    private readonly IReservationService _reservationsService;
    private readonly IEmailService _emailService;
    private readonly IMovieService _movieService;

    public ReservationsController(IReservationService reservationService, IEmailService emailService, IMovieService movieService)
    {
        _reservationsService = reservationService;
        _emailService = emailService;
        _movieService = movieService;
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
        Reservation __reservation = await _reservationsService.GetReservationById(_reservation.Id);
        Movie movie = await _movieService.GetMovieById(_reservation.Viewing.MovieId);
        SendConfirmationEmail(__reservation, movie);
        return Ok(_reservation);
    }

    private async void SendConfirmationEmail(Reservation reservation, Movie movie)
    {
        List<string> to = new List<string>{ reservation.User.Email };
        string subject = $"Reservation {reservation.Id} Confirmation";
        string content =
        $"""
        Hello {reservation.User.Name},

        Thank you for your reservation for the viewing of {movie.Name}
        on the date of {reservation.Viewing.Date}, starting at {reservation.Viewing.StartTime}.
        Your reservation number is: {reservation.Id}.

        Sincerely,
        Fake Cinema
        """;
        EmailMessage emailMessage = new EmailMessage(to, subject, content);
        await _emailService.SendEmail(emailMessage);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeleteReservationById(int id)
    {
        Reservation reservation = await _reservationsService.GetReservationById(id);
        Movie movie = await _movieService.GetMovieById(reservation.Viewing.MovieId);
        bool success = await _reservationsService.DeleteReservationById(id);
        if (!success) return NotFound();
        SendCancellationEmail(reservation, movie);
        return Ok();
    }

    private async void SendCancellationEmail(Reservation reservation, Movie movie)
    {
        List<string> to = new List<string>{ reservation.User.Email };
        string subject = $"Reservation {reservation.Id} Cancellation";
        string content =
        $"""
        Hello {reservation.User.Name},

        We would like to inform you about the cancellation of your reservation for the viewing of {movie.Name}
        on the date of {reservation.Viewing.Date}, starting at {reservation.Viewing.StartTime}.
        Your reservation number was: {reservation.Id}.

        Sincerely,
        Fake Cinema
        """;
        EmailMessage emailMessage = new EmailMessage(to, subject, content);
        await _emailService.SendEmail(emailMessage);
    }
}