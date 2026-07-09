from pathlib import Path

import pandas as pd

BASE_DIR = Path(__file__).resolve().parents[2]

TEST_DATA = BASE_DIR / "dataset" / "processed" / "test.csv"


class Collector:

    def __init__(self):

        self.df = pd.read_csv(TEST_DATA)

        self.current_index = 0

        print("=" * 50)
        print("Collector Initialized")
        print("=" * 50)
        print(f"{len(self.df)} rows loaded.")

    def collect_batch(self, batch_size=100):

        if self.current_index >= len(self.df):

            return None

        start = self.current_index

        end = min(start + batch_size, len(self.df))

        self.current_index = end

        return self.df.iloc[start:end].copy()
