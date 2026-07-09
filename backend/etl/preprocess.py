from pathlib import Path
from datetime import datetime
import pandas as pd

# ===============================
# 프로젝트 경로
# ===============================

BASE_DIR = Path(__file__).resolve().parents[2]

RAW_DIR = BASE_DIR / "dataset" / "raw"
PROCESSED_DIR = BASE_DIR / "dataset" / "processed"
LOG_DIR = BASE_DIR / "logs"

PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
LOG_DIR.mkdir(parents=True, exist_ok=True)

LOG_FILE = LOG_DIR / "etl.log"

# ===============================
# 사용할 데이터
# ===============================

datasets = {
    "train": RAW_DIR / "UNSW_NB15_training-set.csv",
    "test": RAW_DIR / "UNSW_NB15_testing-set.csv"
}


# ===============================
# 로그 함수
# ===============================

def write_log(message):

    time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with open(LOG_FILE, "a") as f:
        f.write(f"[{time}] {message}\n")


print("=" * 60)
print("UNSW-NB15 ETL START")
print("=" * 60)

write_log("=" * 50)
write_log("ETL START")


# ===============================
# ETL
# ===============================

for name, file in datasets.items():

    print(f"\nProcessing : {name}")

    write_log(f"Dataset : {name}")

    df = pd.read_csv(
        file,
        low_memory=False
    )

    print(f"Rows : {len(df)}")
    print(f"Columns : {len(df.columns)}")

    write_log(f"Rows : {len(df)}")
    write_log(f"Columns : {len(df.columns)}")

    # ---------------------------
    # Missing Values
    # ---------------------------

    missing = df.isnull().sum().sum()

    print(f"Missing : {missing}")

    write_log(f"Missing : {missing}")

    # ---------------------------
    # Duplicate
    # ---------------------------

    before = len(df)

    df.drop_duplicates(inplace=True)

    after = len(df)

    removed = before - after

    print(f"Duplicates Removed : {removed}")

    write_log(f"Duplicates Removed : {removed}")

    # ---------------------------
    # Fill Missing
    # ---------------------------

    df.fillna(0, inplace=True)

    # ---------------------------
    # Remove id column
    # ---------------------------

    if "id" in df.columns:

        df.drop(columns=["id"], inplace=True)

        print("Removed column : id")

        write_log("Removed column : id")

    # ---------------------------
    # Save
    # ---------------------------

    save_path = PROCESSED_DIR / f"{name}.csv"

    df.to_csv(
        save_path,
        index=False
    )

    print(f"Saved : {save_path}")

    write_log(f"Saved : {save_path}")

print("\nETL Completed!")

write_log("ETL Completed")
write_log("=" * 50)

# ===============================
# Feature 목록 저장
# ===============================

FEATURE_DIR = BASE_DIR / "dataset" / "features"
FEATURE_DIR.mkdir(parents=True, exist_ok=True)

feature_file = FEATURE_DIR / "feature_columns.txt"

with open(feature_file, "w") as f:
    for col in df.columns:
        f.write(col + "\n")

print("Feature list saved.")
write_log("Feature list saved.")
