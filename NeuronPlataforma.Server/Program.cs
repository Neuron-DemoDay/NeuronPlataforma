using Microsoft.EntityFrameworkCore;
using NeuronPlataforma.Server.Infrastructure;
using NeuronPlataforma.Server.Models;
using Microsoft.OpenApi.Models;

//CONFIGURANDO CONEX�O COM O BANCO DE DADOS
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
app.MapControllers();
app.UseHttpsRedirection();



app.MapControllers();

//ROTAS PARA CHATBOX

//MapGet
app.MapGet("/ChatBox", async (NeuronDb db) => await db.ChatBoxesSet.ToListAsync())
    .WithTags("ChatBox");

//MapGet By Id
app.MapGet("/ChatBox/{id}", async (NeuronDb db, int id) =>
{
    var chatBox = await db.ChatBoxesSet.FindAsync(id);
    if (chatBox is null)
    {
        return Results.NotFound();
    }
    return Results.Ok(chatBox);
})
    .WithTags("ChatBox");

//MapPost
app.MapPost("/AddChatBoxes", async (NeuronDb db, ChatBox chatBox) =>
{
    await db.ChatBoxesSet.AddAsync(chatBox);
    await db.SaveChangesAsync();
    return Results.Created($"/ChatBox/{chatBox.Id}", chatBox);
}).WithTags("ChatBox");

//MapPut
app.MapPut("/UpdateChatBoxes/{id}", async (NeuronDb db, ChatBox updateChatBox, int id) =>

{
    var chatBox = await db.ChatBoxesSet.FindAsync(id);
    if (chatBox is null)
        return Results.NotFound();
    chatBox.Pergunta = updateChatBox.Pergunta;
    chatBox.Resposta = updateChatBox.Resposta;
    chatBox.DataInteracao = updateChatBox.DataInteracao;


    await db.SaveChangesAsync();
    return Results.Ok(chatBox);
})
    .WithTags("ChatBox");

//MapDelete
app.MapDelete("/DeleteChatBox/{id}", async (NeuronDb db, int id) =>
{
    var chatbox = await db.ChatBoxesSet.FindAsync(id);
    if (chatbox is null)
    {
        return Results.NotFound();
    }
    db.ChatBoxesSet.Remove(chatbox);
    await db.SaveChangesAsync();

    return Results.Ok(chatbox);
})
    .WithTags("ChatBox");

//ROTAS PARA MissaoAluno

//MapGet
app.MapGet("/MissaoAluno", async (NeuronDb db) => await db.MissoesAlunoSet.ToListAsync())
    .WithTags("MissaoAluno");

//MapGet By Id
app.MapGet("/MissaoAluno/{id}", async (NeuronDb db, int id) =>
{
    var missaoAluno = await db.MissoesAlunoSet.FindAsync(id);
    if (missaoAluno is null)
    {
        return Results.NotFound();
    }
    return Results.Ok(missaoAluno);
})
    .WithTags("MissaoAluno");

//MapPost
app.MapPost("/AddMissaoAluno", async (NeuronDb db, MissaoAluno missaoAluno) =>
{
    await db.MissoesAlunoSet.AddAsync(missaoAluno);
    await db.SaveChangesAsync();
    return Results.Created($"/MissaoAluno/{missaoAluno.Id}", missaoAluno);
}).WithTags("MissaoAluno");

//MapPut
app.MapPut("/UpdateMissaoAluno/{id}", async (NeuronDb db, MissaoAluno updateMissaoAluno, int id) =>

{
    var missaoAluno = await db.MissoesAlunoSet.FindAsync(id);
    if (missaoAluno is null)
        return Results.NotFound();
    missaoAluno.Descricao = updateMissaoAluno.Descricao;
    missaoAluno.PontuacaoRecompensa = updateMissaoAluno.PontuacaoRecompensa;
    missaoAluno.QuantidadeAcertos = updateMissaoAluno.QuantidadeAcertos;
    await db.SaveChangesAsync();
    return Results.Ok(missaoAluno);
})
    .WithTags("MissaoAluno");

//MapDelete
app.MapDelete("/DeleteMissaoAluno/{id}", async (NeuronDb db, int id) =>
{
    var missaoAluno = await db.MissoesAlunoSet.FindAsync(id);
    if (missaoAluno is null)
    {
        return Results.NotFound();
    }
    db.MissoesAlunoSet.Remove(missaoAluno);
    await db.SaveChangesAsync();

    return Results.Ok(missaoAluno);
})
    .WithTags("MissaoAluno");

