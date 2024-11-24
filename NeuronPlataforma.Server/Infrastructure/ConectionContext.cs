using Microsoft.EntityFrameworkCore;
using NeuronPlataforma.Server.Models;

namespace NeuronPlataforma.Server.Infrastructure
{
    public class NeuronDb : DbContext
    {
        public NeuronDb(DbContextOptions<NeuronDb> options) : base(options)
        { }
        public required DbSet<Alunos> AlunosSet { get; set; }
        public required DbSet<Aulas> AulasSet { get; set; }
        public required DbSet<Avatares> AvataresSet { get; set; }
        public required DbSet<ChatBox> ChatBoxesSet { get; set; }
        public required DbSet<MissaoAluno> MissoesAlunoSet { get; set; }
        public required DbSet<Preferencias> PreferenciasSet { get; set; }
        public required DbSet<Progressos> ProgressosSet { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }
    }
}


  
 
