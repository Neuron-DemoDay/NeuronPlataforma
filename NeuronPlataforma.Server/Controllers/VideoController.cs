using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace NeuronPlataforma.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VideoController : ControllerBase
    {
        private readonly string filePath = Path.Combine(Directory.GetCurrentDirectory(), "events.json");

        [HttpGet("{idAula}")]
        public IActionResult GetVideoForAula(string idAula)
        {
            try
            {
                // Lê o conteúdo do arquivo JSON
                string jsonContent = System.IO.File.ReadAllText(filePath);
                var aulas = JsonSerializer.Deserialize<List<Aula>>(jsonContent);

                var aulaEncontrada = aulas?.FirstOrDefault(aula => aula.Id == idAula);
                if (aulaEncontrada == null)
                    return NotFound($"A aula {idAula} não foi encontrada.");

                var title = aulaEncontrada.Titulo;

                var startInfo = new ProcessStartInfo
                {
                    FileName = "python",
                    Arguments = $"controllers/main.py \"{title}\"",
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
                    return BadRequest("Nenhum link de vídeo encontrado!");

                try
                {
                    // Tenta converter o output em JSON válido
                    var videoData = JsonSerializer.Deserialize<List<Aula>>(output);
                    return Ok(videoData);
                }
                catch (JsonException)
                {
                    return BadRequest("Erro ao converter os dados do Python para JSON.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        private class Aula
        {
            [JsonPropertyName("id")]
            public string Id { get; set; }

            [JsonPropertyName("title")]
            public string Titulo { get; set; }

            [JsonPropertyName("embed")]
            public string Embed { get; set; }
        }
    }
}
