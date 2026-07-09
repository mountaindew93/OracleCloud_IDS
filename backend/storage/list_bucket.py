import oci
from dotenv import load_dotenv
import os


load_dotenv()


config = oci.config.from_file()


client = oci.object_storage.ObjectStorageClient(
    config
)


namespace = os.getenv(
    "OCI_NAMESPACE"
)

bucket = os.getenv(
    "OCI_BUCKET"
)


objects = client.list_objects(
    namespace,
    bucket
).data.objects


for obj in objects:
    print(obj.name)
