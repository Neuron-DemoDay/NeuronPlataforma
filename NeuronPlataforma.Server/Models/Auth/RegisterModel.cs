using System.ComponentModel.DataAnnotations;

namespace NeuronPlataforma.Server.Models.Auth
{
    public class RegisterModel
    {
        [EmailAddress]
        public required string Email { get; set; }

        [DataType(DataType.Password)]
        public required string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirmar senha")]
        [Compare("Password", ErrorMessage = "Senhas não conferem")]
        public required string ConfirmPassword { get; set; }
    }
}
