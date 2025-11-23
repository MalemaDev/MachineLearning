
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.cluster import KMeans
from sklearn.metrics import accuracy_score, confusion_matrix, silhouette_score
import json
import joblib
import warnings
warnings.filterwarnings('ignore')

# ===== 1. CARGAR Y PROCESAR DATASET TELCO =====
print("Cargando dataset Telco Customer Churn...")
telco_df = pd.read_csv('datasets/telco_churn.csv')

# Eliminar valores faltantes
telco_df['TotalCharges'] = pd.to_numeric(telco_df['TotalCharges'], errors='coerce')
telco_df = telco_df.dropna()

# Codificar variables categóricas
label_encoders = {}
categorical_cols = telco_df.select_dtypes(include=['object']).columns

for col in categorical_cols:
    le = LabelEncoder()
    telco_df[col] = le.fit_transform(telco_df[col])
    label_encoders[col] = le

# Separar X y y
X_telco = telco_df.drop('Churn', axis=1)
y_telco = telco_df['Churn']

# Normalizar features
scaler_telco = StandardScaler()
X_telco_scaled = scaler_telco.fit_transform(X_telco)

# Split train/test
X_train_telco, X_test_telco, y_train_telco, y_test_telco = train_test_split(
    X_telco_scaled, y_telco, test_size=0.2, random_state=42
)

# ===== 2. ENTRENAR REGRESIÓN LOGÍSTICA =====
print("\nEntrenando Regresión Logística...")
lr_model = LogisticRegression(max_iter=1000, random_state=42)
lr_model.fit(X_train_telco, y_train_telco)
lr_pred = lr_model.predict(X_test_telco)
lr_accuracy = accuracy_score(y_test_telco, lr_pred)
print(f"Regresión Logística - Accuracy: {lr_accuracy:.4f}")

# ===== 3. ENTRENAR KNN =====
print("Entrenando KNN...")
knn_model = KNeighborsClassifier(n_neighbors=5)
knn_model.fit(X_train_telco, y_train_telco)
knn_pred = knn_model.predict(X_test_telco)
knn_accuracy = accuracy_score(y_test_telco, knn_pred)
print(f"KNN - Accuracy: {knn_accuracy:.4f}")

# ===== 4. ENTRENAR K-MEANS (simulado con datos Telco) =====
print("\nEntrenando K-Means...")
kmeans_model = KMeans(n_clusters=3, random_state=42, n_init=10)
kmeans_labels = kmeans_model.fit_predict(X_telco_scaled)
silhouette_avg = silhouette_score(X_telco_scaled, kmeans_labels)
print(f"K-Means - Silhouette Score: {silhouette_avg:.4f}")

# ===== 5. GUARDAR MODELOS Y SCALER =====
print("\nGuardando modelos...")
joblib.dump(lr_model, 'public/models/logistic_regression.pkl')
joblib.dump(knn_model, 'public/models/knn.pkl')
joblib.dump(kmeans_model, 'public/models/kmeans.pkl')
joblib.dump(scaler_telco, 'public/models/scaler.pkl')

# Guardar feature names
feature_names = X_telco.columns.tolist()
with open('public/models/feature_names.json', 'w') as f:
    json.dump(feature_names, f)

# ===== 6. GUARDAR MÉTRICAS =====
metrics = {
    "logistic_regression": {
        "accuracy": float(lr_accuracy),
        "model_type": "Clasificación Binaria",
        "description": "Predice si un cliente se irá de la empresa"
    },
    "knn": {
        "accuracy": float(knn_accuracy),
        "model_type": "Clasificación Binaria",
        "description": "KNN para predicción de Churn"
    },
    "kmeans": {
        "silhouette_score": float(silhouette_avg),
        "n_clusters": 3,
        "model_type": "Clustering No Supervisado",
        "description": "Segmentación de clientes en 3 clusters"
    }
}

with open('public/models/metrics.json', 'w') as f:
    json.dump(metrics, f, indent=2)

print("\nModelos guardados exitosamente!")
print("Archivos generados:")
print("- logistic_regression.pkl")
print("- knn.pkl")
print("- kmeans.pkl")
print("- scaler.pkl")
print("- feature_names.json")
print("- metrics.json")
