namespace kino.Services;

using kino.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

public interface IViewingService
{
    Task<IEnumerable<Viewing>> GetViewings();
    Task<Viewing> GetViewingById(int id);
    Task<Viewing> AddViewing(Viewing viewing);
    Task<bool> DeleteViewingById(int id);
}

public class ViewingService : IViewingService
{
    private readonly DatabaseContext _context;

    public ViewingService(DatabaseContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Viewing>> GetViewings()
    {
        List<Viewing> viewings = await _context.Viewings.ToListAsync();
        viewings.ForEach(viewing => viewing.Movie = _context.Movies.FirstOrDefault(movie => movie.Id == viewing.MovieId));
        return viewings;
    }

    public async Task<Viewing> GetViewingById(int id)
    {
        Viewing viewing = await _context.Viewings.FirstOrDefaultAsync(viewing => viewing.Id == id);
        if (viewing == null) return null;
        viewing.Movie = await _context.Movies.FirstOrDefaultAsync(movie => movie.Id == viewing.MovieId);
        return viewing;
    }

    public async Task<Viewing> AddViewing(Viewing viewing)
    {
        Viewing _viewing = await GetViewingById(viewing.Id);
        if (_viewing == null) {
            EntityEntry<Viewing> __viewing = await _context.Viewings.AddAsync(viewing);
            await _context.SaveChangesAsync();
            return __viewing.Entity;
        } else {
            _context.ChangeTracker.Clear();
            _viewing = viewing;
            _context.Viewings.Update(_viewing);
            await _context.SaveChangesAsync();
            return _viewing;
        }
    }

    public async Task<bool> DeleteViewingById(int id)
    {
        Viewing viewing = await GetViewingById(id);
        if (viewing == null) return false;
        _context.Viewings.Remove(viewing);
        await _context.SaveChangesAsync();
        return true;
    }
}