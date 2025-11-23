

import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report, roc_auc_score
)
import joblib
import json
import warnings
warnings.filterwarnings('ignore')

print("=" * 70)
print("ANÁLISIS DE PERFORMANCE DE MODELOS DE CLASIFICACIÓN")
print("=" * 70)

# Cargar y preparar dataset
print("\n1. PREPARACIÓN DE DATOS")
print("-" * 70)

df = pd.read_csv('datasets/telco_churn.csv')
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
df = df.dropna()

# Codificar variables
label_encoders = {}
for col in df.select_dtypes(include=['object']).columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

X = df.drop('Churn', axis=1)
y = df['Churn']

# Normalizar
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
)

print(f"Conjunto de entrenamiento: {len(X_train)} muestras")
print(f"Conjunto de prueba: {len(X_test)} muestras")

# Entrenar modelos
print("\n2. ENTRENAMIENTO DE MODELOS")
print("-" * 70)

models = {}

# Regresión Logística
print("Entrenando Regresión Logística...")
lr = LogisticRegression(max_iter=1000, random_state=42)
lr.fit(X_train, y_train)
models['Logistic Regression'] = lr

# KNN con diferentes k
for k in [3, 5, 7]:
    print(f"Entrenando KNN con k={k}...")
    knn = KNeighborsClassifier(n_neighbors=k)
    knn.fit(X_train, y_train)
    models[f'KNN (k={k})'] = knn

# Evaluar modelos
print("\n3. EVALUACIÓN DE MODELOS")
print("-" * 70)

results = []

for model_name, model in models.items():
    y_pred = model.predict(X_test)
    y_pred_proba = model.predict_proba(X_test)[:, 1] if hasattr(model, 'predict_proba') else y_pred

    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_pred_proba)

    results.append({
        'Model': model_name,
        'Accuracy': f'{acc:.4f}',
        'Precision': f'{prec:.4f}',
        'Recall': f'{rec:.4f}',
        'F1-Score': f'{f1:.4f}',
        'ROC-AUC': f'{auc:.4f}'
    })

    print(f"\n{model_name}:")
    print(f"  Accuracy:  {acc:.4f}")
    print(f"  Precision: {prec:.4f}")
    print(f"  Recall:    {rec:.4f}")
    print(f"  F1-Score:  {f1:.4f}")
    print(f"  ROC-AUC:   {auc:.4f}")

# Matriz de confusión del mejor modelo (Logistic Regression)
print("\n4. MATRIZ DE CONFUSIÓN - LOGISTIC REGRESSION")
print("-" * 70)

y_pred = models['Logistic Regression'].predict(X_test)
cm = confusion_matrix(y_test, y_pred)

print(f"Verdaderos Negativos (TN): {cm[0, 0]}")
print(f"Falsos Positivos (FP):     {cm[0, 1]}")
print(f"Falsos Negativos (FN):     {cm[1, 0]}")
print(f"Verdaderos Positivos (TP): {cm[1, 1]}")

# Reporte de clasificación
print("\n5. REPORTE DE CLASIFICACIÓN DETALLADO")
print("-" * 70)
print(classification_report(y_test, y_pred, target_names=['No Churn', 'Churn']))

# Guardar resultados
results_df = pd.DataFrame(results)
print("\n6. RESUMEN DE RESULTADOS")
print("-" * 70)
print(results_df.to_string(index=False))

print("\n" + "=" * 70)
print("ANÁLISIS COMPLETADO - MODELOS LISTOS PARA PRODUCCIÓN")
print("=" * 70)
