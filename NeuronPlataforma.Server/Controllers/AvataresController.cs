using Microsoft.AspNetCore.Mvc;
using NeuronPlataforma.Server.Models;
using NeuronPlataforma.Server.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace NeuronPlataforma.Server.Controllers
{
    [ApiController]
    [Route("ap/[controller]")]
    public class AvataresController : ControllerBase
    {
        private readonly NeuronDb _db;

        public AvataresController(NeuronDb db)
        {
            _db = db;
        }

        //GET: api/Avatares
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var avatares = await _db.AvataresSet.ToListAsync();
            return Ok(avatares);
        }

        //GET: api/Avatares/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var avatares = await _db.AvataresSet.FindAsync(id);
            if (avatares is null)
                return NotFound();
            return Ok(avatares);
        }

        //POST: api/Avatares
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Avatares avatares)
        {
            await _db.AvataresSet.AddAsync(avatares);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = avatares.Id }, avatares);
        }

        //PUT: api/Avatares/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Avatares updateAvatares)
        {
            var avatares = await _db.AvataresSet.FindAsync(id);
            if (avatares is null)
                return NotFound();
            avatares.Imagem = updateAvatares.Imagem;
            avatares.Nome = updateAvatares.Nome;

            await _db.SaveChangesAsync();
            return Ok(avatares);
        }

        //DELETE: api/Avatares/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var avatares = await _db.AvataresSet.FindAsync(id);
            if (avatares is null)
                return NotFound();

            _db.AvataresSet.Remove(avatares);
            await _db.SaveChangesAsync();

            return Ok(avatares);
        }

    }
}
