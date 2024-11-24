using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeuronPlataforma.Server.Models
{
    [Table("Avatares")]
    public class Avatares
    {
        [Column("id_avatar")]
        [Key]
        public int Id { get; set; }

        [MaxLength(300)]
        public required string Imagem { get; set; }

        [MaxLength(50)]
        public required string Nome { get; set; }

        public Avatares() { }
    }
}
