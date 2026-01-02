from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pathlib import Path
from .bias_detector import detect_bias

app = FastAPI(
    title="BiasScope",
    description="Detector de Viés Linguístico em Textos de IA",
    version="2.0.0"
)

# Get the directory of the current file
BASE_DIR = Path(__file__).resolve().parent

# Mount static files
app.mount("/static", StaticFiles(directory=str(BASE_DIR / "static")), name="static")

# Setup templates
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Serve the main web interface"""
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/analyze")
def analyze_text(data: dict):
    """Analyze text for linguistic bias"""
    return detect_bias(data["text"])
