from flask import Flask, request, jsonify
from datetime import datetime, timedelta
import json

app = Flask(__name__)

# Carregar as matérias (similar ao seu script atual)
def carregar_materias(arquivo_json):
    with open(arquivo_json, "r", encoding="utf-8") as file:
        return json.load(file)

materias = carregar_materias("materias.json")

def filtrar_conteudos(materias, user_level, user_data):
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

def gerar_cronograma(conteudos, user_data):
    cronograma = []
    start_date = datetime.now()
    dataFinal = datetime.strptime(user_data["dataFinal"], "%Y-%m-%d")
    duracaoSessao = timedelta(minutes=60)
    sessions_per_week = user_data["horasSemanais"] // len(user_data["diasDisponiveis"])

    current_date = start_date
    conteudo_index = 0
    revisao_counter = 0

    while current_date <= dataFinal and conteudo_index < len(conteudos):
        day_name = current_date.strftime("%A")
        if day_name in user_data["diasDisponiveis"]:
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
                if revisao_counter == 4:
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

@app.route('/gerar-cronograma', methods=['POST'])
def gerar():
    user_data = request.json
    conteudos = filtrar_conteudos(materias, user_data["NivelConhecimento"], user_data)
    cronograma = gerar_cronograma(conteudos, user_data)
    return jsonify(cronograma)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
