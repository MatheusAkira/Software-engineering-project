import speech_recognition as sr
from gtts import gTTS
import os
import re
import json

def transcrever_audio():
    # Inicializa o reconhecedor de fala
    recognizer = sr.Recognizer()

    # Usa o microfone como fonte de áudio
    with sr.Microphone() as source:
        # Configura o tempo limite de 1,5 segundos sem áudio
        print("Diga algo em português...")
        audio = recognizer.listen(source, timeout=1.5)

    try:
        # Retorna a transcrição
        return recognizer.recognize_google(audio, language='pt-BR')
    except sr.UnknownValueError:
        print("Não foi possível entender o áudio")
    except sr.RequestError as e:
        print("Erro ao solicitar a transcrição; {0}".format(e))
    # Se ocorrer um erro, retorna None
    return None

def reproduzir_audio(info):
    
    texto = 'Como desejar, eu irei agendar ' + info["título"] + ' para a data ' + info["data"] +  info['hora'] + ' no local ' + info['local']
    # Configura o idioma para português brasileiro
    tts = gTTS(text=texto, lang='pt-br')
    tts.save("audio.mp3")
    # Reproduz o áudio
    os.system("start audio.mp3")

def extrair_info(string):
    info = {}
    palavras_chave = ["título", "data", "hora", "local"]

    for palavra_chave in palavras_chave:
        index_palavra = string.lower().find(palavra_chave)
        if index_palavra != -1:
            inicio_valor = index_palavra + len(palavra_chave)
            proxima_palavra = palavras_chave.index(palavra_chave) + 1
            if proxima_palavra < len(palavras_chave):
                index_proxima_palavra = string.lower().find(palavras_chave[proxima_palavra], inicio_valor)
                valor = string[inicio_valor:index_proxima_palavra].strip()
            else:
                valor = string[inicio_valor:].strip()
            info[palavra_chave] = valor

    return formatar_info(info)

def formatar_info(info):
    # Formatar data (assumindo que o mês está em formato numérico)
    data = info["data"]
    padrao_data = r'(\d{1,2}) de (\w+)'
    correspondencia = re.match(padrao_data, data)
    if correspondencia:
        dia = correspondencia.group(1)
        mes_extenso = correspondencia.group(2).lower()
        meses = {
            'janeiro': '01',
            'fevereiro': '02',
            'março': '03',
            'abril': '04',
            'maio': '05',
            'junho': '06',
            'julho': '07',
            'agosto': '08',
            'setembro': '09',
            'outubro': '10',
            'novembro': '11',
            'dezembro': '12'
        }
        mes = meses.get(mes_extenso)
        if mes:
            info["data"] = f"2024-{mes}-{dia}"

    # Formatar hora (assegurando que está no intervalo de 0 a 24 horas)
    hora = info["hora"]
    if ':' in hora:
        # Se o horário estiver no formato HH:MM
        partes_hora = hora.split(':')
        try:
            horas = int(partes_hora[0])
            minutos = int(partes_hora[1])
            if 0 <= horas < 24 and 0 <= minutos < 60:
                info["hora"] = f"{horas:02d}:{minutos:02d}"
            else:
                info["hora"] = "00:00"  # Caso os valores estejam fora do intervalo
        except ValueError:
            info["hora"] = "00:00"  # Em caso de erro de conversão
    else:
        # Se o horário estiver no formato numérico
        try:
            hora_int = int(hora)
            if 0 <= hora_int < 24:
                info["hora"] = f"{hora_int:02d}:00"
            else:
                info["hora"] = "00:00"  # Caso o valor esteja fora do intervalo
        except ValueError:
            info["hora"] = "00:00"  # Em caso de erro de conversão

    return info

if __name__ == "__main__":
    # Configura o reconhecedor de fala para reconhecer em português
    recognizer = sr.Recognizer()
    recognizer.energy_threshold = 4000

    # Executa a função para transcrever o áudio e armazena o resultado em uma variável
    transcrição = transcrever_audio()

    info = extrair_info(transcrição)
    print("Titulo:", info["título"])
    print("Data:", info["data"])
    print("Hora:", info["hora"])
    print("Local:", info["local"])
    
    # Salvar informações em um arquivo JSON
    with open("informacoes.json", "w") as json_file:
        json.dump(info, json_file, indent=4)
    
    #reproduzir_audio(info)
