using Microsoft.EntityFrameworkCore;
using NeuronPlataforma.Server.Infrastructure;
using NeuronPlataforma.Server.Models;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.Google;

//CONFIGURANDO CONEX�O COM O BANCO DE DADOS
var builder = WebApplication.CreateBuilder(args);

// Configurar serviços
builder.Services.AddDbContext<NeuronDb>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

// Configurando o Swagger
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

// Configurando autenticação com Google
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = GoogleDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
})
.AddGoogle(options =>
{
    options.ClientId = builder.Configuration["Google:ClientId"];
    options.ClientSecret = builder.Configuration["Google:ClientSecret"];
});

var app = builder.Build();

// Usar o middleware de autenticação e autorização
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

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// ROTAS PARA ALUNOS

//MAPGET
app.MapGet("/Alunos", async (NeuronDb db) => await db.AlunosSet.ToListAsync())
    .WithTags("Alunos");

//MAPPOST
app.MapPost("/AddAlunos", async (NeuronDb db, Alunos alunos) =>
{
    await db.AlunosSet.AddAsync(alunos);
    await db.SaveChangesAsync();
    return Results.Created($"/Alunos/{alunos.Id}", alunos);
}).WithTags("Alunos");

//MapPut
app.MapPut("/UpdateAlunos/{id}", async (NeuronDb db, Alunos updateAlunos, int id) =>

{
    var alunos = await db.AlunosSet.FindAsync(id);
    if (alunos is null)
        return Results.NotFound();
    alunos.Nome = updateAlunos.Nome;
    alunos.DataNascimento = updateAlunos.DataNascimento;
    alunos.Notas = updateAlunos.Notas;
    alunos.Telefone = updateAlunos.Telefone;
    alunos.Email = updateAlunos.Email;
    alunos.Pontuacao = updateAlunos.Pontuacao;

    await db.SaveChangesAsync();
    return Results.Ok(alunos);
})
    .WithTags("Alunos");
//MAPGET BY ID
app.MapGet("/Alunos/{Id}", async (NeuronDb db, int id) =>
{
    var aluno = await db.AlunosSet.FindAsync(id);
    if (aluno is null)
    {
        return Results.NotFound();
    }
    return Results.Ok(aluno);
}).WithTags("Alunos");

//MAPDELETE
app.MapDelete("/DeleteAlunos{id}", async (NeuronDb db, int id) =>
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
).WithTags("Alunos");


//ROTAS PARA AULAS

//MapGet
app.MapGet("/Aulas", async (NeuronDb db) => await db.AulasSet.ToListAsync())
    .WithTags("Aulas");

//MapGet By Id
app.MapGet("/Aulas/{id}", async (NeuronDb db, int id) =>
{
    var aula = await db.AulasSet.FindAsync(id);
    if (aula is null)
    {
        return Results.NotFound();
    }
    return Results.Ok(aula);
})
    .WithTags("Aulas");

//MapPost
app.MapPost("/AddAulas", async (NeuronDb db, Aulas aulas) =>
{
    await db.AulasSet.AddAsync(aulas);
    await db.SaveChangesAsync();
    return Results.Created($"/Aulas/{aulas.Id}", aulas);
}).WithTags("Aulas");

//MapPut
app.MapPut("/UpdateAulas/{id}", async (NeuronDb db, Aulas updateAulas, int id) =>

{
    var aulas = await db.AulasSet.FindAsync(id);
    if (aulas is null)
        return Results.NotFound();
    aulas.TituloAula = updateAulas.TituloAula;
    aulas.Nivel = updateAulas.Nivel;
    aulas.CargaHoraria = updateAulas.CargaHoraria;
    aulas.Materia = updateAulas.Materia;
    aulas.Conteudo = updateAulas.Conteudo;
    aulas.Descricao = updateAulas.Descricao;

    await db.SaveChangesAsync();
    return Results.Ok(aulas);
})
    .WithTags("Aulas");


await app.RunAsync();