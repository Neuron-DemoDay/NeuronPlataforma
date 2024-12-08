using Microsoft.EntityFrameworkCore;
using NeuronPlataforma.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace NeuronPlataforma.Server.Infrastructure
{
    public class AuthDbContext : IdentityDbContext<IdentityUser>
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {

        }
        public virtual DbSet<Alunos> Alunos { get; set; }
    }
}
