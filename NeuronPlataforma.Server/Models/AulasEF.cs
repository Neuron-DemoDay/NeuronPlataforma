using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NeuronPlataforma.Server.Models
{
    public enum Nivel
    {
        Basico,
        Intermediario,
        Avancado,

    }
    [Table("Aulas")]
    public class Aulas
    {
        [Key]
        [Column("id_aula")]
        public int Id { get; set; }

        [MaxLength(50)]
        [Column("titulo_aula")]
        public required string TituloAula { get; set; }

        [Column("data_criacao")]
        public required DateTime DataCriacao { get; set; }

        public required Nivel Nivel { get; set; }

        [Column("carga_horaria")]
        public required int CargaHoraria { get; set; }

        [MaxLength(50)]
        public required string Materia { get; set; }

        [Column("data_termino")]
        public required DateTime DataTermino { get; set; }

        [MaxLength(260)]
        public required string Conteudo { get; set; }

        [MaxLength(260)]

        public required string Descricao { get; set; }

        [MaxLength(260)]
        public required string Anotacoes { get; set; }

        public Aulas() { }
    }
}
