# AI Water Quality and Stock Price Prediction System

A full-stack application that provides machine learning models for water quality classification and stock price prediction.

## Project Structure

- `fastapi-crud/` - FastAPI backend service
- `frontend/` - Frontend application
- `node_data/` - Node.js middleware service
- `train_models/` - ML model training and deployment

## Setup

### Prerequisites

- Python 3.10+
- Node.js
- MySQL database
- pip and npm package managers

### Database Configuration

The system uses MySQL with the following connection:
```
Host: localhost
User: root
Port: 3306
Database: water
```

### Installation

1. Install Python dependencies:
```sh
pip install fastapi uvicorn pandas numpy scikit-learn xgboost pymysql python-dotenv
```

2. Install Node.js dependencies:
```sh
cd node_data
npm install
```

## Services

### ML Training Service (Port 8000)
```sh
cd train_models
uvicorn main:app --reload
```

### Node.js Service (Port 3001)
```sh
cd node_data
node index.js
```

## API Endpoints

### ML Model Training
- `/create_model` - Train stock price prediction model
- `/create_model2` - Train water quality classification model

### Predictions
- `/predict` - Get stock price predictions
- `/predict2` - Get water quality predictions

### Data Management
- `/admin` - CRUD operations for stock data
- `/adddata` - Add new stock data records

## Models

1. Stock Price Prediction
- Uses XGBoost Regressor
- Features: High, Low, Open, Close, Volume
- Target: AdjClose

2. Water Quality Classification  
- Uses Random Forest Classifier
- Features: pH, Hardness, Solids, Chloramines, Sulfate, etc.
- Target: Potability
