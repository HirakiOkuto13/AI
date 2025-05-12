import sys
sys.path.insert(0,'./api')

from fastapi import FastAPI
import train
import train2

app = FastAPI()

app.include_router(train.router)
app.include_router(train2.router)

@app.get('/')
def root_api():
    return {"message": "Welcome to AI Training"}