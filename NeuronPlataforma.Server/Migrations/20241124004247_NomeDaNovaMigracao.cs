using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NeuronPlataforma.Server.Migrations
{
    /// <inheritdoc />
    public partial class NomeDaNovaMigracao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Aulas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TituloAula = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DataCriacao = table.Column<DateTime>(type: "date", nullable: false),
                    Nivel = table.Column<int>(type: "int", nullable: false),
                    CargaHoraria = table.Column<int>(type: "int", nullable: false),
                    Materia = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DataTermino = table.Column<DateTime>(type: "date", nullable: false),
                    Conteudo = table.Column<string>(type: "nvarchar(260)", maxLength: 260, nullable: false),
                    Descricao = table.Column<string>(type: "nvarchar(260)", maxLength: 260, nullable: false),
                    Anotacoes = table.Column<string>(type: "nvarchar(260)", maxLength: 260, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aulas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Avatares",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Imagem = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Avatares", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Alunos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    DataNascimento = table.Column<DateTime>(type: "date", nullable: false),
                    Notas = table.Column<decimal>(type: "decimal(3,1)", nullable: true),
                    Telefone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    DataCadastro = table.Column<DateTime>(type: "date", nullable: false),
                    IsAtivo = table.Column<bool>(type: "bit", nullable: false),
                    Senha = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false),
                    Genero = table.Column<int>(type: "int", nullable: false),
                    Pontuacao = table.Column<int>(type: "int", nullable: false),
                    HashRecuperacao = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    IdAvatar = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alunos", x => x.id);
                    table.ForeignKey(
                        name: "FK_Alunos_Avatares_IdAvatar",
                        column: x => x.IdAvatar,
                        principalTable: "Avatares",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Chat_box",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Pergunta = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: false),
                    Resposta = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: false),
                    DataInteracao = table.Column<DateTime>(type: "date", nullable: false),
                    IdAluno = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chat_box", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Chat_box_Alunos_IdAluno",
                        column: x => x.IdAluno,
                        principalTable: "Alunos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Preferencias",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdAluno = table.Column<int>(type: "int", nullable: false),
                    EstiloAprendizado = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PreferenciaMateria = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TopicosPreferidos = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    FrequenciaNotificao = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    IsAtivo = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Preferencias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Preferencias_Alunos_IdAluno",
                        column: x => x.IdAluno,
                        principalTable: "Alunos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Progressos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdAula = table.Column<int>(type: "int", nullable: false),
                    AulaId = table.Column<int>(type: "int", nullable: false),
                    IdAluno = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Progressos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Progressos_Alunos_IdAluno",
                        column: x => x.IdAluno,
                        principalTable: "Alunos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Progressos_Aulas_AulaId",
                        column: x => x.AulaId,
                        principalTable: "Aulas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Missao_aluno",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descricao = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    PontuacaoRecompensa = table.Column<int>(type: "int", nullable: false),
                    DataCriacao = table.Column<DateTime>(type: "date", nullable: false),
                    QuantidadeAcertos = table.Column<int>(type: "int", nullable: false),
                    IdProgresso = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Missao_aluno", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Missao_aluno_Progressos_IdProgresso",
                        column: x => x.IdProgresso,
                        principalTable: "Progressos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Alunos_IdAvatar",
                table: "Alunos",
                column: "IdAvatar");

            migrationBuilder.CreateIndex(
                name: "IX_Chat_box_IdAluno",
                table: "Chat_box",
                column: "IdAluno");

            migrationBuilder.CreateIndex(
                name: "IX_Missao_aluno_IdProgresso",
                table: "Missao_aluno",
                column: "IdProgresso");

            migrationBuilder.CreateIndex(
                name: "IX_Preferencias_IdAluno",
                table: "Preferencias",
                column: "IdAluno");

            migrationBuilder.CreateIndex(
                name: "IX_Progressos_AulaId",
                table: "Progressos",
                column: "AulaId");

            migrationBuilder.CreateIndex(
                name: "IX_Progressos_IdAluno",
                table: "Progressos",
                column: "IdAluno");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Chat_box");

            migrationBuilder.DropTable(
                name: "Missao_aluno");

            migrationBuilder.DropTable(
                name: "Preferencias");

            migrationBuilder.DropTable(
                name: "Progressos");

            migrationBuilder.DropTable(
                name: "Alunos");

            migrationBuilder.DropTable(
                name: "Aulas");

            migrationBuilder.DropTable(
                name: "Avatares");
        }
    }
}
