import os
import requests
import json
import re

# ==============================
# CONFIG
# ==============================
CARPETA_IMAGENES = "imagenes"
BASE_TXT_URL = "https://raw.githubusercontent.com/sharadTT/doraemon-gadgets/main/files/"

# ==============================
# LIMPIAR TEXTO
# ==============================
def limpiar_texto(texto):
    return re.sub(r'[^a-zA-Z0-9\s]', '', texto).strip()

# ==============================
# PROCESAR IMÁGENES
# ==============================
data = []

imagenes = os.listdir(CARPETA_IMAGENES)

for archivo in imagenes:
    if not archivo.endswith(".png"):
        continue

    nombre = archivo.replace(".png", "")

    # 🔥 FILTRO: solo números
    if not nombre.isdigit():
        print(f"⚠️ Ignorado: {archivo}")
        continue

    numero = int(nombre)

    txt_url = f"{BASE_TXT_URL}{numero}.txt"

    try:
        r = requests.get(txt_url, timeout=5)

        if r.status_code == 200:
            titulo = limpiar_texto(r.text)
        else:
            titulo = f"Gadget {numero}"

    except Exception as e:
        print(f"❌ Error en {numero}: {e}")
        titulo = f"Gadget {numero}"

    data.append({
        "id": numero,
        "title": titulo,
        "image": f"{CARPETA_IMAGENES}/{archivo}"
    })

    print(f"✔ {numero} → {titulo}")

# ==============================
# ORDENAR
# ==============================
data = sorted(data, key=lambda x: x["id"])

# ==============================
# GUARDAR JSON
# ==============================
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print("🎉 JSON generado correctamente")