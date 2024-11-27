using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NeuronPlataforma.Server.Infrastructure;
using NeuronPlataforma.Server.Models;

namespace NeuronPlataforma.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatBoxController : ControllerBase
    {
        private readonly NeuronDb _db;

        public ChatBoxController(NeuronDb db)
        {
            _db = db;
        }

        //GET: api/ChatBox
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var chatBox = await _db.ChatBoxesSet.ToListAsync();
            return Ok(chatBox);
        }

        //GET: api/ChatBox/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var chatBox = await _db.ChatBoxesSet.FindAsync(id);
            if (chatBox is null)
                return NotFound();
            return Ok(chatBox);
        }

        //POST: api/ChatBox
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ChatBox chatBox)
        {
            await _db.ChatBoxesSet.AddAsync(chatBox);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = chatBox.Id }, chatBox);
        }

        //PUT: api/ChatBox/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ChatBox updateChatBox)
        {
            var chatBox = await _db.ChatBoxesSet.FindAsync(id);
            if (chatBox is null)
                return NotFound();

            chatBox.Pergunta = updateChatBox.Pergunta;
            chatBox.Resposta = updateChatBox.Resposta;
            chatBox.DataInteracao = updateChatBox.DataInteracao;

            await _db.SaveChangesAsync();
            return Ok(chatBox);
        }

        //DELETE: api/ChatBox/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var chatBox = await _db.ChatBoxesSet.FindAsync(id);
            if (chatBox is null)
                return NotFound();

            _db.ChatBoxesSet.Remove(chatBox);
            await _db.SaveChangesAsync();

            return Ok(chatBox);
        }
    }
}
