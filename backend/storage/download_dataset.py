import oci
import os
from pathlib import Path
from dotenv import load_dotenv


# .env 로드
load_dotenv()


# OCI 설정
config = oci.config.from_file()


client = oci.object_storage.ObjectStorageClient(
    config
)


# 환경 변수
namespace = os.getenv("OCI_NAMESPACE")
bucket = os.getenv("OCI_BUCKET")


# 다운로드 대상
prefix = "raw/"


# 저장 위치
BASE_DIR = Path(__file__).resolve().parents[2]

download_dir = BASE_DIR / "dataset" / "raw"

download_dir.mkdir(
    parents=True,
    exist_ok=True
)


print(f"Download path : {download_dir}")


# Object 목록 조회
objects = client.list_objects(
    namespace,
    bucket,
    prefix=prefix
).data.objects


for obj in objects:

    object_name = obj.name

    # folder 제외
    if object_name.endswith("/"):
        continue


    filename = object_name.split("/")[-1]

    save_path = download_dir / filename


    print(f"Downloading : {object_name}")


    response = client.get_object(
        namespace,
        bucket,
        object_name
    )


    with open(save_path, "wb") as f:
        for chunk in response.data.raw.stream(
            1024 * 1024,
            decode_content=False
        ):
            f.write(chunk)


    print(f"Saved : {save_path}")


print("Download completed")
