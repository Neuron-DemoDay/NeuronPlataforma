using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeuronPlataforma.Server.Models
{
    [Table("Preferencias")]
    public class Preferencias
    {
        [Key]
        public int Id { get; set; }


        public int IdAluno { get; set; }
        [ForeignKey("IdAluno")]
        public required Alunos Aluno { get; set; }

        [MaxLength(50)]
        public required string EstiloAprendizado { get; set; }

        [MaxLength(50)]
        public required string PreferenciaMateria { get; set; }

        [MaxLength(255)]
        public required string TopicosPreferidos { get; set; }

        [MaxLength(20)]
        [Required]
        public required string FrequenciaNotificao { get; set; }

        public required bool IsAtivo { get; set; }

        Preferencias() { }
    }
}

