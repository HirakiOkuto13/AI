from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from database import mycursor, mydb
import pandas as pd

import numpy as np # Multi-dimensional array manipulation
from seaborn import load_dataset
from sklearn import metrics
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import pickle

from pydantic import BaseModel

router = APIRouter()

@router.get("/create_model2")
def create_model():
    # ดึงข้อมูลมาแต่ ค่า NaN กลายเป็น 0
    water_df = pd.read_sql("SELECT CAST(ph as DOUBLE(20,14)) as ph, CAST(Hardness as DOUBLE(20,14)) as Hardness, CAST(Solids as DOUBLE(20,14)) as Solids, CAST(Chloramines as DOUBLE(20,14)) as Chloramines, CAST(Sulfate as DOUBLE(20,14)) as Sulfate, CAST(Conductivity as DOUBLE(20,14)) as Conductivity, CAST(Organic_carbon as DOUBLE(20,14)) as Organic_carbon, CAST(Trihalomethanes as DOUBLE(20,14)) as Trihalomethanes, CAST(Turbidity as DOUBLE(20,14)) as Turbidity, Potability  FROM water_potability", con = mydb)
    # print(water_df.columns)

    ohe = water_df

    # print(water_df.tail(5))

    water_df.tail(5).to_csv('water_deploy.csv')

    X = ohe.drop(['Potability'], axis = "columns") 
    y = ohe['Potability']

    X = np.array(X)
    y = np.array(y)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state=42)

    model_rf = RandomForestClassifier()
    model_rf.fit(X_train, y_train)

    y_predict = model_rf.predict(X_test)

    with open('model_water', 'wb') as files:
        pickle.dump(model_rf, files)

    deploy_df = pd.read_csv("water_deploy.csv")
    deploy_df = deploy_df.drop(['Unnamed: 0','Potability'], axis = 1)

    deploy_X = np.array(deploy_df)
    deploy_Y = model_rf.predict(deploy_X)

    deploy_Y.reshape(-1,1)

    return {"message": True, "data": deploy_Y.tolist()}

class Item(BaseModel):
    ph: float
    Hardness: float
    Solids: float
    Chloramines: float
    Sulfate: float
    Conductivity: float
    Organic_carbon: float
    Trihalomethanes: float
    Turbidity: float

@router.post("/predict2")
async def predict(item: Item):
    test_df = pd.DataFrame(data = {
        "ph": [item.ph],
        "Hardness": [item.Hardness],
        "Solids": [item.Solids],
        "Chloramines": [item.Chloramines],
        "Sulfate": [item.Sulfate],
        "Conductivity": [item.Conductivity],
        "Organic_carbon": [item.Organic_carbon],
        "Trihalomethanes": [item.Trihalomethanes],
        "Turbidity": [item.Turbidity]
    })

    deploy_df = pd.read_csv("water_deploy.csv")

    nontransformed_df = pd.DataFrame(test_df)
    deploy_df = deploy_df.append(nontransformed_df)

    deploy_df = deploy_df.drop(columns = ['Unnamed: 0','Potability'])

    deploy_X = np.array(deploy_df)
    
    with open('model_water' , 'rb') as f:
        lr = pickle.load(f)

    deploy_Y = lr.predict(deploy_X)

    # print(deploy_Y.reshape(-1,1))

    data_list = deploy_Y.tolist()

    # print(data_list[-1])

    return {"message": True, "Potability": data_list[-1]}