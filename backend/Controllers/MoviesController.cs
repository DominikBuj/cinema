namespace cinema.Controllers;

using Microsoft.AspNetCore.Mvc;
using cinema.Services;
using cinema.Entities;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private readonly IMovieService _movieService;
    private readonly IViewingService _viewingService;

    public MoviesController(IMovieService movieService, IViewingService viewingService)
    {
        _movieService = movieService;
        _viewingService = viewingService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Movie>>> GetMovies()
    {
        IEnumerable<Movie> movies = await _movieService.GetMovies();
        if (movies == null) return NotFound();
        return Ok(movies);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Movie>> GetMovieById(int id)
    {
        Movie movie = await _movieService.GetMovieById(id);
        if (movie == null) return NotFound();
        return Ok(movie);
    }

    [HttpGet("{id}/{viewingDate}/possibleStartTimes")]
    public async Task<List<TimeOnly>> GetMoviePossibleStartTimes(int id, DateOnly viewingDate)
    {
        Movie movie = await _movieService.GetMovieById(id);
        TimeSpan movieDuration = new TimeSpan(movie.DurationHours, movie.DurationMinutes, 0);
        DateTime dayCutoff = viewingDate.ToDateTime(new TimeOnly(23, 0)).Subtract(movieDuration);
        List<Viewing> viewings = await _viewingService.GetViewingsByDate(viewingDate);

        List<TimeOnly> allPossibleStartTimes = new List<TimeOnly>();
        List<TimeOnly> possibleStartTimes = new List<TimeOnly>();
        for (int hour = 8; hour < 23; ++hour)
        {
            for (int minutes = 0; minutes < 60; minutes += 15)
            {
                allPossibleStartTimes.Add(new TimeOnly(hour, minutes));
            }
        }
        allPossibleStartTimes.Add(new TimeOnly(23, 0));

        allPossibleStartTimes.ForEach(possibleStartTime =>
        {
            DateTime possibleStart = viewingDate.ToDateTime(possibleStartTime);
            if (possibleStart <= dayCutoff)
            {
                if (viewings.Count <= 0) possibleStartTimes.Add(possibleStartTime);
                viewings.ForEach(viewing =>
                {
                    DateTime startCutoff = viewingDate.ToDateTime(viewing.StartTime)
                        .Subtract(movieDuration).Subtract(new TimeSpan(0, 30, 0));
                    DateTime endCutoff = viewingDate.ToDateTime(viewing.EndTime)
                        .Add(movieDuration).Add(new TimeSpan(0, 30, 0));
                    if (possibleStart <= startCutoff || possibleStart >= endCutoff)
                    {
                        possibleStartTimes.Add(possibleStartTime);
                    }
                });
            }
        });

        return possibleStartTimes;
    }

    [HttpPut]
    public async Task<ActionResult<Movie>> AddMovie(Movie movie)
    {
        Movie _movie = await _movieService.AddMovie(movie);
        if (_movie == null) return BadRequest();
        return Ok(_movie);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeleteMovieById(int id)
    {
        bool success = await _movieService.DeleteMovieById(id);
        if (!success) return NotFound();
        return Ok();
    }
}