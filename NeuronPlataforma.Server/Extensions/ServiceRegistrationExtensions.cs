using NeuronPlataforma.Server.Services;
namespace NeuronPlataforma.Server.Extensions
{
    public static class ServiceRegistrationExtensions
    {
        public static void AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IAlunosService, AlunosService>();
        }
    }
}
