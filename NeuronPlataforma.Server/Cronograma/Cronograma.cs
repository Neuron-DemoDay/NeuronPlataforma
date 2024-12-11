using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace NeuronPlataforma.Server.Cronograma
{
    public class Cronograma
    {
        public class UserData
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

        public class Materia
        {
            public string Name { get; set; }
            public List<Topic> Topics { get; set; }
        }

        public class Topic
        {
            public string Name { get; set; }
            public List<Subtopic> Subtopics { get; set; }
        }

        public class Subtopic
        {
            public string Name { get; set; }
            public string Level { get; set; }
        }

        public class CronogramaItem
        {
            public string Title { get; set; }
            public string Start { get; set; }
            public string End { get; set; }
            public string Category { get; set; }
        }

        static void Main(string[] args)
        {
            var userData = new UserData
            {
                Name = "Guilherme Campelo",
                NivelConhecimento = "Intermediário",
                HorasSemanais = 10,
                Materias = new List<string> { "Matemática", "Português", "Biologia" },
                DiasDisponiveis = new List<string> { "Monday", "Wednesday", "Friday" },
                HorarioPreferencial = "10:00-12:00",
                Meta = "Melhorar notas",
                EstiloAprendizagem = "Visual",
                DuracaoSessao = "1 hour",
                DataFinal = "2025-12-10"
            };

            List<Materia> materias = CarregarMaterias("materias.json");

            var conteudos = FiltrarConteudos(materias, userData.NivelConhecimento, userData.Materias);

            var cronograma = GerarCronograma(conteudos, userData);

            File.WriteAllText("cronograma.json", JsonConvert.SerializeObject(cronograma, Formatting.Indented));

            Console.WriteLine("Cronograma gerado e salvo em 'cronograma.json'");
        }

        static List<Materia> CarregarMaterias(string arquivoJson)
        {
            var json = File.ReadAllText(arquivoJson);
            return JsonConvert.DeserializeObject<List<Materia>>(json);
        }

        static List<Dictionary<string, string>> FiltrarConteudos(List<Materia> materias, string userLevel, List<string> userMaterias)
        {
            var conteudosFiltrados = new List<Dictionary<string, string>>();

            foreach (var materia in materias)
            {
                if (userMaterias.Contains(materia.Name))
                {
                    foreach (var topic in materia.Topics)
                    {
                        foreach (var subtopic in topic.Subtopics)
                        {
                            if (subtopic.Level == "Básico" || subtopic.Level == userLevel)
                            {
                                conteudosFiltrados.Add(new Dictionary<string, string>
                            {
                                { "materia", materia.Name },
                                { "topico", topic.Name },
                                { "subtopico", subtopic.Name }
                            });
                            }
                        }
                    }
                }
            }

            return conteudosFiltrados;
        }

        static List<CronogramaItem> GerarCronograma(List<Dictionary<string, string>> conteudos, UserData userData)
        {
            var cronograma = new List<CronogramaItem>();
            var startDate = DateTime.Now;
            var dataFinal = DateTime.Parse(userData.DataFinal);
            var duracaoSessao = TimeSpan.FromMinutes(60);
            var sessionsPerWeek = userData.HorasSemanais / userData.DiasDisponiveis.Count;

            var currentDate = startDate;
            int conteudoIndex = 0;
            int revisaoCounter = 0;

            while (currentDate <= dataFinal && conteudoIndex < conteudos.Count)
            {
                var dayName = currentDate.ToString("dddd");
                if (userData.DiasDisponiveis.Contains(dayName))
                {
                    var startTime = DateTime.Parse(userData.HorarioPreferencial.Split('-')[0]);
                    for (int i = 0; i < sessionsPerWeek; i++)
                    {
                        if (conteudoIndex >= conteudos.Count)
                        {
                            break;
                        }
                        var endTime = startTime + duracaoSessao;

                        cronograma.Add(new CronogramaItem
                        {
                            Title = conteudos[conteudoIndex]["subtopico"],
                            Start = currentDate.ToString("yyyy-MM-ddTHH:mm:ss") + startTime.ToString("HH:mm:ss"),
                            End = currentDate.ToString("yyyy-MM-ddTHH:mm:ss") + endTime.ToString("HH:mm:ss"),
                            Category = conteudos[conteudoIndex]["materia"]
                        });

                        startTime = endTime;
                        revisaoCounter++;
                        if (revisaoCounter == 4) // Após 4 sessões, adiciona revisão
                        {
                            cronograma.Add(new CronogramaItem
                            {
                                Title = "Revisão dos tópicos anteriores",
                                Start = currentDate.ToString("yyyy-MM-ddTHH:mm:ss") + startTime.ToString("HH:mm:ss"),
                                End = currentDate.ToString("yyyy-MM-ddTHH:mm:ss") + (startTime + duracaoSessao).ToString("HH:mm:ss"),
                                Category = "Revisão"
                            });
                            revisaoCounter = 0;
                        }
                        conteudoIndex++;
                    }
                }
                currentDate = currentDate.AddDays(1);
            }

            return cronograma;
        }
    }
}

