//using Microsoft.IdentityModel.Tokens;
//using NeuronPlataforma.Server.Models;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace NeuronPlataforma.Server.Services
//{
//    public class TokenService
//    {
//        public static object GenerateToken(Alunos aluno)
//        {
//            var key = Encoding.ASCII.GetBytes(Key.Secret);
//            var tokenConfig = new SecurityTokenDescriptor                                 VER DEPOIS
//            {
//                Subject = new ClaimsIdentity(
//                [
//                    new Claim("alunoId", aluno.Id.ToString()),
//                ]),
//                Expires = DateTime.UtcNow.AddHours(3),
//                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
//            };

//            var tokenHandler = new JwtSecurityTokenHandler();
//            var token = tokenHandler.CreateToken(tokenConfig);
//            var tokenString = tokenHandler.WriteToken(token);

//            return new
//            {
//                token = tokenString
//            };
//        }
//    }
//}
