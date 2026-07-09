import oci

config = oci.config.from_file()

object_storage = oci.object_storage.ObjectStorageClient(config)

namespace = object_storage.get_namespace().data

print(namespace)
