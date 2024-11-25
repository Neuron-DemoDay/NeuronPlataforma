using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NeuronPlataforma.Server.Models
{

    [Table("Progresso")]
    public class Progressos
    {
        [Key]
        [Column("id_progresso")]
        public int Id { get; set; }
        [Column("id_aula")]
        public int? IdAula { get; set; }
        [ForeignKey("IdAula")]
        public Aulas? Aula { get; set; }

        [Column("id_aluno")]
        public int? IdAluno { get; set; }
        [ForeignKey("IdAluno")]
        public Alunos? Aluno { get; set; }

        [Column("status_aula")]
        public required string StatusProgresso { get; set; }

        public Progressos() { }
    }
}

