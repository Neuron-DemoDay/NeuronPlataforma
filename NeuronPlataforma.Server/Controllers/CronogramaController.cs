using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace NeuronPlataforma.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CronogramaController : ControllerBase
    {
        private readonly string filePath = Path.Combine(Directory.GetCurrentDirectory(), "materias.json");

        [HttpPost("gerar")]
        public IActionResult GerarCronograma([FromBody] UserRequest userRequest)
        {
            try
            {
                // Serializa os dados do usuário para JSON e salva temporariamente
                string userDataJson = JsonSerializer.Serialize(userRequest);
                string tempFilePath = Path.Combine(Path.GetTempPath(), "user_data.json");
                System.IO.File.WriteAllText(tempFilePath, userDataJson);

                // Inicia o processo para executar o script Python
                var startInfo = new ProcessStartInfo
                {
                    FileName = "python",
                    Arguments = $"gerador_cronograma.py \"{filePath}\" \"{tempFilePath}\"",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                var process = Process.Start(startInfo);
                process.WaitForExit();

                var output = process.StandardOutput.ReadToEnd().Trim();
                var error = process.StandardError.ReadToEnd();

                if (!string.IsNullOrWhiteSpace(error))
                {
                    return BadRequest($"Erro Python: {error}");
                }

                if (string.IsNullOrWhiteSpace(output))
                {
                    return BadRequest("Nenhum cronograma gerado pelo script Python.");
                }

                // Retorna o cronograma gerado
                return Ok(JsonSerializer.Deserialize<object>(output));
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        public class UserRequest
        {
            [JsonPropertyName("name")]
            public string Name { get; set; }

            [JsonPropertyName("nivelConhecimento")]
            public string NivelConhecimento { get; set; }

            [JsonPropertyName("horasSemanais")]
            public int HorasSemanais { get; set; }

            [JsonPropertyName("materias")]
            public List<string> Materias { get; set; }

            [JsonPropertyName("diasDisponíveis")]
            public List<string> DiasDisponiveis { get; set; }

            [JsonPropertyName("horarioPreferencial")]
            public string HorarioPreferencial { get; set; }

            [JsonPropertyName("meta")]
            public string Meta { get; set; }

            [JsonPropertyName("estiloAprendizagem")]
            public string EstiloAprendizagem { get; set; }

            [JsonPropertyName("duracaoSessao")]
            public string DuracaoSessao { get; set; }

            [JsonPropertyName("dataFinal")]
            public string DataFinal { get; set; }
        }
    }
}
