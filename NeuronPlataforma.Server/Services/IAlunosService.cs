using NeuronPlataforma.Server.Models;
namespace NeuronPlataforma.Server.Services
{
    public interface IAlunosService
    {
        Task<IEnumerable<Alunos>> GetAlunos();
        Task<Alunos> GetAluno(int id);
        Task<IEnumerable<Alunos>> GetAlunosByNome(string nome);

        Task CreateAluno(Alunos aluno);

        Task UpdateAlunos(Alunos aluno);

        Task DeleteAlunos(Alunos aluno);
    }
}
