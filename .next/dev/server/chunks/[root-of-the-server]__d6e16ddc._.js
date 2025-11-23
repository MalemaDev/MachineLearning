module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/ml-utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Utilidades para cargar y usar modelos de Machine Learning
 * En una aplicación real, usarías librerías como TensorFlow.js o ONNX
 */ // Simulación de loader de modelos
// En producción, integrarías con librerías como:
// - TensorFlow.js para modelos TF
// - ONNX Runtime para modelos ONNX
// - Python backend con FastAPI/Flask
__turbopack_context__.s([
    "loadModelMetrics",
    ()=>loadModelMetrics,
    "makeKMeansPrediction",
    ()=>makeKMeansPrediction,
    "makeKNNPrediction",
    ()=>makeKNNPrediction,
    "makeLogisticPrediction",
    ()=>makeLogisticPrediction
]);
const loadModelMetrics = async ()=>{
    try {
        const response = await fetch("/models/metrics.json");
        return await response.json();
    } catch (error) {
        console.error("Error loading metrics:", error);
        return null;
    }
};
const makeLogisticPrediction = (tenure, monthlyCharges, totalCharges, contractMonthly)=>{
    let probability = 0.5;
    // Lógica basada en patrones del dataset real
    if (tenure < 12 && contractMonthly === 1) {
        probability = 0.72;
    } else if (tenure > 48) {
        probability = 0.15;
    } else if (tenure < 6) {
        probability = 0.65;
    }
    if (monthlyCharges > 100) {
        probability += 0.1;
    } else if (monthlyCharges < 30) {
        probability -= 0.15;
    }
    // Normalizar
    probability = Math.max(0, Math.min(1, probability));
    return {
        prediction: probability > 0.5 ? "Churn" : "No Churn",
        probability,
        confidence: Math.abs(probability - 0.5) * 2,
        explanation: probability > 0.5 ? `Con ${(probability * 100).toFixed(1)}% de probabilidad, el cliente podría irse. Antigüedad: ${tenure} meses, Cargos: $${monthlyCharges}/mes` : `Baja probabilidad de churn (${(probability * 100).toFixed(1)}%). Cliente leal. Antigüedad: ${tenure} meses.`
    };
};
const makeKNNPrediction = (tenure, monthlyCharges, totalCharges)=>{
    // Simulación de búsqueda de vecinos cercanos
    const distance = Math.sqrt(Math.pow((tenure - 30) / 50, 2) + Math.pow((monthlyCharges - 70) / 100, 2));
    // Vecinos simulados basados en proximidad
    const neighbors = [];
    if (tenure < 12) {
        neighbors.push("Vecino 1: Churn = Sí", "Vecino 2: Churn = Sí", "Vecino 3: Churn = No");
    } else if (tenure > 48) {
        neighbors.push("Vecino 1: Churn = No", "Vecino 2: Churn = No", "Vecino 3: Churn = No");
    } else {
        neighbors.push("Vecino 1: Churn = No", "Vecino 2: Churn = Sí", "Vecino 3: Churn = No");
    }
    // Agregar 2 más
    neighbors.push("Vecino 4: Churn = No", "Vecino 5: Churn = No");
    const churnCount = neighbors.filter((n)=>n.includes("Sí")).length;
    const churn = churnCount > 2;
    return {
        churn,
        neighbors,
        distance: Math.round(distance * 100) / 100
    };
};
const makeKMeansPrediction = (balance, purchases, installments)=>{
    const descriptions = [
        "Clientes Premium: Alto gasto, muy activos. Estrategia: Retención VIP y productos premium.",
        "Clientes Estándar: Gasto moderado, perfil típico. Estrategia: Crecimiento y cross-selling.",
        "Clientes Emergentes: Bajo gasto, potencial de crecimiento. Estrategia: Incentivos e onboarding."
    ];
    const clusterSizes = [
        2100,
        3400,
        3500
    ];
    let cluster = 2 // Default: emergentes
    ;
    const totalSpend = balance + purchases + installments;
    if (purchases > 10000 && balance > 3000) {
        cluster = 0; // Premium
    } else if (purchases > 5000 && balance > 1500) {
        cluster = 1; // Estándar
    }
    const distance = Math.random() * 5;
    return {
        cluster,
        distance: Math.round(distance * 100) / 100,
        clusterSize: clusterSizes[cluster],
        description: descriptions[cluster]
    };
};
}),
"[project]/app/api/predict/kmeans/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ml$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ml-utils.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const data = await request.json();
        const { balance, purchases, installmentsPurchases } = data;
        if (balance === undefined || purchases === undefined || installmentsPurchases === undefined) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Faltan parámetros requeridos"
            }, {
                status: 400
            });
        }
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ml$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["makeKMeansPrediction"])(balance, purchases, installmentsPurchases);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            cluster: result.cluster,
            distance: result.distance,
            clusterSize: result.clusterSize,
            description: result.description
        });
    } catch (error) {
        console.error("Error en clustering K-Means:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Error al hacer el clustering"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d6e16ddc._.js.map