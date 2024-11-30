using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NeuronPlataforma.Server.Infrastructure;
using NeuronPlataforma.Server.Models;

namespace NeuronPlataforma.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProgressoController : ControllerBase
    {
        private readonly NeuronDb _db;

        public ProgressoController(NeuronDb db)
        {
            _db = db;
        }

        //GET: api/Progresso
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var progresso = await _db.ProgressosSet.ToListAsync();
            return Ok(progresso);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var progresso = await _db.ProgressosSet.FindAsync(id);
            if (progresso is null)
                return NotFound();
            return Ok(progresso);
        }

        //GET: api/Progresso/{id}
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Progressos progresso)
        {
            await _db.AddAsync(progresso);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = progresso.Id }, progresso);
        }

        //PUT: api/Progresso/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Progressos updateProgresso)
        {
            var progresso = await _db.ProgressosSet.FindAsync(id);
            if (progresso is null)
                return NotFound();
            progresso.StatusProgresso = updateProgresso.StatusProgresso;

            await _db.SaveChangesAsync();
            return Ok(progresso);
        }

        //DELETE: api/Progresso/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var progresso = await _db.ProgressosSet.FindAsync(id);
            if(progresso is null)
                return NotFound();

            _db.ProgressosSet.Remove(progresso);
            return Ok(progresso);
        }
    }
}
