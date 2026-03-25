import os
import json
import time
import requests
import re

from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service

# ==============================
# CONFIG
# ==============================
BASE_IMG_URL = "https://raw.githubusercontent.com/sharadTT/doraemon-gadgets/main/images/gadget-images/"
os.makedirs("imagenes", exist_ok=True)

# ==============================
# SELENIUM
# ==============================
options = webdriver.ChromeOptions()
# 🔥 prueba sin headless si falla
# options.add_argument("--headless")

driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=options
)

driver.get("https://sharadtt.github.io/doraemon-gadgets/")
time.sleep(3)

# ==============================
# SCROLL REAL (CLAVE 🔥)
# ==============================
last_count = 0

for _ in range(50):  # varias pasadas
    driver.execute_script("window.scrollBy(0, 600);")  # scroll corto
    time.sleep(1.5)

    cards = driver.find_elements(By.CSS_SELECTOR, ".gadgetCard")
    current_count = len(cards)

    print(f"Cards cargadas: {current_count}")

    if current_count == last_count:
        break

    last_count = current_count

# 🔥 EXTRA scroll final
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(3)

# ==============================
# EXTRAER TITULOS
# ==============================
cards = driver.find_elements(By.CSS_SELECTOR, ".gadgetCard")

titulos = []

for card in cards:
    try:
        t = card.find_element(By.TAG_NAME, "p").text.strip()
        if t:
            titulos.append(t)
    except:
        pass

driver.quit()

print(f"Títulos reales: {len(titulos)}")

# ==============================
# LIMPIAR
# ==============================
def limpiar(texto):
    return re.sub(r'[^a-zA-Z0-9]', '_', texto).lower()

# ==============================
# DESCARGA
# ==============================
data = []

for i in range(1, 300):
    img_url = f"{BASE_IMG_URL}{i}.png"

    r = requests.get(img_url)

    if r.status_code != 200:
        print("Fin en:", i)
        break

    title = titulos[i-1] if i-1 < len(titulos) else f"gadget_{i}"

    image_name = limpiar(title) + ".png"

    with open(f"imagenes/{image_name}", "wb") as f:
        f.write(r.content)

    data.append({
        "title": title,
        "image_name": image_name,
        "image_url": img_url
    })

    print(f"✔ {title}")

# ==============================
# JSON
# ==============================
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print("🎉 LISTO")