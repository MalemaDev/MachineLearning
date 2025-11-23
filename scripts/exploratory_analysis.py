
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
import json

# Cargar dataset
print("=" * 60)
print("ANÁLISIS EXPLORATORIO - DATASET TELCO CUSTOMER CHURN")
print("=" * 60)

df = pd.read_csv('datasets/telco_churn.csv')

# Información básica
print("\n1. INFORMACIÓN GENERAL DEL DATASET")
print("-" * 60)
print(f"Número de registros: {len(df)}")
print(f"Número de columnas: {len(df.columns)}")
print(f"Memoria usada: {df.memory_usage().sum() / 1024:.2f} KB")

# Análisis del target
print("\n2. DISTRIBUCIÓN DE CHURN (TARGET)")
print("-" * 60)
churn_dist = df['Churn'].value_counts()
print(f"No Churn: {churn_dist['No']} ({churn_dist['No']/len(df)*100:.1f}%)")
print(f"Churn: {churn_dist['Yes']} ({churn_dist['Yes']/len(df)*100:.1f}%)")

# Datos faltantes
print("\n3. VALORES FALTANTES")
print("-" * 60)
missing = df.isnull().sum()
if missing.sum() == 0:
    print("No hay valores faltantes!")
else:
    print(missing[missing > 0])

# Tipos de datos
print("\n4. TIPOS DE DATOS")
print("-" * 60)
print(f"Numéricos: {df.select_dtypes(include=[np.number]).shape[1]}")
print(f"Categóricos: {df.select_dtypes(include=['object']).shape[1]}")

# Estadísticas descriptivas
print("\n5. ESTADÍSTICAS DESCRIPTIVAS")
print("-" * 60)
print(df.describe())

# Features categóricas
print("\n6. CARACTERÍSTICAS CATEGÓRICAS ÚNICAS")
print("-" * 60)
for col in df.select_dtypes(include=['object']).columns:
    if col != 'customerID':
        unique_vals = df[col].unique()
        print(f"{col}: {len(unique_vals)} valores")
        if len(unique_vals) <= 5:
            print(f"  Valores: {list(unique_vals)}")

print("\n" + "=" * 60)
print("ANÁLISIS COMPLETADO")
print("=" * 60)
