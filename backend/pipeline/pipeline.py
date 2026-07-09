from backend.collector.collector import Collector

from backend.ml.predict import (
    predict_dataset,
    save_prediction
)

from backend.database.queries import (
    insert_predictions,
    insert_notifications
)


class Pipeline:

    def __init__(self):

        self.collector = Collector()

    def run(self):

        print("=" * 50)
        print("Pipeline Started")
        print("=" * 50)

        batch = self.collector.collect_batch(batch_size=100)

        if batch is None:

            print("No more packets.")
            return False

        result = predict_dataset(batch)

        save_prediction(result)

        prediction_ids = insert_predictions(result)

        insert_notifications(
            prediction_ids,
            result
        )

        print(f"{len(result)} packets processed.")

        return True


def main():

    pipeline = Pipeline()

    while True:

        has_data = pipeline.run()

        if not has_data:
            break

    print()
    print("=" * 50)
    print("Pipeline Finished")
    print("=" * 50)


if __name__ == "__main__":

    main()
