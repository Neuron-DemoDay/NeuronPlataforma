using NeuronPlataforma.Server.Models;
using NeuronPlataforma.Server.Infrastructure;
using NeuronPlataforma.Server.Services;
using Microsoft.EntityFrameworkCore;

namespace NeuronPlataforma.Server.Services
{
    public class AlunosService : IAlunosService
    {
        private readonly NeuronDb _context;

        public AlunosService(NeuronDb context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Alunos>> GetAlunos()
        {
            try
            {
                return await _context.AlunosSet.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao encontrar a lista de alunos", ex);
            }
        }

        public async Task<Alunos> GetAluno(int id)
        {
            try
            {
                var aluno = await _context.AlunosSet.FindAsync(id);
                if (aluno == null)
                    throw new KeyNotFoundException($"Aluno com Id {id} não encontrado.");

                return aluno;
            }
            catch (KeyNotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Erro ao buscar o aluno no banco de dados.", ex);
            }
        }

        public async Task<IEnumerable<Alunos>> GetAlunosByNome(string nome)
        {
            IEnumerable<Alunos> alunos;
            if (!string.IsNullOrEmpty(nome))
            {
                alunos = await _context.AlunosSet.Where(n => n.Nome.Contains(nome)).ToListAsync();
            }
            else
            {
                alunos = await GetAlunos();
            }
            return alunos;
        }
        public async Task CreateAluno(Alunos aluno)
        {
            if (aluno == null)
                throw new ArgumentNullException(nameof(aluno), "O objeto aluno não pode ser nulo.");

            try
            {
                await _context.AlunosSet.AddAsync(aluno);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new ApplicationException("Erro ao salvar o aluno no banco de dados. Verifique os dados e tente novamente.", ex);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Ocorreu um erro inesperado ao criar o aluno.", ex);
            }
        }


        public async Task UpdateAlunos(Alunos aluno)
        {
            if (aluno == null)
                throw new ArgumentNullException(nameof(aluno), "O objeto aluno não pode ser nulo.");

            try
            {
                var exists = await _context.AlunosSet.AnyAsync(a => a.Id == aluno.Id);
                if (!exists)
                    throw new KeyNotFoundException($"Aluno com Id {aluno.Id} não encontrado para atualização.");

                _context.Entry(aluno).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (KeyNotFoundException)
            {
                throw;
            }
            catch (DbUpdateException ex)
            {
                throw new ApplicationException("Erro ao atualizar o aluno no banco de dados. Verifique os dados e tente novamente.", ex);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Ocorreu um erro inesperado ao atualizar o aluno.", ex);
            }
        }


        public async Task DeleteAlunos(Alunos aluno)
        {
            if (aluno == null)
                throw new ArgumentNullException(nameof(aluno), "O objeto aluno não pode ser nulo.");

            try
            {
                var exists = await _context.AlunosSet.AnyAsync(a => a.Id == aluno.Id); // Verifica se o aluno existe
                if (!exists)
                    throw new KeyNotFoundException($"Aluno com Id {aluno.Id} não encontrado para exclusão.");

                _context.AlunosSet.Remove(aluno);
                await _context.SaveChangesAsync();
            }
            catch (KeyNotFoundException)
            {
                throw; // Repassa a exceção para ser tratada em outro nível
            }
            catch (DbUpdateException ex)
            {
                throw new ApplicationException("Erro ao remover o aluno no banco de dados. Verifique se o aluno possui dependências.", ex);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Ocorreu um erro inesperado ao remover o aluno.", ex);
            }
        }
    }
}


