using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Net.Http;

namespace NeuronPlataforma.Server.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class GoogleController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public GoogleController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            var googleTokenInfoUrl = $"https://oauth2.googleapis.com/tokeninfo?id_token={request.Token}";

            var response = await _httpClient.GetAsync(googleTokenInfoUrl);
            if (!response.IsSuccessStatusCode)
            {
                return Unauthorized("Token inv�lido");
            }

            var tokenInfo = JObject.Parse(await response.Content.ReadAsStringAsync());
            var email = tokenInfo["email"]?.ToString();

            //adicionar verfica��o se email j� existe no banco de dados
            return Ok(new { Message = "Login bem sucediso", Email = email });
        }
    }

    public class GoogleLoginRequest
    {
        public string? Token { get; set; }
        
    }

}