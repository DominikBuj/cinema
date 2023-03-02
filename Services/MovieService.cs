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
        List<Movie> movies = await _context.Movies.ToListAsync();
        DateTime now = DateTime.Now;
        movies.ForEach(movie => movie.Viewings = _context.Viewings
            .Where(viewing => (viewing.MovieId == movie.Id && viewing.Date.ToDateTime(viewing.StartTime) >= now)).ToList());
        return movies;
    }

    public async Task<Movie> GetMovieById(int id)
    {
        Movie movie = await _context.Movies.FirstOrDefaultAsync(movie => movie.Id == id);
        if (movie == null) return null;
        DateTime now = DateTime.Now;
        movie.Viewings = _context.Viewings
            .Where(viewing => (viewing.MovieId == movie.Id && viewing.Date.ToDateTime(viewing.StartTime) >= now)).ToList();
        return movie;
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