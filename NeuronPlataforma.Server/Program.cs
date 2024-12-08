using Microsoft.EntityFrameworkCore;
using NeuronPlataforma.Server.Infrastructure;
using NeuronPlataforma.Server.Models;
using Microsoft.OpenApi.Models;
using NeuronPlataforma.Server.Infrastructure.Configurations.ConfigurationGemini;
using NeuronPlataforma.Server.Extensions;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using NeuronPlataforma.Server.Services;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;

// CONFIGURANDO CONEXÃO COM O BANCO DE DADOS
var builder = WebApplication.CreateBuilder(args);

// DEFININDO O CORS
builder.Services.AddCors(options =>
    options.AddPolicy("MinhaPoliticaCORS", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    })
);

// ADICIONANDO O IDENTITY E O DbContext
builder.Services.AddDbContext<AuthDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))); // Conexão para AuthDbContext

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AuthDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = false,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])
                )
        };
    });

// ADICIONANDO OS MÉTODOS DE AUTENTICAÇÃO
builder.Services.AddScoped<IAuthenticate, AuthenticateService>();
builder.Services.AddScoped<AlunosService>();

// ADICIONANDO OS SERVICES
builder.Services.AddApplicationServices();

StartGemini.start();

builder.Services.AddDbContext<NeuronDb>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

// CONFIGURANDO O SWAGGER
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

// Usar o middleware de autenticação e autorização
app.UseAuthentication();
app.UseDefaultFiles();
app.UseStaticFiles();

// Adicionar o middleware do Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Neuron API v1");
    });
}

app.UseAuthentication();
app.UseAuthorization();
app.UseRouting();

app.MapControllers();
app.MapFallbackToFile("index.html");

app.UseHttpsRedirection();

await app.RunAsync();
