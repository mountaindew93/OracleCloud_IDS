import time

from backend.pipeline.pipeline import Pipeline


def main():

    pipeline = Pipeline()

    print("=" * 50)
    print("Scheduler Started")
    print("=" * 50)

    while True:

        try:

            has_data = pipeline.run()

            if not has_data:

                print()
                print("=" * 50)
                print("No more packets.")
                print("Scheduler Finished.")
                print("=" * 50)
                break

        except Exception as e:

            print(f"Pipeline Error: {e}")

        print()
        print("Waiting 5 seconds...")
        print()

        time.sleep(5)


if __name__ == "__main__":

    main()
