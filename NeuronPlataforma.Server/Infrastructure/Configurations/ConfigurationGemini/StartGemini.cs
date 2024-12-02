using System.Diagnostics;

namespace NeuronPlataforma.Server.Infrastructure.Configurations.ConfigurationGemini
{
    public class StartGemini
    {
        private readonly static string pathApiGemini = "./API.Gemini/server.js";

        public static void start()
        {
            ProcessStartInfo startInfo = new ProcessStartInfo
            {
                FileName = "node",
                Arguments = pathApiGemini,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using (Process process = new Process())
            {
                process.StartInfo = startInfo;
                process.Start();
            };
        }
    }
}
