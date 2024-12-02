using Microsoft.EntityFrameworkCore;
using NeuronPlataforma.Server.Infrastructure;
using NeuronPlataforma.Server.Models;
using Microsoft.OpenApi.Models;
using NeuronPlataforma.Server.Infrastructure.Configurations.ConfigurationGemini;

//CONFIGURANDO CONEXÃO COM O BANCO DE DADOS
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

//MapDelete
app.MapDelete("/DeleteAlunos/{id}", async (NeuronDb db, int id) =>
{
    var aula = await db.AulasSet.FindAsync(id);
    if (aula is null)
    {
        return Results.NotFound();
    }
    db.AulasSet.Remove(aula);
    await db.SaveChangesAsync();

    return Results.Ok(aula);
})
    .WithTags("Aulas");


//ROTAS PARA Avatares

//MapGet
app.MapGet("/Avatares", async (NeuronDb db) => await db.AvataresSet.ToListAsync())
    .WithTags("Avatares");

//MapGet By Id
app.MapGet("/Avatares/{id}", async (NeuronDb db, int id) =>
{
    var aula = await db.AvataresSet.FindAsync(id);
    if (aula is null)
    {
        return Results.NotFound();
    }
    return Results.Ok(aula);
})
    .WithTags("Avatares");

//MapPost
app.MapPost("/AddAvatares", async (NeuronDb db, Avatares avatares) =>
{
    await db.AvataresSet.AddAsync(avatares);
    await db.SaveChangesAsync();
    return Results.Created($"/avatares/{avatares.Id}", avatares);
}).WithTags("Avatares");

//MapPut
app.MapPut("/UpdateAvatares/{id}", async (NeuronDb db, Avatares updateAvatares, int id) =>

{
    var avatares = await db.AvataresSet.FindAsync(id);
    if (avatares is null)
        return Results.NotFound();
    avatares.Imagem = updateAvatares.Imagem;
    avatares.Nome = updateAvatares.Nome;

    await db.SaveChangesAsync();
    return Results.Ok(avatares);
})
    .WithTags("Avatares");

//MapDelete
app.MapDelete("/DeleteAvatares/{id}", async (NeuronDb db, int id) =>
{
    var avatares = await db.AvataresSet.FindAsync(id);
    if (avatares is null)
    {
        return Results.NotFound();
    }
    db.AvataresSet.Remove(avatares);
    await db.SaveChangesAsync();

    return Results.Ok(avatares);
})
    .WithTags("Avatares");


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
        return Results.NotFound("Aluno não encontrado.");
    }

    // Atribui o aluno existente à preferência
    preferencias.Aluno = alunoExistente;

    // Adiciona as preferências ao banco de dados
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
        Console.WriteLine("Preferências não encontradas.");
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