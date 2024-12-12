import sys
from googleapiclient.discovery import build
from transformers import pipeline
from langdetect import detect, DetectorFactory
import isodate

DetectorFactory.seed = 0

API_KEY = "AIzaSyB9DbPeuCqrV0bfGDjcAd3Zgg5KZL_kdQQ"
youtube = build('youtube', 'v3', developerKey=API_KEY)

def buscar_videos(query, preferencias):
    response = youtube.search().list(
        q=query,
        part='snippet',
        maxResults=1,
        type='video',
        regionCode='BR',
        relevanceLanguage='pt'
    ).execute()

    #print("Resposta da API YouTube:", response) 

    videos = []
    for item in response.get('items', []):
        video_id = item['id'].get('videoId')
        titulo = item['snippet'].get('title')

        if not video_id or not titulo:
            continue

        # Detecta o idioma do título
        if detect(titulo) != 'pt':
            continue

        video = {
            'id': video_id,
            'titulo': titulo,
            'embed': f"https://www.youtube.com/watch?v={video_id}"
        }
        videos.append(video)

    filtrados = filtrar_videos(videos, preferencias)
    return filtrados

def filtrar_videos(videos, preferencias):
    analisador = pipeline('text-classification', model="unitary/toxic-bert")

    filtrados = []
    for video in videos:
        if preferencias.get('sem_palavroes') and contem_palavroes(video['titulo'], analisador):
            continue

        filtrados.append(video)

    return filtrados

def contem_palavroes(texto, analisador):
    try:
        resultados = analisador(texto)
        for res in resultados:
            if res['label'] == "TOXIC" and res['score'] > 0.5:
                return True
        return False
    except Exception as e:
        print(f"Erro ao analisar palavroes: {e}")
        return False
