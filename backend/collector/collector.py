import pandas as pd
from backend.storage.download_dataset import download_latest_dataset

class Collector:

    def __init__(self):

        csv_path = download_latest_dataset()

        if csv_path is None:
            raise FileNotFoundError(
                "Object Storage에 CSV가 없습니다."
            )

        self.df = pd.read_csv(csv_path)

        self.current_index = 0

        print("=" * 50)
        print("Collector Initialized")
        print("=" * 50)
        print(f"{len(self.df)} rows loaded.")

    def collect_batch(self, batch_size):

        if self.current_index >= len(self.df):
            self.current_index = 0

        batch = self.df.iloc[
            self.current_index:self.current_index+batch_size
        ].copy()

        self.current_index += batch_size

        return batch
