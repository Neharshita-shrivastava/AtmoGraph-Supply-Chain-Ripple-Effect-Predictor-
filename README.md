# AtmoGraph-Supply-Chain-Ripple-Effect-Predictor-
AI-powered Supply Chain Disruption and Ripple Effect Prediction System

An AI-powered supply chain monitoring and ripple effect prediction system designed for the Electronics Manufacturing Industry.

## 1. Overview

AtmoGraph is an intelligent supply chain prediction system that aims to identify, analyze, and predict the impact of disruptions across interconnected electronics supply chains.

The system focuses on understanding how a disruption at one supplier, manufacturer, or logistics point can affect other businesses throughout the supply chain.

For example, a semiconductor shortage in Taiwan can affect chip suppliers, smartphone manufacturers, distributors, and retailers across different countries.

AtmoGraph aims to visualize these dependencies and predict potential risks using Natural Language Processing (NLP), Graph Databases, and Graph Neural Networks (GNN).

## 2. Problem Statement

Traditional supply chain monitoring systems often analyze businesses and historical data independently.

However, global electronics supply chains are highly interconnected.

A disruption in one location can create unexpected consequences across multiple suppliers, manufacturers, and distributors.

AtmoGraph aims to address this challenge by modeling supply chain relationships and predicting the potential ripple effects of disruptions.

## 3. Project Objectives

- Build an interconnected electronics supply chain network.
- Store supplier and manufacturer relationships using a graph database.
- Extract disruption-related information from news articles.
- Identify affected companies and supply chain entities.
- Predict potential disruption risks using Graph Neural Networks.
- Visualize supply chain dependencies through an interactive dashboard.

## 4. Electronics Industry Use Case

The initial implementation focuses on the smartphone manufacturing supply chain.

Example components:

- Semiconductors
- Batteries
- Display panels
- Camera sensors
- Raw materials

Example supply chain:

Raw Material Suppliers → Component Manufacturers → Smartphone Manufacturer → Distributors → Retailers → Customers

A disruption affecting semiconductor supply may impact multiple downstream businesses.

## 5. Key Modules

### Module 1: Graph Database
Technology: Neo4j

- Store suppliers, manufacturers, distributors, and retailers.
- Define relationships between supply chain entities.
- Identify connected businesses and dependencies.

### Module 2: NLP Ingestion Engine
Technology: Python, spaCy, Hugging Face

- Collect disruption-related news.
- Process and analyze text.
- Perform Named Entity Recognition (NER).
- Extract companies, locations, industries, and disruption events.
- Update relevant supply chain information.

### Module 3: Graph Neural Network
Technology: PyTorch, PyTorch Geometric

- Learn relationships between interconnected supply chain entities.
- Analyze potential disruption propagation.
- Predict risk levels and potential downstream impacts.

### Module 4: Interactive Dashboard
Technology: React, D3.js / React Flow

- Visualize the electronics supply chain.
- Display interconnected businesses.
- Highlight potentially affected entities.
- Show predicted disruption risks.

## 6. Technology Stack

| Component | Technology |

| Programming Language | Python |
| Backend | FastAPI |
| Graph Database | Neo4j |
| NLP | spaCy, Hugging Face |
| Machine Learning | PyTorch |
| Graph Learning | PyTorch Geometric |
| Frontend | React.js |
| Visualization | D3.js / React Flow |
| Version Control | Git & GitHub |

## 7. Project Structure
AtmoGraph/
│
├── backend/
├── frontend/
├── data/
│   ├── raw/
│   └── processed/
│
├── notebooks/
├── scripts/
├── tests/
│
├── requirements.txt
├── .gitignore
└── README.md
