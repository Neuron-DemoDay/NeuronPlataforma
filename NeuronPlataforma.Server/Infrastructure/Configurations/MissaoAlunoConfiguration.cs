using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeuronPlataforma.Server.Models;

namespace NeuronPlataforma.Server.Infrastructure.Configurations
{
    public class MissaoAlunoConfiguration : IEntityTypeConfiguration<MissaoAluno>
    {
        public void Configure(EntityTypeBuilder<MissaoAluno> builder)
        {
            builder.HasOne(c => c.Progresso)
                    .WithMany()
                    .HasForeignKey(c => c.IdProgresso);
        }
    }
}
