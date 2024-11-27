using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NeuronPlataforma.Server.Infrastructure;
using NeuronPlataforma.Server.Models;

namespace NeuronPlataforma.Server.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class AulasController : ControllerBase
    {
        private readonly NeuronDb _db;

        public AulasController(NeuronDb db)
        {
            _db = db;
        }

        // GET: api/Aulas
        [HttpGet]
        public async Task<IActionResult> GetALL()
        {
            var aulas = await _db.AulasSet.ToListAsync();
            return Ok(aulas);
        }
        // GET: api/Aulas/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var aulas = await _db.AulasSet.FindAsync(id);
            if (aulas is null)
                return NotFound();
            return Ok(aulas);
        }

        // POST: api/Aulas
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Aulas aulas)
        {
            await _db.AulasSet.AddAsync(aulas);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = aulas.Id }, aulas);
        }

        // PUT: api/Aulas/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Aulas updateAulas)
        {
            var aulas = await _db.AulasSet.FindAsync(id);
            if (aulas is null)
                return NotFound();
            aulas.TituloAula = updateAulas.TituloAula;
            aulas.Nivel = updateAulas.Nivel;
            aulas.CargaHoraria = updateAulas.CargaHoraria;
            aulas.Materia = updateAulas.Materia;
            aulas.Conteudo = updateAulas.Conteudo;
            aulas.Descricao = updateAulas.Descricao;

            await _db.SaveChangesAsync();
            return Ok(aulas);
        }

        //DELTE: api/Aulas{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var aulas = await _db.AulasSet.FindAsync(id);
            if (aulas is null)
                return NotFound();
            _db.AulasSet.Remove(aulas);
            await _db.SaveChangesAsync();

            return Ok(aulas);
        }
    }
}

