from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()

# Serve all static files (like JS, CSS, images) from the project root or 'src'
app.mount("/src", StaticFiles(directory="src"), name="src")
app.mount("/static", StaticFiles(directory="static"), name="static")

# Root route to serve your Figma UI
@app.get("/")
async def serve_frontend():
    index_path = os.path.join(os.getcwd(), "index.html")
    return FileResponse(index_path)

# Optional API route (if you want to keep backend)
@app.get("/api/hello")
def say_hello():
    return {"message": "Backend connected successfully!"}


