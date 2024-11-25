using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeuronPlataforma.Server.Models;

namespace NeuronPlataforma.Server.Infrastructure.Configurations
{
    public class AulasConfiguration : IEntityTypeConfiguration<Aulas>
    {
        public void Configure(EntityTypeBuilder<Aulas> builder)
        {

            builder.Property(a => a.Nivel)
            .HasConversion<string>(); // Converte o enum para string

        }
    }
}
