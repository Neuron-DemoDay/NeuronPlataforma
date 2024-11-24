using NeuronPlataforma.Server.Infrastructure;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NeuronPlataforma.Server.Models
{

    public enum Genero
    {
        Masculino = 1,
        Feminino = 2,
        Outro = 3,
        PrefiroNaoInformar = 4,
    }
    [Table("Alunos")]
    public class Alunos
    {
        public int Id { get; set; }

        [MaxLength(60)]

        public required string Nome { get; set; }

        [MaxLength(60)]
        public required String Escolaridade { get; set; }

        public required DateTime DataNascimento { get; set; }

        [Column(TypeName = "decimal(3,1)")]
        public required decimal Notas { get; set; }

        [Phone]

        public required string Telefone { get; set; }

        [EmailAddress]
        [MaxLength(60)]

        public required string Email { get; set; }

        public required DateTime DataCadastro { get; set; }


        public required bool IsAtivo { get; set; }

        [MaxLength(25)]

        public required string Senha { get; set; }



        public required Genero Genero { get; set; }


        public required int Pontuacao { get; set; }

        [MaxLength(256)]

        public string? HashRecuperacao { get; set; }

        public int? IdAvatar { get; set; }

        [ForeignKey("IdAvatar")]
        public Avatares? Avatar { get; set; }


        public Alunos() { }
    }
}


