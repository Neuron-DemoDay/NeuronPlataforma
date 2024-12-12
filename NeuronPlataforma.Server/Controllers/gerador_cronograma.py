import json
import sys
from datetime import datetime, timedelta

def carregar_json(caminho):
    try:
        with open(caminho, "r", encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Erro: Arquivo não encontrado: {caminho}")
        sys.exit(1)

def converter_duracao(duracao):
    if "hour" in duracao:
        return int(duracao.split()[0]) * 60
    elif "minute" in duracao:
        return int(duracao.split()[0])
    return 60

def filtrar_conteudos(materias, user_data):
    conteudos_filtrados = []
    for materia in materias:
        if materia["name"] in user_data["materias"]:
            for topic in materia["topics"]:
                for subtopic in topic["subtopics"]:
                    if subtopic["level"] in ["Básico", user_data["nivelConhecimento"]]:
                        conteudos_filtrados.append({
                            "materia": materia["name"],
                            "topico": topic["name"],
                            "subtopico": subtopic["name"]
                        })
    return conteudos_filtrados

def gerar_cronograma(conteudos, user_data):
    cronograma = []
    start_date = datetime.now()
    dataFinal = datetime.strptime(user_data["dataFinal"], "%Y-%m-%d")
    duracaoSessao = timedelta(minutes=converter_duracao(user_data["duracaoSessao"]))
    sessions_per_week = user_data["horasSemanais"] * 60 // (len(user_data["diasDisponíveis"]) * duracaoSessao.total_seconds() / 60)

    current_date = start_date
    conteudo_index = 0
    revisao_counter = 0
    id_counter = 1

    while current_date <= dataFinal and conteudo_index < len(conteudos):
        day_name = current_date.strftime("%A")
        if day_name in user_data["diasDisponíveis"]:
            start_time = datetime.strptime(user_data["horarioPreferencial"].split("-")[0], "%H:%M")
            for _ in range(int(sessions_per_week)):
                if conteudo_index >= len(conteudos):
                    break
                end_time = start_time + duracaoSessao

                cronograma.append({
                    "id": str(id_counter),
                    "title": conteudos[conteudo_index]["subtopico"],
                    "start": current_date.strftime("%Y-%m-%dT") + start_time.strftime("%H:%M:%S"),
                    "end": current_date.strftime("%Y-%m-%dT") + end_time.strftime("%H:%M:%S"),
                    "category": conteudos[conteudo_index]["materia"]
                })
                id_counter += 1

                start_time = end_time
                revisao_counter += 1
                if revisao_counter == 4:
                    cronograma.append({
                        "id": str(id_counter),
                        "title": "Revisão dos tópicos anteriores",
                        "start": current_date.strftime("%Y-%m-%dT") + start_time.strftime("%H:%M:%S"),
                        "end": current_date.strftime("%Y-%m-%dT") + (start_time + duracaoSessao).strftime("%H:%M:%S"),
                        "category": "Revisão"
                    })
                    id_counter += 1
                    revisao_counter = 0
                conteudo_index += 1
        current_date += timedelta(days=1)

    return cronograma

if __name__ == "__main__":
    materias_path = sys.argv[1]
    user_data_path = sys.argv[2]

    materias = carregar_json(materias_path)
    user_data = carregar_json(user_data_path)

    conteudos = filtrar_conteudos(materias, user_data)
    cronograma = gerar_cronograma(conteudos, user_data)

    print(json.dumps(cronograma, indent=4, ensure_ascii=False))
