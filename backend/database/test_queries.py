from backend.database.queries import *

prediction_id = insert_prediction(

    source_file="test.csv",

    predicted_attack="DoS",

    prediction="Attack",

    confidence=0.98,

    model_version="RandomForest_v1"

)

insert_notification(

    prediction_id,

    "DoS",

    0.98

)

print(get_recent_predictions())

print(get_attack_statistics())
