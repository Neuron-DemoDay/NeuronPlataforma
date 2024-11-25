using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeuronPlataforma.Server.Models;

namespace NeuronPlataforma.Server.Infrastructure.Configurations
{
    public class ChatBoxConfiguration : IEntityTypeConfiguration<ChatBox>
    {
        public void Configure(EntityTypeBuilder<ChatBox> builder)
        {
            builder.HasOne(c => c.Aluno)
                .WithMany()
                .HasForeignKey(c => c.IdAluno);
        }
    }
}
