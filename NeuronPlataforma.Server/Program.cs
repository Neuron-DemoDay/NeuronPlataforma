using Microsoft.EntityFrameworkCore;
using NeuronPlataforma.Server.Infrastructure;
using NeuronPlataforma.Server.Models;
using Microsoft.OpenApi.Models;
using NeuronPlataforma.Server.Infrastructure.Configurations.ConfigurationGemini;

//CONFIGURANDO CONEX�O COM O BANCO DE DADOS
var builder = WebApplication.CreateBuilder(args);

StartGemini.start();

builder.Services.AddDbContext<NeuronDb>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

//CONFIGURANDO O SWAGGER
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Db Neuron",
        Description = "API NEURON",
        Version = "v1"
    });
});

var app = builder.Build();

// Usar o middleware de autentica��o e autoriza��o
app.UseAuthentication();
app.UseAuthorization();
app.UseDefaultFiles();
app.UseStaticFiles();

// Adicionar o middleware do Swagger

// CONFIGURA A ROTA DO SWAGGER
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Neuron API v1");
    });
}

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapFallbackToFile("index.html");
});

app.UseHttpsRedirection();



app.MapControllers();


await app.RunAsync();