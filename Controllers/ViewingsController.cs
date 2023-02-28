namespace kino.Controllers;

using Microsoft.AspNetCore.Mvc;
using kino.Services;
using kino.Entities;

[ApiController]
[Route("api/[controller]")]
public class ViewingsController : ControllerBase
{
    private readonly IViewingService _viewingService;

    public ViewingsController(IViewingService viewingService)
    {
        _viewingService = viewingService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Viewing>>> GetViewings()
    {
        IEnumerable<Viewing> viewings = await _viewingService.GetViewings();
        if (viewings == null) return NotFound();
        return Ok(viewings);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Viewing>> GetViewingById(int id)
    {
        Viewing _viewing = await _viewingService.GetViewingById(id);
        if (_viewing == null) return NotFound();
        return Ok(_viewing);
    }

    [HttpPut]
    public async Task<ActionResult<Viewing>> AddViewing(Viewing viewing)
    {
        Viewing _viewing = await _viewingService.AddViewing(viewing);
        if (_viewing == null) return BadRequest();
        return Ok(_viewing);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeleteViewingById(int id)
    {
        bool success = await _viewingService.DeleteViewingById(id);
        if (!success) return NotFound();
        return Ok();
    }
}