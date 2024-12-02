using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NeuronPlataforma.Server.Infrastructure;
using NeuronPlataforma.Server.Models;

namespace NeuronPlataforma.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PreferenciasController : ControllerBase
    {
        private readonly NeuronDb _db;

        public PreferenciasController(NeuronDb db)
        {
            _db = db;
        }

        //GET: api/prefrencias

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var preferencias = await _db.AvataresSet.ToListAsync();

            return Ok();
        }

        //GET: api/preferencias/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var preferencias = await _db.PreferenciasSet.FindAsync(id);
            if (preferencias is null)
                return NotFound();
            return Ok(preferencias);
        }

        //POST: api/preferencias
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Preferencias preferencias)
        {
            await _db.PreferenciasSet.AddAsync(preferencias);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new {id = preferencias.Id}, preferencias);
        }

        //PUT: api/Preferencias/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Preferencias updatePreferencias)
        {
            var preferencias = await _db.PreferenciasSet.FindAsync(id);
            if (preferencias is null)
                return NotFound();
            preferencias.EstiloAprendizado = updatePreferencias.EstiloAprendizado;
            preferencias.PreferenciaMateria = updatePreferencias.PreferenciaMateria;
            preferencias.TopicosPreferidos = updatePreferencias.TopicosPreferidos;
            preferencias.FrequenciaNotificao = updatePreferencias.FrequenciaNotificao;
            preferencias.IsAtivo = updatePreferencias.IsAtivo;

            await _db.SaveChangesAsync();
            return Ok(preferencias);
        }

        //DELETE: api/Preferencias/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var preferencias = await _db.PreferenciasSet.FindAsync(id);
            if (preferencias is null)
                return NotFound();
            _db.PreferenciasSet.Remove(preferencias);

            return Ok(preferencias);

        }
    }
}
