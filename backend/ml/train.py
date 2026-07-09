from pathlib import Path
import json
import pandas as pd
import joblib

from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

from backend.database.connection import get_connection

BASE_DIR = Path(__file__).resolve().parents[2]

TRAIN_PATH = BASE_DIR / "dataset" / "processed" / "train.csv"
MODEL_DIR = BASE_DIR / "model"
LOG_DIR = BASE_DIR / "logs"

MODEL_DIR.mkdir(exist_ok=True)
LOG_DIR.mkdir(exist_ok=True)

MODEL_PATH = MODEL_DIR / "random_forest.joblib"
ENCODER_PATH = MODEL_DIR / "category_maps.joblib"
ATTACK_ENCODER_PATH = MODEL_DIR / "attack_encoder.joblib"
FEATURE_PATH = MODEL_DIR / "feature_columns.joblib"

LOG_FILE = LOG_DIR / "training.log"

def write_log(message):

    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(message + "\n")

    print(message)

def load_dataset():

    print("="*50)
    print("Loading Dataset")
    print("="*50)

    df = pd.read_csv(TRAIN_PATH)

    print(df.shape)

    return df

def encode_dataset(df):

    category_maps = {}

    object_columns = df.select_dtypes(
        include=["object", "string"]
    ).columns

    for col in object_columns:

        if col == "attack_cat":
            continue

        unique_values = sorted(df[col].astype(str).unique())

        mapping = {
            value: idx
            for idx, value in enumerate(unique_values)
        }

        df[col] = (
            df[col]
            .astype(str)
            .map(mapping)
        )

        category_maps[col] = mapping

    attack_encoder = LabelEncoder()

    df["attack_cat"] = attack_encoder.fit_transform(df["attack_cat"])

    return df, category_maps, attack_encoder

def split_dataset(df):

    X = df.drop(columns=["attack_cat", "label"])

    y = df["attack_cat"]

    return train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42
    )

def train_model(X_train, y_train):

    model = RandomForestClassifier(

        n_estimators=100,

        random_state=42,

        n_jobs=-1

    )

    model.fit(X_train, y_train)

    return model

def evaluate_model(model, X_test, y_test):

    prediction = model.predict(X_test)

    accuracy = accuracy_score(y_test, prediction)

    print()

    print("Accuracy :", accuracy)

    print()

    print(classification_report(y_test, prediction))

    return accuracy

def save_model(model, category_maps, attack_encoder, columns):

    joblib.dump(model, MODEL_PATH)

    joblib.dump(category_maps, ENCODER_PATH)

    joblib.dump(attack_encoder, ATTACK_ENCODER_PATH)

    joblib.dump(columns, FEATURE_PATH)

    print("Model Saved")

def save_training_info(accuracy, rows):

    conn = get_connection()

    cursor = conn.cursor()

    sql = """
    INSERT INTO model_info
    (model_name, algorithm, accuracy, dataset_size)

    VALUES (%s,%s,%s,%s)
    """

    cursor.execute(

        sql,

        (

            "RandomForest_v1",

            "Random Forest",

            float(accuracy),

            int(rows)

        )

    )

    conn.commit()

    cursor.close()

    conn.close()

def main():
    write_log("=" * 50)
    write_log("TRAINING START")
    write_log("=" * 50)

    df = load_dataset()

    df, encoders, attack_encoder = encode_dataset(df)

    X_train, X_test, y_train, y_test = split_dataset(df)

    model = train_model(X_train, y_train)

    accuracy = evaluate_model(model, X_test, y_test)
    
    write_log(f"Dataset Size : {len(df)}")
    write_log(f"Accuracy : {accuracy:.4f}")

    save_model(

        model,

        encoders,

        attack_encoder,

        X_train.columns

    )
    write_log("Model Saved")

    save_training_info(

        accuracy,

        len(df)

    )

    print()

    print("Training Completed")
    write_log("Training Completed")

if __name__ == "__main__":

    main()


