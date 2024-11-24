using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NeuronPlataforma.Server.Models
{
    [Table("Chat_box")]
    public class ChatBox
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(400)]
        public required string Pergunta { get; set; }

        [MaxLength(400)]
        public required string Resposta { get; set; }

        [Column(TypeName = "date")]
        public required DateTime DataInteracao { get; set; }

        public int IdAluno { get; set; }

        [ForeignKey("IdAluno")]
        public required Alunos Aluno { get; set; }

        ChatBox() { }
    }
}

