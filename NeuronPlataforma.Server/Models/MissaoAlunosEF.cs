using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NeuronPlataforma.Server.Models
{
    [Table("Missao_aluno")]
    public class MissaoAluno
    {
        [Key]
        [Column("Id_missao")]
        public int Id { get; set; }

        [MaxLength(500)]
        public required string Descricao { get; set; }

        [Column("Pontuacao_Recompensa")]
        public int PontuacaoRecompensa { get; set; }

        [Column(TypeName = "date")]
        public required DateTime DataCriacao { get; set; }

        [Column("quantidade_acertos")]
        public int QuantidadeAcertos { get; set; }

        [Column("id_progresso")]
        public int? IdProgresso { get; set; }

        [ForeignKey("IdProgresso")]
        public Progressos? Progresso { get; set; }

        public MissaoAluno() { }
    }
}

