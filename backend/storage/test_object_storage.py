from backend.storage.object_storage import ObjectStorageManager

storage = ObjectStorageManager()

objects = storage.list_objects("raw/")

print("=== Object List ===")

for obj in objects:
    print(obj.name)
