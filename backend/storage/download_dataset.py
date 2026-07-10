import os
from pathlib import Path

import oci
from dotenv import load_dotenv

load_dotenv()

config = oci.config.from_file()

client = oci.object_storage.ObjectStorageClient(config)

namespace = os.getenv("OCI_NAMESPACE")
bucket = os.getenv("OCI_BUCKET")

BASE_DIR = Path(__file__).resolve().parents[2]
DOWNLOAD_DIR = BASE_DIR / "dataset" / "raw"
DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)

OBJECT_NAME = "raw/UNSW_NB15_testing-set.csv"


def download_latest_dataset():

    filename = OBJECT_NAME.split("/")[-1]
    save_path = DOWNLOAD_DIR / filename

    response = client.get_object(
        namespace,
        bucket,
        OBJECT_NAME
    )

    with open(save_path, "wb") as f:
        for chunk in response.data.raw.stream(
            1024 * 1024,
            decode_content=False
        ):
            f.write(chunk)

    print(f"Downloaded : {save_path}")

    return save_path


if __name__ == "__main__":
    download_latest_dataset()