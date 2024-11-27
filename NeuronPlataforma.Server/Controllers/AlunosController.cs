using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NeuronPlataforma.Server.Infrastructure;
using NeuronPlataforma.Server.Models;

namespace NeuronPlataforma.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlunosController : ControllerBase
    {
        private readonly NeuronDb _db;

        public AlunosController(NeuronDb db)
        {
            _db = db;
        }
        // GET: api/Alunos
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var alunos = await _db.AlunosSet.ToListAsync();
            return Ok(alunos);
        }
        // GET: api/Alunos/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var aluno = await _db.AlunosSet.FindAsync(id);
            if (aluno == null)
                return NotFound();
            return Ok(aluno);
        }
        // POST: api/Alunos
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Alunos alunos)
        {
            await _db.AlunosSet.AddAsync(alunos);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = alunos.Id }, alunos);
        }
        // PUT: api/Aulas/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Alunos updateAlunos)
        {
            var alunos = await _db.AlunosSet.FindAsync(id);
            if (alunos == null)
                return NotFound();
            alunos.Id = updateAlunos.Id;
            alunos.Nome = updateAlunos.Nome;
            alunos.DataNascimento = updateAlunos.DataNascimento;
            alunos.Notas = updateAlunos.Notas;
            alunos.Telefone = updateAlunos.Telefone;
            alunos.Email = updateAlunos.Email;
            alunos.Pontuacao = updateAlunos.Pontuacao;

            await _db.SaveChangesAsync();
            return Ok(alunos);
        }

        //DELTE: api/Aulas{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var alunos = await _db.AlunosSet.FindAsync(id);
            if (alunos is null)
                return NotFound();
            _db.AlunosSet.Remove(alunos);
            await _db.SaveChangesAsync();

            return Ok(alunos);
        }

    }
}

