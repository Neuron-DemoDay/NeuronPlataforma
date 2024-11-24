using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NeuronPlataforma.Server.Models
{
    [Table("Aulas")]
        public class Aulas
        {
        [Key]
        public int Id { get; set; }

            [MaxLength(50)]
            public required string TituloAula { get; set; }

            [Column(TypeName = "date")]
            public required DateTime DataCriacao { get; set; }

            public required int Nivel { get; set; }

            public required int CargaHoraria { get; set; }

            [MaxLength(50)]
            public required string Materia { get; set; }

            [Column(TypeName = "date")]
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
