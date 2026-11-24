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
    print("Shape of Processed Dataset:", df.shape)
import networkx as nx
import matplotlib.pyplot as plt

# Create supply chain graph
G = nx.DiGraph()

# Add suppliers and companies
G.add_edges_from([
    ("Supplier A", "Factory"),
    ("Supplier B", "Factory"),
    ("Factory", "Warehouse"),
    ("Warehouse", "Retailer"),
    ("Retailer", "Customer")
])

# Calculate node risk
risk_scores = {
    "Supplier A": 0.8,
    "Supplier B": 0.3,
    "Factory": 0.5,
    "Warehouse": 0.2,
    "Retailer": 0.1,
    "Customer": 0.0
}

# Display risk scores
print("ATMO GRAPH - SUPPLY CHAIN RISK ANALYSIS")
print("-" * 45)

for node, risk in risk_scores.items():
    print(f"{node}: {risk * 100:.0f}% Risk")

# Visualize supply chain
plt.figure(figsize=(10, 6))

pos = nx.spring_layout(G, seed=42)

nx.draw(
    G,
    pos,
    with_labels=True,
    node_color="skyblue",
    node_size=2500,
    font_size=9,
    arrows=True
)

plt.title("AtmoGraph - Supply Chain Network")
plt.show()
