using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeuronPlataforma.Server.Models
{
    [Table("Preferencias")]
    public class Preferencias
    {
        [Key]
        [Column("id_preferencia")]
        public int Id { get; set; }

        [Column("id_aluno")]
        public int IdAluno { get; set; }
        [ForeignKey("IdAluno")]
        public Alunos? Aluno { get; set; }

        [MaxLength(50)]
        [Column("estilo_aprendizado")]
        public required string EstiloAprendizado { get; set; }

        [MaxLength(50)]
        [Column("preferencia_materia")]
        public required string PreferenciaMateria { get; set; }

        [MaxLength(255)]
        [Column("topicos_preferidos")]
        public required string TopicosPreferidos { get; set; }

        [MaxLength(20)]
        [Required]
        [Column("frequencia_notificacao")]
        public required string FrequenciaNotificao { get; set; }

        [Column("status_aluno")]
        public required bool IsAtivo { get; set; }

        public Preferencias() { }
    }
}

