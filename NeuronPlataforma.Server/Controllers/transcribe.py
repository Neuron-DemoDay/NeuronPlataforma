# -*- coding: utf-8 -*-
import sys
import json
from youtube_transcript_api import YouTubeTranscriptApi

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "ID do video nao fornecido"}))
        return

    video_id = sys.argv[1]

    try:
        # Busca a transcrição
        transcription = YouTubeTranscriptApi.get_transcript(video_id, languages=['pt'])
        # Retorna a transcrição como JSON
        print(json.dumps(transcription, ensure_ascii=False))
    except Exception as e:
        print(json.dumps({"error": str(e)}, ensure_ascii=False))

if __name__ == "__main__":
    main()
