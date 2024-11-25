using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeuronPlataforma.Server.Models;
namespace NeuronPlataforma.Server.Infrastructure.Configurations
{
    public class ProgressosConfiguration : IEntityTypeConfiguration<Progressos>
    {
        public void Configure(EntityTypeBuilder<Progressos> builder)
        {
            builder.HasOne(p => p.Aluno)
                .WithMany()
                .HasForeignKey(p => p.IdAluno);

            builder.HasOne(m => m.Aula)
                .WithMany()
                .HasForeignKey(m => m.IdAula);
        }
    }
}

