# -*- coding: utf-8 -*-
import sys
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import json
import logging
import tensorflow as tf

from search_videos import buscar_videos

# Desativa logs desnecessários do TensorFlow
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Apenas erros do TensorFlow aparecerão
logging.getLogger('tensorflow').setLevel(logging.ERROR)
tf.compat.v1.logging.set_verbosity(tf.compat.v1.logging.ERROR)

def main():
    if len(sys.argv) < 2:
        print("Uso correto: python main.py <query>")
        return
    
    query = sys.argv[1]
    preferencias = {
        "duracao": "curto",
        "sem_palavras": True
    }

    try:
        resultado = buscar_videos(query, preferencias)
        print(json.dumps(resultado, ensure_ascii=False))
    except Exception as e:
        print(json.dumps({"error": str(e)}, ensure_ascii=False))

if __name__ == "__main__":
    main()
