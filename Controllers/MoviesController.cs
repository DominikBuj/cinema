namespace kino.Controllers;

using Microsoft.AspNetCore.Mvc;
using kino.Services;
using kino.Entities;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private readonly IMovieService _movieService;

    public MoviesController(IMovieService movieService)
    {
        _movieService = movieService;
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
        Movie _movie = await _movieService.GetMovieById(id);
        if (_movie == null) return NotFound();
        return Ok(_movie);
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