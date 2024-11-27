using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeuronPlataforma.Server.Models;
namespace NeuronPlataforma.Server.Infrastructure.Configurations
{
    public class PreferenciasConfiguration : IEntityTypeConfiguration<Preferencias> 
    {
        public void Configure(EntityTypeBuilder<Preferencias> builder)
        {
            builder.HasOne(p => p.Aluno)
                .WithMany()
                .HasForeignKey(p => p.IdAluno);
        }
    }
}
