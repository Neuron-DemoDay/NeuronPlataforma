using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeuronPlataforma.Server.Models;

namespace NeuronPlataforma.Server.Infrastructure.Configurations
{
    public class AlunoConfiguration : IEntityTypeConfiguration<Alunos>
    {
        public void Configure(EntityTypeBuilder<Alunos> builder)
        {
            builder.HasIndex(a => a.Email).IsUnique();
            builder.HasIndex(a => a.Telefone).IsUnique();
            builder.Property(a => a.Genero).HasConversion<int>();


            //GERENCIANDO FOREIGN KEYS


            builder.HasOne(a => a.Avatar)
            .WithMany()
            .HasForeignKey(a => a.IdAvatar);

            builder.Property(a => a.Genero).HasConversion<int>();

        }
    }
}
