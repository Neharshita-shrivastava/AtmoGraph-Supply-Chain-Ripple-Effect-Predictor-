import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler, LabelEncoder
from sklearn.impute import SimpleImputer

# 1. Load Dataset
def load_data(file_path):
    df = pd.read_csv(file_path)
    print("Dataset Loaded Successfully")
    print("Shape:", df.shape)
    return df


# 2. Remove Duplicate Records
def remove_duplicates(df):
    df = df.drop_duplicates()
    return df


# 3. Handle Missing Values
def handle_missing_values(df):
    numerical_cols = df.select_dtypes(include=np.number).columns

    imputer = SimpleImputer(strategy="median")
    df[numerical_cols] = imputer.fit_transform(df[numerical_cols])

    return df


# 4. Handle Date and Time
def process_datetime(df):
    if "timestamp" in df.columns:
        df["timestamp"] = pd.to_datetime(
            df["timestamp"], errors="coerce"
        )
        df = df.dropna(subset=["timestamp"])

    return df


# 5. Normalize Numerical Features
def normalize_data(df):
    numerical_cols = df.select_dtypes(include=np.number).columns

    scaler = MinMaxScaler()
    df[numerical_cols] = scaler.fit_transform(df[numerical_cols])

    return df


# 6. Main Preprocessing Pipeline
def preprocess_data(file_path):
    df = load_data(file_path)

    df = remove_duplicates(df)
    df = process_datetime(df)
    df = handle_missing_values(df)
    df = normalize_data(df)

    print("Preprocessing Completed!")
    print(df.head())

    return df


# 7. Execute
if __name__ == "__main__":

    input_file = "data/atmospheric_data.csv"

    df = preprocess_data(input_file)

    df.to_csv(
        "data/processed_atmospheric_data.csv",
        index=False
    )

    print("Processed dataset saved successfully!")
