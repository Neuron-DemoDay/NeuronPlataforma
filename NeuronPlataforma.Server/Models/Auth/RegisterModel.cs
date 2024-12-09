using System.ComponentModel.DataAnnotations;

namespace NeuronPlataforma.Server.Models.Auth
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Nome completo é obrigatório")]
        [StringLength(100, ErrorMessage = "O nome deve ter no máximo {1} caracteres.")]
        public required string FullName { get; set; }

        [EmailAddress(ErrorMessage = "Formato de email inválido")]
        [Required(ErrorMessage = "Email é obrigatório")]
        public required string Email { get; set; }

        [DataType(DataType.Password)]
        [StringLength(20, ErrorMessage = "A senha deve ter no mínimo {2} e no máximo {1} caracteres.", MinimumLength = 10)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$",
            ErrorMessage = "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.")]
        [Required(ErrorMessage = "Senha é obrigatória")]
        public required string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirmar senha")]
        [Compare("Password", ErrorMessage = "Senhas não conferem")]
        public required string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Data de nascimento é obrigatória")]
        [DataType(DataType.Date)]
        public required DateTime DateOfBirth { get; set; }

        [Required(ErrorMessage = "Escolaridade é obrigatória")]
        [StringLength(50, ErrorMessage = "Escolaridade deve ter no máximo {1} caracteres.")]
        public required string Education { get; set; }

        [Required(ErrorMessage = "Gênero é obrigatório")]
        [StringLength(20, ErrorMessage = "Gênero deve ter no máximo {1} caracteres.")]
        public required Genero Genero{ get; set; }

        [Required(ErrorMessage = "Telefone é obrigatório")]
        [Phone(ErrorMessage = "Formato de telefone inválido")]
        [StringLength(15, ErrorMessage = "O telefone deve ter no máximo {1} caracteres.")]
        public required string PhoneNumber { get; set; }
    }
}
