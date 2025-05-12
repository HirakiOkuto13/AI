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
import xgboost as xgb
import pickle

from pydantic import BaseModel, condecimal
# from decimal import Decimal

router = APIRouter()

@router.get("/create_model")
def create_model():
    ADP_df = pd.read_sql("SELECT * FROM adp_data", con = mydb)
    # print(ADP_df.columns)
 
    ohe = ADP_df

    ADP_df.drop(['id','Date'], axis = 1, inplace = True)
    # print(ADP_df.head(5))

    ADP_df.head(5).to_csv('adp_deploy.csv')

    X = ohe.drop(['AdjClose'], axis = "columns") 
    y = ohe['AdjClose']

    X = np.array(X)
    y = np.array(y)

    y = y.reshape(-1,1)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state=42)

    model_xgb = xgb.XGBRegressor(objective ='reg:squarederror', learning_rate = 0.1, max_depth = 2, n_estimators = 100)
    model_xgb.fit(X_train, y_train)

    y_predict = model_xgb.predict(X_test)
    y_predict.reshape(-1,1)
    # print(y_predict)

    with open('model_adp', 'wb') as files:
        pickle.dump(model_xgb, files)

    deploy_df = pd.read_csv("adp_deploy.csv")
    deploy_df = deploy_df.drop(['Unnamed: 0','AdjClose'], axis = 1)
    

    deploy_X = np.array(deploy_df)
    deploy_Y = model_xgb.predict(deploy_X)

    deploy_Y.reshape(-1,1)

    # print(deploy_df)
    # print(deploy_Y)

    return {"message": True, "data": deploy_Y.tolist()}

# Decimal = condecimal(max_digits=20, decimal_places=15)

class Item(BaseModel):
    High: str
    Low: str
    Open: str
    Close: str
    Volume: str

@router.post("/predict")
async def predict(item: Item):
    test_df = pd.DataFrame(data = {
        "High": [item.High],
        "Low": [item.Low],
        "Open": [item.Open],
        "Close": [item.Close],
        "Volume": [item.Volume]
    })

    deploy_df = pd.read_csv("adp_deploy.csv")

    nontransformed_df = pd.DataFrame(test_df)
    deploy_df = pd.concat([deploy_df , nontransformed_df])

    deploy_df = deploy_df.drop(columns = ['Unnamed: 0','AdjClose'])

    # print(test_df)

    deploy_X = np.array(deploy_df)
    
    with open('model_adp' , 'rb') as f:
        lr = pickle.load(f)

    deploy_Y = lr.predict(deploy_X)

    # print(deploy_Y.reshape(-1,1))

    data_list = deploy_Y.tolist()

    # print(data_list)
    # print(data_list[-1])
    return {"message": True, "AdjClose": data_list[-1]}