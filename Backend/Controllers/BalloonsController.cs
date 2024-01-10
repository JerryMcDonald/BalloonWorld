using LibraryApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class BalloonsController : ControllerBase
{
    private readonly LibraryContext _context;

    public BalloonsController(LibraryContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Balloon>>> GetBalloons()
    {
        var Balloons = await _context.Balloons.ToListAsync();
        return Ok(Balloons);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Balloon>> GetBalloon(int id)
    {
        var Balloon = await _context.Balloons.FindAsync(id);

        if (Balloon == null)
        {
            return NotFound();
        }

        return Ok(Balloon);
    }

    [HttpPost]
    public async Task<ActionResult<Balloon>> PostBalloon(Balloon Balloon)
    {
        _context.Balloons.Add(Balloon);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetBalloon", new { id = Balloon.Id }, Balloon);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutBalloon(int id, Balloon Balloon)
    {
        if (id != Balloon.Id)
        {
            return BadRequest();
        }

        _context.Entry(Balloon).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {

            throw;

        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBalloon(int id)
    {
        var Balloon = await _context.Balloons.FindAsync(id);
        if (Balloon == null)
        {
            return NotFound();
        }

        _context.Balloons.Remove(Balloon);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}