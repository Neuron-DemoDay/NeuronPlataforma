using System.ComponentModel.DataAnnotations;

namespace NeuronPlataforma.Server.Models.Auth
{
    public class RegisterModel
    {
        [EmailAddress(ErrorMessage = "Formato de email inválido")]
        [Required(ErrorMessage = "Email é obrigatório")]
        public required string Email { get; set; }

        [DataType(DataType.Password)]
        [StringLength(20, ErrorMessage = "A {0} deve ter no mínimo {2} e no máximo {1} caracteres.", MinimumLength = 10)]
        [Required(ErrorMessage = "Senha é obrigatória")]
        public required string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirmar senha")]
        [Compare("Password", ErrorMessage = "Senhas não conferem")]
        public required string ConfirmPassword { get; set; }
    }
}
