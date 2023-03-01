namespace kino.Services;

using kino.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

public interface IReservationService
{
    Task<IEnumerable<Reservation>> GetReservations();
    Task<IEnumerable<Reservation>> GetReservationsByUserId(int userId);
    Task<IEnumerable<Reservation>> GetReservationsByViewingId(int viewingId);
    Task<Reservation> GetReservationById(int id);
    Task<Reservation> AddReservation(Reservation reservation);
    Task<bool> DeleteReservationById(int id);
}

public class ReservationService : IReservationService
{
    private readonly DatabaseContext _context;

    public ReservationService(DatabaseContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Reservation>> GetReservations()
    {
        List<Reservation> reservations = await _context.Reservations.ToListAsync();
        reservations.ForEach(reservation =>
        {
            reservation.Viewing = _context.Viewings.FirstOrDefault(viewing => viewing.Id == reservation.ViewingId);
            reservation.User = _context.Users.FirstOrDefault(user => user.Id == reservation.UserId);
        });
        return reservations;
    }

    public async Task<IEnumerable<Reservation>> GetReservationsByUserId(int userId)
    {
        List<Reservation> reservations = await _context.Reservations.Where(reservation => reservation.UserId == userId).ToListAsync();
        reservations.ForEach(reservation =>
        {
            reservation.Viewing = _context.Viewings.FirstOrDefault(viewing => viewing.Id == reservation.ViewingId);
            reservation.User = _context.Users.FirstOrDefault(user => user.Id == reservation.UserId);
        });
        DateTime cutoffTime = DateTime.Now.Subtract(new TimeSpan(0, 30, 0));
        reservations = reservations.Where(reservation =>
        {
            DateTime reservationTime = reservation.Viewing.Date.ToDateTime(reservation.Viewing.StartTime);
            return reservationTime >= cutoffTime;
        }).ToList();
        return reservations;
    }

    public async Task<IEnumerable<Reservation>> GetReservationsByViewingId(int viewingId)
    {
        List<Reservation> reservations = await _context.Reservations.Where(reservation => reservation.ViewingId == viewingId).ToListAsync();
        reservations.ForEach(reservation =>
        {
            reservation.Viewing = _context.Viewings.FirstOrDefault(viewing => viewing.Id == reservation.ViewingId);
            reservation.User = _context.Users.FirstOrDefault(user => user.Id == reservation.UserId);
        });
        DateTime cutoffTime = DateTime.Now;
        reservations = reservations.Where(reservation =>
        {
            DateTime reservationTime = reservation.Viewing.Date.ToDateTime(reservation.Viewing.StartTime);
            return reservationTime >= cutoffTime;
        }).ToList();
        return reservations;
    }

    public async Task<Reservation> GetReservationById(int id)
    {
        Reservation reservation = await _context.Reservations.FirstOrDefaultAsync(reservation => reservation.Id == id);
        if (reservation == null) return null;
        reservation.Viewing = await _context.Viewings.FirstOrDefaultAsync(viewing => viewing.Id == reservation.ViewingId);
        reservation.User = await _context.Users.FirstOrDefaultAsync(user => user.Id == reservation.UserId);
        return reservation;
    }

    public async Task<Reservation> AddReservation(Reservation reservation)
    {
        Reservation _reservation = await GetReservationById(reservation.Id);
        if (_reservation == null) {
            EntityEntry<Reservation> __reservation = await _context.Reservations.AddAsync(reservation);
            await _context.SaveChangesAsync();
            return __reservation.Entity;
        } else {
            _context.ChangeTracker.Clear();
            _reservation = reservation;
            _context.Reservations.Update(_reservation);
            await _context.SaveChangesAsync();
            return _reservation;
        }
    }

    public async Task<bool> DeleteReservationById(int id)
    {
        Reservation reservation = await GetReservationById(id);
        if (reservation == null) return false;
        _context.Reservations.Remove(reservation);
        await _context.SaveChangesAsync();
        return true;
    }
}