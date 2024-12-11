using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace NeuronPlataforma.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CronogramaController : ControllerBase
    {
        [HttpPost("gerar")]
        public async Task<IActionResult> GerarCronograma([FromBody] OnboardingData data)
        {
            try
            {
                //Requisição para o script Python
                using (var httpClient = new HttpClient())
                {
                    var jsonContent = JsonConvert.SerializeObject(data);
                    var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                    //Url do script Python
                    var pythonApiUrl = "http://localhost:5000/gerar-cronograma";

                    var response = await httpClient.PostAsync(pythonApiUrl, content);

                    if (response.IsSuccessStatusCode)
                    {
                        var result = await response.Content.ReadAsStringAsync();
                        return Ok(JsonConvert.DeserializeObject(result));
                    }

                    return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
                }
            }catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }
    }

    public class OnboardingData
{
    public string Name { get; set; }
    public string NivelConhecimento { get; set; }
    public int HorasSemanais { get; set; }
    public List<string> Materias { get; set; }
    public List<string> DiasDisponiveis { get; set; }
    public string HorarioPreferencial { get; set; }
    public string Meta { get; set; }
    public string EstiloAprendizagem { get; set; }
    public string DuracaoSessao { get; set; }
    public string DataFinal { get; set; }
}
}
