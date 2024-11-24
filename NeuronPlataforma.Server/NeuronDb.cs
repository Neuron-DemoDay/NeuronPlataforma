//using Microsoft.EntityFrameworkCore;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;
//using static NeuronPlataforma.Server.Neuron;

//namespace NeuronPlataforma.Server
//{
//    //CRIANDO CLASSES DE ENTIDADES
//    public class Neuron
//    {
//        //DEFININDO GENERO COMO ENUM E PASSANDO OS ENUMS PARA NÚMEROS
//        public enum Genero
//        {
//            Masculino = 1,
//            Feminino = 2,
//            Outro = 3,
//            PrefiroNaoInformar = 4,
//        }
//        public class Alunos
//        {
//            public int Id { get; set; }

//            [MaxLength(60)]
//            public required string Nome { get; set; }

//            [Column(TypeName = "date")]
//            public required DateTime DataNascimento { get; set; }

//            [Column(TypeName = "decimal(3,1)")]
//            public decimal? Notas { get; set; }

//            [Phone]
//            public required string Telefone { get; set; }

//            [EmailAddress]
//            [MaxLength(60)]
//            public required string Email { get; set; }

//            [Column(TypeName = "date")]
//            public required DateTime DataCadastro { get; set; }

//            public required bool IsAtivo { get; set; }

//            [MaxLength(25)]
//            public required string Senha { get; set; }

//            public required Genero Genero { get; set; }

//            public required int Pontuacao { get; set; }

//            [MaxLength(256)]
//            public required string HashRecuperacao { get; set; }

//            public int IdAvatar { get; set; }

//            public required Avatares Avatar { get; set; }


//        }

//        public class Aulas
//        {
//            public int Id { get; set; }

//            [MaxLength(50)]
//            public required string TituloAula { get; set; }

//            [Column(TypeName = "date")]
//            public required DateTime DataCriacao { get; set; }

//            public required int Nivel { get; set; }

//            public required int CargaHoraria { get; set; }

//            [MaxLength(50)]
//            public required string Materia { get; set; }

//            [Column(TypeName = "date")]
//            public required DateTime DataTermino { get; set; }

//            [MaxLength(260)]
//            public required string Conteudo { get; set; }

//            [MaxLength(260)]

//            public required string Descricao { get; set; }

//            [MaxLength(260)]
//            public required string Anotacoes { get; set; }
//        }

//        public class Avatares
//        {
//            public int Id { get; set; }

//            [MaxLength(300)]
//            public required string Imagem { get; set; }

//            [MaxLength(50)]
//            public required string Nome { get; set; }

//        }

//        public class ChatBox
//        {
//            public int Id { get; set; }

//            [MaxLength(400)]
//            public required string Pergunta { get; set; }

//            [MaxLength(400)]
//            public required string Resposta { get; set; }

//            [Column(TypeName = "date")]
//            public required DateTime DataInteracao { get; set; }

//            public int IdAluno { get; set; }

//            public required Alunos Aluno { get; set; }
//        }

//        public class MissaoAluno
//        {
//            public int Id { get; set; }

//            [MaxLength(500)]
//            public required string Descricao { get; set; }


//            public int PontuacaoRecompensa { get; set; }

//            [Column(TypeName = "date")]
//            public required DateTime DataCriacao { get; set; }

//            public int QuantidadeAcertos { get; set; }

//            public int IdProgresso { get; set; }

//            public Progressos Progresso { get; set; }
//        }

//        public class Preferencias
//        {
//            public int Id { get; set; }


//            public int IdAluno { get; set; }
//            public required Alunos Aluno { get; set; }

//            [MaxLength(50)]
//            public required string EstiloAprendizado { get; set; }

//            [MaxLength(50)]
//            public required string PreferenciaMateria { get; set; }

//            [MaxLength(255)]
//            public required string TopicosPreferidos { get; set; }

//            [MaxLength(20)]
//            [Required]
//            public required string FrequenciaNotificao { get; set; }

//            public required bool IsAtivo { get; set; }
//        }

//        public class Progressos
//        {
//            public int Id { get; set; }
//            public int IdAula { get; set; }
//            public required Aulas Aula { get; set; }

//            public int IdAluno { get; set; }
//            public required Alunos Aluno { get; set; }
//        }
//    }

//    //CRIANDO AS VARIÁVEIS QUE ARMAZENARÃO OS DADOS DO BANCO
//    public class NeuronDb(DbContextOptions options) : DbContext(options)
//    {
//        public required DbSet<Alunos> Alunos { get; set; }
//        public required DbSet<Aulas> Aulas { get; set; }
//        public required DbSet<Avatares> Avatares { get; set; }
//        public required DbSet<ChatBox> ChatBoxes { get; set; }
//        public required DbSet<MissaoAluno> MissoesAluno { get; set; }
//        public required DbSet<Preferencias> Preferencias { get; set; }
//        public required DbSet<Progressos> Progressos { get; set; }


//        protected override void OnModelCreating(ModelBuilder modelBuilder)
//        {
//            base.OnModelCreating(modelBuilder);
//            //DEFININDO EMAIL E TELEFONE COMO ÚNICOS
//            modelBuilder.Entity<Alunos>()
//                .HasIndex(a => a.Email)
//                .IsUnique();

//            modelBuilder.Entity<Alunos>()
//            .HasIndex(a => a.Telefone)
//            .IsUnique();


//            //GERENCIANDO FOREIGN KEYS

//            modelBuilder.Entity<Alunos>()
//                .HasOne(a => a.Avatar)
//                .WithMany()
//                .HasForeignKey(a => a.IdAvatar);



//            modelBuilder.Entity<ChatBox>()
//                .HasOne(c => c.Aluno)
//                .WithMany()
//                .HasForeignKey(c => c.IdAluno);


//            modelBuilder.Entity<MissaoAluno>()
//                .HasOne(m => m.Progresso)
//                .WithMany()
//                .HasForeignKey(m => m.IdProgresso);

//            modelBuilder.Entity<Preferencias>()
//                .HasOne(p => p.Aluno)
//                .WithMany()
//                .HasForeignKey(p => p.IdAluno);

//            modelBuilder.Entity<Progressos>()
//                .HasOne(p => p.Aula)
//                .WithMany()
//                .HasForeignKey(p => p.IdAula)
//                .OnDelete(DeleteBehavior.Cascade);

//            modelBuilder.Entity<Progressos>()
//                .HasOne(p => p.Aluno)
//                .WithMany()
//                .HasForeignKey(p => p.IdAluno)
//                .OnDelete(DeleteBehavior.Cascade);

//            modelBuilder.Entity<Alunos>()
//                .Property(a => a.Genero)
//                .HasConversion<int>();

//        }
//    }
//}