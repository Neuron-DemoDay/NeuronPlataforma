using Microsoft.AspNetCore.Mvc;
using NeuronPlataforma.Server.Models;
using NeuronPlataforma.Server.Services;

namespace NeuronPlataforma.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlunosController : ControllerBase
    {
        private readonly IAlunosService _alunosService;

        public AlunosController(IAlunosService alunosService)
        {
            _alunosService = alunosService;
        }
        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<Alunos>>> GetAlunos()
        {
            try
            {
                var alunos = await _alunosService.GetAlunos();
                return Ok(alunos);
            }
            catch
            {
                //Return BadRequest ("Requisição inválida);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Erro ao obter os launos");
            }
        }
        // GET: api/Alunos/nome
        [HttpGet("AlunosPorNome")]
        public async Task<ActionResult<IEnumerable<Alunos>>>
            GetAlunos([FromQuery] string nome)
        {
            try
            {
                // Chamando o método GetAlunosByName para filtrar pelo nome, se fornecido
                var alunos = await _alunosService.GetAlunosByNome(nome);

                if (alunos is null)
                    return NotFound($"Não existe um aluno chamado {nome}");

                return Ok(alunos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao obter a lista de alunos", error = ex.Message });
            }
        }

        // GET: api/Alunos/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                // Buscando um aluno pelo ID
                var aluno = await _alunosService.GetAluno(id);
                if (aluno is null)

                    return NotFound($"Não existe um aluno Com Id {id}");

                return Ok(aluno);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = $"Aluno com Id {id} não encontrado." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar o aluno", error = ex.Message });
            }
        }

        // POST: api/Alunos
        [HttpPost]
        public async Task<ActionResult> Create(Alunos aluno)
        {

            try
            {
                await _alunosService.CreateAluno(aluno);
                return CreatedAtRoute(nameof(GetAlunos), new { id = aluno.Id }, aluno);
            }
            catch
            {
                return BadRequest("Requisição inválidas");
            }

        }


        // PUT: api/Alunos/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Alunos updateAlunos)
        {
            try
            {
                // Verificando se o aluno a ser atualizado não é nulo
                if (updateAlunos == null)
                {
                    return BadRequest(new { message = "O aluno não pode ser nulo." });
                }

                updateAlunos.Id = id;  // Garantir que o ID seja o correto

                // Atualizando o aluno no banco de dados
                await _alunosService.UpdateAlunos(updateAlunos);
                return Ok(updateAlunos);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = $"Aluno com Id {id} não encontrado." });
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao atualizar o aluno", error = ex.Message });
            }
        }

        // DELETE: api/Alunos/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                // Buscando o aluno pelo ID
                var aluno = await _alunosService.GetAluno(id);
                // Removendo o aluno do banco de dados
                await _alunosService.DeleteAlunos(aluno);
                return Ok(new { message = $"Aluno com Id {id} foi removido com sucesso." });
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = $"Aluno com Id {id} não encontrado." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao remover o aluno", error = ex.Message });
            }
        }
    }
}
