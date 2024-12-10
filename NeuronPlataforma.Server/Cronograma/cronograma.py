import json
from datetime import datetime, timedelta

# Respostas fictícias do onboarding
user_data = {
    "name": "Guilherme Campelo",
    "nivelConhecimento": "Intermediário",
    "horasSemanais": 10,
    "materias": ["Matemática", "Português", "Biologia"],
    "diasDisponíveis": ["Monday", "Wednesday", "Friday"],
    "horarioPreferencial": "10:00-12:00",
    "meta": "Melhorar notas",
    "estiloAprendizagem": "Visual",
    "duracaoSessao": "1 hour",
    "dataFinal": "2025-10-28"
}

# Ler o JSON de matérias de um arquivo externo
def carregar_materias(arquivo_json):
    with open(arquivo_json, "r", encoding="utf-8") as file:
        return json.load(file)

materias = carregar_materias("materias.json")

# Função para filtrar tópicos com base no nível de conhecimento do usuário
def filtrar_conteudos(materias, user_level):
    conteudos_filtrados = []
    for materia in materias:
        if materia["name"] in user_data["materias"]:
            for topic in materia["topics"]:
                for subtopic in topic["subtopics"]:
                    if subtopic["level"] in ["Básico", user_level]:
                        conteudos_filtrados.append({
                            "materia": materia["name"],
                            "topico": topic["name"],
                            "subtopico": subtopic["name"]
                        })
    return conteudos_filtrados

# Filtrar conteúdos com base no nível de conhecimento
conteudos = filtrar_conteudos(materias, user_data["nivelConhecimento"])

# Função para gerar cronograma
def gerar_cronograma(conteudos, user_data):
    cronograma = []
    start_date = datetime.now()
    dataFinal = datetime.strptime(user_data["dataFinal"], "%Y-%m-%d")
    duracaoSessao = timedelta(minutes=60)  # Duração padrão de 1 hora
    sessions_per_week = user_data["horasSemanais"] // len(user_data["diasDisponíveis"])

    current_date = start_date
    conteudo_index = 0
    revisao_counter = 0

    while current_date <= dataFinal and conteudo_index < len(conteudos):
        day_name = current_date.strftime("%A")
        if day_name in user_data["diasDisponíveis"]:
            start_time = datetime.strptime(user_data["horarioPreferencial"].split("-")[0], "%H:%M")
            for _ in range(sessions_per_week):
                if conteudo_index >= len(conteudos):
                    break
                end_time = start_time + duracaoSessao
                
                cronograma.append({
                    "title": conteudos[conteudo_index]["subtopico"],
                    "start": current_date.strftime("%Y-%m-%dT") + start_time.strftime("%H:%M:%S"),
                    "end": current_date.strftime("%Y-%m-%dT") + end_time.strftime("%H:%M:%S"),
                    "category": conteudos[conteudo_index]["materia"]
                })
                
                start_time = end_time
                revisao_counter += 1
                if revisao_counter == 4:  # Após 4 sessões, adiciona revisão
                    cronograma.append({
                        "title": "Revisão dos tópicos anteriores",
                        "start": current_date.strftime("%Y-%m-%dT") + start_time.strftime("%H:%M:%S"),
                        "end": current_date.strftime("%Y-%m-%dT") + (start_time + duracaoSessao).strftime("%H:%M:%S"),
                        "category": "Revisão"
                    })
                    revisao_counter = 0
                conteudo_index += 1
        current_date += timedelta(days=1)

    return cronograma

# Gerar cronograma com os conteúdos filtrados
cronograma = gerar_cronograma(conteudos, user_data)

# Exportar para JSON
with open("cronograma.json", "w", encoding="utf-8") as output_file:
    json.dump(cronograma, output_file, indent=4, ensure_ascii=False)

print("Cronograma gerado e salvo em 'cronograma.json'")
