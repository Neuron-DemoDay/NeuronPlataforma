using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NeuronPlataforma.Server.Infrastructure;
using NeuronPlataforma.Server.Models;

namespace NeuronPlataforma.Server.Controllers
{
    public class MissaoAlunosController : ControllerBase
    {
        private readonly NeuronDb _db;

        public MissaoAlunosController(NeuronDb db)
        {
            _db = db;
        }

        //GET: api/MissaoAlunos
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var missao = await _db.MissoesAlunoSet.ToListAsync();
            return Ok(missao);
        }

        //GET: api/MissaoAlunos/{id}
        [HttpGet]
        public async Task<IActionResult> GetById(int id)
        {
            var missao = await _db.MissoesAlunoSet.FindAsync(id);
            if (missao is null)
                return NotFound();
            return Ok(missao);
        }

        //POST: api/MissaoAlunos
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] MissaoAluno missao)
        {
            await _db.MissoesAlunoSet.AddAsync(missao);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = missao.Id }, missao);
        }

        //PUT: api/MissaoAlunos/{id}
        [HttpPut]
        public async Task<IActionResult> Update(int id, [FromBody] MissaoAluno updateMissao)
        {
            var missao = await _db.MissoesAlunoSet.FindAsync(id);
            if (missao is null)
                return NotFound();
            missao.Descricao = updateMissao.Descricao;
            missao.PontuacaoRecompensa = updateMissao.PontuacaoRecompensa;
            missao.QuantidadeAcertos = updateMissao.QuantidadeAcertos;

            _db.SaveChangesAsync();
            return Ok();
        }

        //DELETE: api/MissaoAlunos/{id}
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var missao = await _db.MissoesAlunoSet.FindAsync(id);
            if(missao is null)
                return NotFound();
            _db.MissoesAlunoSet.Remove(missao);
            await _db.SaveChangesAsync();

            return Ok(missao);
        }
    }
}
