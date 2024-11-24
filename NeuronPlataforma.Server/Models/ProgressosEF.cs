using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NeuronPlataforma.Server.Models
{
    [Table("Progressos")]
    public class Progressos
    {
        [Key]
        public int Id { get; set; }
        public int IdAula { get; set; }
        public required Aulas Aula { get; set; }

        public int IdAluno { get; set; }
        [ForeignKey("IdAluno")]
        public required Alunos Aluno { get; set; }

        Progressos() { }
    }
}

