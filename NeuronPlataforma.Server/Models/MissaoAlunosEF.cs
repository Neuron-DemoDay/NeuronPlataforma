using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NeuronPlataforma.Server.Models
{
    [Table("Missao_Aluno")]
    public class MissaoAluno
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(500)]
        public required string Descricao { get; set; }


        public int PontuacaoRecompensa { get; set; }

        [Column(TypeName = "date")]
        public required DateTime DataCriacao { get; set; }

        public int QuantidadeAcertos { get; set; }

        public int IdProgresso { get; set; }

        [ForeignKey("IdProgresso")]
        public required Progressos Progresso { get; set; }

        MissaoAluno() { }
    }
}

