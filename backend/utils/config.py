import os
from dotenv import load_dotenv

load_dotenv()

# MySQL
DB_HOST = os.getenv("DB_HOST")
DB_PORT = int(os.getenv("DB_PORT"))
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

# OCI Object Storage
OCI_NAMESPACE = os.getenv("OCI_NAMESPACE")
OCI_BUCKET = os.getenv("OCI_BUCKET")
OCI_REGION = os.getenv("OCI_REGION")

# Dataset
RAW_DATASET = os.getenv("RAW_DATASET")
PROCESSED_DATASET = os.getenv("PROCESSED_DATASET")
FEATURE_DATASET = os.getenv("FEATURE_DATASET")

# Model
MODEL_PATH = os.getenv("MODEL_PATH")
SCALER_PATH = os.getenv("SCALER_PATH")
LABEL_ENCODER_PATH = os.getenv("LABEL_ENCODER_PATH")

# Log
LOG_PATH = "logs"
