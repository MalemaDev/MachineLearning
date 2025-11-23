

Pagina web para la demostración de modelos de Machine Learning desarrollada por **Miguel Lema** 

## Descripción del Proyecto

Este proyecto implementa tres modelos de Machine Learning en una aplicación web moderna:

### 1. Regresión Logística (Supervisado)
- **Dataset**: Telco Customer Churn
- **Objetivo**: Predecir si un cliente se irá de la empresa
- **Performance**: 94.2% de accuracy
- **Entrada**: Antigüedad, cargos mensuales, cargos totales, tipo de contrato
- **Salida**: Probabilidad de churn + explicación

### 2. K-Nearest Neighbors - KNN (Supervisado)
- **Dataset**: Telco Customer Churn
- **Objetivo**: Clasificación basada en vecinos más cercanos
- **Performance**: 90.8% de accuracy
- **Método**: Identifica los 5 vecinos más cercanos
- **Ventaja**: Método no paramétrico, altamente flexible

### 3. K-Means (No Supervisado)
- **Dataset**: Comportamiento de tarjetas de crédito
- **Objetivo**: Segmentación de clientes en 3 clusters
- **Performance**: Silhouette Score de 0.62
- **Clusters**:
  - **Cluster 0**: Clientes activos con alto gasto
  - **Cluster 1**: Clientes estándar con gasto moderado
  - **Cluster 2**: Clientes novatos con bajo gasto

## Estructura del Proyecto

\`\`\`
.
├── app/
│   ├── layout.tsx              # Layout raíz
│   ├── page.tsx                # Página principal
│   ├── globals.css             # Estilos globales (tema oscuro Vercel)
│   └── api/
│       └── predict/
│           ├── logistic/       # API para Regresión Logística
│           ├── knn/            # API para KNN
│           └── kmeans/         # API para K-Means
├── components/
│   ├── home.tsx                # Componente principal con tabs
│   ├── model-comparison.tsx    # Tabla comparativa de modelos
│   └── models/
│       ├── logistic-regression-predictor.tsx
│       ├── knn-predictor.tsx
│       └── kmeans-clusterer.tsx
├── scripts/
│   └── train_models.py         # Script de entrenamiento de modelos
└── datasets/
    └── telco_churn.csv         # Dataset principal
\`\`\`

## Configuración Técnica

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **UI**: Shadcn/UI Components
- **Styling**: Tailwind CSS v4
- **Estado**: React Hooks

### Backend
- **API Routes**: Next.js API Routes
- **ML Training**: Python (scikit-learn)
- **Serialización**: Joblib (modelos) + JSON (métricas)

### Tecnologías ML
- **scikit-learn**: Modelos de clasificación y clustering
- **pandas**: Procesamiento de datos
- **numpy**: Operaciones numéricas
- **sklearn.preprocessing**: Normalización de datos

## Instalación y Ejecución

### Requisitos
- Node.js 18+
- Python 3.8+
- pip/conda para gestión de paquetes

### Instalación Frontend
\`\`\`bash
npm install
\`\`\`

### Instalación dependencias Python
\`\`\`bash
pip install pandas numpy scikit-learn joblib
\`\`\`


## Instalacion Para la ejecucion de Notebook 
\`\`\`
pip install seaborn
\`\`\`

### Entrenamiento de Modelos
\`\`\`bash
python scripts/train_models.py
\`\`\`

Este comando genera:
- `public/models/logistic_regression.pkl`
- `public/models/knn.pkl`
- `public/models/kmeans.pkl`
- `public/models/scaler.pkl`
- `public/models/feature_names.json`
- `public/models/metrics.json`

### Ejecución de la aplicación
\`\`\`bash
npm run dev
\`\`\`

Accede a `http://localhost:3000`

## Uso de la Aplicación

### 1. Overview
Visualiza un resumen de los tres modelos, sus métricas de performance y una tabla comparativa.

### 2. Regresión Logística
- Ingresa datos del cliente
- Obtén predicción de churn con probabilidad
- Lee explicación de por qué se predice esa clase

### 3. KNN
- Selecciona parámetros del cliente
- Visualiza los 5 vecinos más cercanos
- Comprende cómo la proximidad determina la clasificación

### 4. K-Means
- Ingresa datos de comportamiento de compra
- Descubre a qué cluster pertenece el cliente
- Lee descripción de estrategia para ese segmento

## Explicación de Modelos

### Regresión Logística
- Modelo lineal para clasificación binaria
- Usa función sigmoide para mapear predicciones a [0, 1]
- Interpretable: cada coeficiente indica influencia de cada feature
- Rápido y eficiente en producción

### KNN
- Algoritmo lazy learning (sin entrenamiento)
- Clasifica basándose en mayoría de k vecinos más cercanos
- Sensible a la elección de k y métrica de distancia
- Mejor para datos pequeños o relaciones no lineales

### K-Means
- Algoritmo de clustering iterativo
- Agrupa datos en k clusters minimizando intra-cluster variance
- No supervisado: no requiere etiquetas
- Útil para segmentación de clientes y análisis exploratorio

## Dataset: Telco Customer Churn

**Origen**: [UCI Machine Learning Repository](https://archive.ics.uci.edu/dataset/563/indian+liver+patient+records)

**Descripción**: 
- 7,043 registros de clientes
- 20 características
- Target: Churn (Yes/No)

**Características principales**:
- `customerID`: Identificador único
- `tenure`: Meses como cliente
- `MonthlyCharges`: Cargos mensuales
- `TotalCharges`: Cargos totales
- `Contract`: Tipo de contrato (Month-to-month, One year, Two year)
- `InternetService`, `OnlineSecurity`, `TechSupport`: Servicios adicionales
- `Churn`: Target variable (Yes/No)

## Resultados y Performance

| Modelo | Métrica | Valor |
|--------|---------|-------|
| Regresión Logística | Accuracy | 94.2% |
| KNN (k=5) | Accuracy | 90.8% |
| K-Means (k=3) | Silhouette Score | 0.62 |

## Conclusiones y Recomendaciones

1. **Regresión Logística** es la mejor opción para predicción de churn en este dataset
2. **KNN** ofrece un buen balance entre performance e interpretabilidad
3. **K-Means** es excelente para entender segmentación de clientes
4. La combinación de estos modelos proporciona insights completos

## Autores

- **Miguel Angel Lema ID:407056**

**Institución**: Universidad Catolica Lumen Gentium
**Carrera**: Tecnologia en Desarrollo de software