//ROTAS PARA PREFERENCIAS

//MapGet
app.MapGet("/Preferencias", async (NeuronDb db) => await db.PreferenciasSet.ToListAsync())
    .WithTags("Preferencias");

//MapGet By Id
app.MapGet("/Preferencias/{id}", async (NeuronDb db, int id) =>
{
    var preferencias = await db.PreferenciasSet.FindAsync(id);
    if (preferencias is null)
    {
        return Results.NotFound();
    }
    return Results.Ok(preferencias);
})
    .WithTags("Preferencias");

//MapPost
app.MapPost("/AddPreferencias", async (NeuronDb db, Preferencias preferencias) =>
{
    // Encontrar o aluno com o id fornecido na tabela Alunos
    var alunoExistente = await db.AlunosSet.FindAsync(preferencias.IdAluno);

    if (alunoExistente == null)
    {
        return Results.NotFound("Aluno n�o encontrado.");
    }

    // Atribui o aluno existente � prefer�ncia
    preferencias.Aluno = alunoExistente;

    // Adiciona as prefer�ncias ao banco de dados
    await db.PreferenciasSet.AddAsync(preferencias);
    await db.SaveChangesAsync();

    return Results.Created($"/Preferencias/{preferencias.Id}", preferencias);
}).WithTags("Preferencias");


//MapPut
app.MapPut("/UpdatePreferencias/{id}", async (NeuronDb db, Preferencias updatePreferencias, int id) =>
{
    Console.WriteLine($"Recebendo PUT para o ID: {id}");

    var preferencias = await db.PreferenciasSet.FindAsync(id);
    if (preferencias is null)
    {
        Console.WriteLine("Prefer�ncias n�o encontradas.");
        return Results.NotFound();
    }

    preferencias.EstiloAprendizado = updatePreferencias.EstiloAprendizado;
    preferencias.PreferenciaMateria = updatePreferencias.PreferenciaMateria;
    preferencias.TopicosPreferidos = updatePreferencias.TopicosPreferidos;
    preferencias.FrequenciaNotificao = updatePreferencias.FrequenciaNotificao;
    preferencias.IsAtivo = updatePreferencias.IsAtivo;

    await db.SaveChangesAsync();
    return Results.Ok(preferencias);
}).WithTags("Preferencias");


//MapDelete
app.MapDelete("/DeletePreferencias/{id}", async (NeuronDb db, int id) =>
{
    var preferencias = await db.PreferenciasSet.FindAsync(id);
    if (preferencias is null)
    {
        return Results.NotFound();
    }
    db.PreferenciasSet.Remove(preferencias);
    await db.SaveChangesAsync();

    return Results.Ok(preferencias);
})
    .WithTags("Preferencias");

//ROTAS PARA PROGRESSOS

//MapGet
app.MapGet("/Progresso", async (NeuronDb db) => await db.ProgressosSet.ToListAsync())
    .WithTags("Progresso");

//MapGet By Id
app.MapGet("/Progresso/{id}", async (NeuronDb db, int id) =>
{
    var progresso = await db.ProgressosSet.FindAsync(id);
    if (progresso is null)
    {
        return Results.NotFound();
    }
    return Results.Ok(progresso);
})
    .WithTags("Progresso");

//MapPost
app.MapPost("/AddProgresso", async (NeuronDb db, Progressos progresso) =>
{
    await db.ProgressosSet.AddAsync(progresso);
    await db.SaveChangesAsync();
    return Results.Created($"/MissaoAluno/{progresso.Id}", progresso);
}).WithTags("Progresso");

//MapPut
app.MapPut("/UpdateProgresso/{id}", async (NeuronDb db, Progressos updateprogresso, int id) =>

{
    var progresso = await db.ProgressosSet.FindAsync(id);
    if (progresso is null)
        return Results.NotFound();
    progresso.StatusProgresso = updateprogresso.StatusProgresso;


    await db.SaveChangesAsync();
    return Results.Ok(progresso);
})
    .WithTags("Progresso");

//MapDelete
app.MapDelete("/DeleteProgresso/{id}", async (NeuronDb db, int id) =>
{
    var progresso = await db.ProgressosSet.FindAsync(id);
    if (progresso is null)
    {
        return Results.NotFound();
    }
    db.ProgressosSet.Remove(progresso);
    await db.SaveChangesAsync();

    return Results.Ok(progresso);
})
    .WithTags("Progresso");

await app.RunAsync();