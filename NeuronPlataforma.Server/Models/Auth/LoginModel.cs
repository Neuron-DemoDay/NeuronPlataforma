using System.ComponentModel.DataAnnotations;

namespace NeuronPlataforma.Server.Models.Auth
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Email é obrigatório")]
        [EmailAddress(ErrorMessage = "Formato de email inválido")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Senha é obrigatório")]
        [StringLength(20, ErrorMessage = "A {0} deve ter no mínimo {2} e no máximo {1} Caracteres.", MinimumLength = 10)]
        [DataType(DataType.Password)]
        public required string Password { get; set; }
    }
}
