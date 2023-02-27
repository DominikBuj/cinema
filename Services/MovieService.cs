namespace kino.Services;

using kino.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

public interface IMovieService
{
    Task<IEnumerable<Movie>> GetMovies();
    Task<Movie> GetMovieById(int id);
    Task<Movie> AddMovie(Movie movie);
    Task<bool> DeleteMovieById(int id);
}

public class MovieService : IMovieService
{
    private readonly DatabaseContext _context;

    public MovieService(DatabaseContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Movie>> GetMovies()
    {
        return await _context.Movies.ToListAsync();
    }

    public async Task<Movie> GetMovieById(int id)
    {
        return await _context.Movies.FirstOrDefaultAsync(movie => movie.Id == id);
    }

    public async Task<Movie> AddMovie(Movie movie)
    {
        Movie _movie = await GetMovieById(movie.Id);
        if (_movie == null) {
            EntityEntry<Movie> __movie = await _context.Movies.AddAsync(movie);
            await _context.SaveChangesAsync();
            return __movie.Entity;
        } else {
            _context.ChangeTracker.Clear();
            _movie = movie;
            _context.Movies.Update(_movie);
            await _context.SaveChangesAsync();
            return _movie;
        }
    }

    public async Task<bool> DeleteMovieById(int id)
    {
        Movie movie = await GetMovieById(id);
        if (movie == null) return false;
        _context.Movies.Remove(movie);
        await _context.SaveChangesAsync();
        return true;
    }
}