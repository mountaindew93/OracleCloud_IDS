import oci
from backend.utils.config import (
    OCI_NAMESPACE,
    OCI_BUCKET,
    OCI_CONFIG_FILE,
    OCI_PROFILE
)


class ObjectStorageManager:
    def __init__(self):
        config = oci.config.from_file(
            OCI_CONFIG_FILE,
            OCI_PROFILE
        )

        self.client = oci.object_storage.ObjectStorageClient(config)

        self.namespace = OCI_NAMESPACE
        self.bucket = OCI_BUCKET

    def list_objects(self, prefix=""):
        response = self.client.list_objects(
            self.namespace,
            self.bucket,
            prefix=prefix
        )

        return response.data.objects

    def download_object(self, object_name):
        return self.client.get_object(
            self.namespace,
            self.bucket,
            object_name
        )

    def upload_object(self, object_name, file_path):
        with open(file_path, "rb") as f:
            self.client.put_object(
                self.namespace,
                self.bucket,
                object_name,
                f
            )
