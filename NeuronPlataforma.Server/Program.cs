using Microsoft.EntityFrameworkCore;
using NeuronPlataforma.Server.Infrastructure;
using NeuronPlataforma.Server.Models;
using Microsoft.OpenApi.Models;

//CONFIGURANDO CONEXÃO COM O BANCO DE DADOS
var builder = WebApplication.CreateBuilder(args);

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
app.MapControllers();
app.UseHttpsRedirection();

app.MapGet("/Alunos", async (NeuronDb db) => await db.AlunosSet.ToListAsync());

app.MapPost("/Alunos", async (NeuronDb db, Alunos alunos) =>
{
    await db.AlunosSet.AddAsync(alunos); // ERRO
    await db.SaveChangesAsync();
    return Results.Created($"/Alunos/{alunos.Id}", alunos);
});

app.MapGet("/Alunos/{Id}", async (NeuronDb db, int id) =>
{
    var aluno = await db.AlunosSet.FindAsync(id);
    if (aluno is null)
    {
        return Results.NotFound();
    }
    return Results.Ok(aluno);
});

app.MapDelete("/Alunos{id}", async (NeuronDb db, int id) =>
{
    var aluno = await db.AlunosSet.FindAsync(id);
    if (aluno is null)
    {
        return Results.NotFound();
    }
    db.AlunosSet.Remove(aluno);
    await db.SaveChangesAsync();

    return Results.Ok();
}
);

await app.RunAsync();
