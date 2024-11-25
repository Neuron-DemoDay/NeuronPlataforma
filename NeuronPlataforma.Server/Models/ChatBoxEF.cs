using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NeuronPlataforma.Server.Models
{
    [Table("Chat_box")]
    public class ChatBox
    {
        [Key]
        [Column("id_log")]
        public int Id { get; set; }

        [MaxLength(400)]
        public required string Pergunta { get; set; }

        [MaxLength(400)]
        public required string Resposta { get; set; }

        [Column("Data_interacao")]
        public required DateTime DataInteracao { get; set; }

        [Column("id_aluno")]
        public int? IdAluno { get; set; }

        [ForeignKey("IdAluno")]
        public Alunos? Aluno { get; set; }

        public ChatBox() { }
    }
}

