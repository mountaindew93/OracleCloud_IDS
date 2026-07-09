from pathlib import Path

import joblib
import pandas as pd

from backend.database.queries import (
    insert_predictions,
    insert_notifications
)

BASE_DIR = Path(__file__).resolve().parents[2]

TEST_PATH = BASE_DIR / "dataset" / "processed" / "test.csv"

MODEL_PATH = BASE_DIR / "model" / "random_forest.joblib"
ENCODER_PATH = BASE_DIR / "model" / "category_maps.joblib"
ATTACK_ENCODER_PATH = BASE_DIR / "model" / "attack_encoder.joblib"
FEATURE_PATH = BASE_DIR / "model" / "feature_columns.joblib"

OUTPUT_PATH = BASE_DIR / "dataset" / "processed" / "predictions.csv"


def load_dataset():

    print("=" * 50)
    print("Loading Test Dataset")
    print("=" * 50)

    return pd.read_csv(TEST_PATH)


def load_model():

    model = joblib.load(MODEL_PATH)

    category_maps = joblib.load(ENCODER_PATH)

    attack_encoder = joblib.load(ATTACK_ENCODER_PATH)

    feature_columns = joblib.load(FEATURE_PATH)

    return model, category_maps, attack_encoder, feature_columns


def preprocess(df, category_maps):

    df = df.copy()

    for col, mapping in category_maps.items():

        df[col] = (
            df[col]
            .astype(str)
            .map(mapping)
            .fillna(-1)
            .astype(int)
        )

    return df


def predict(model, attack_encoder, feature_columns, df):

    X = df[feature_columns]

    prediction = model.predict(X)

    probability = model.predict_proba(X)

    confidence = probability.max(axis=1)

    attack = attack_encoder.inverse_transform(prediction)

    result = df.copy()

    result["predicted_attack"] = attack
    result["confidence"] = confidence

    return result


def predict_dataset(df):
    """
    Pipeline에서 호출하는 함수
    """

    model, category_maps, attack_encoder, feature_columns = load_model()

    df = preprocess(df, category_maps)

    df = predict(
        model,
        attack_encoder,
        feature_columns,
        df
    )

    return df


def save_prediction(df):

    df.to_csv(
        OUTPUT_PATH,
        index=False
    )

    print()
    print("Prediction Saved")
    print(OUTPUT_PATH)


def main():

    df = load_dataset()

    model, category_maps, attack_encoder, feature_columns = load_model()

    df = preprocess(df, category_maps)

    result = predict(
        model,
        attack_encoder,
        feature_columns,
        df
    )

    save_prediction(result)

    prediction_ids = insert_predictions(result)

    insert_notifications(
        prediction_ids,
        result
    )


if __name__ == "__main__":

    main()
