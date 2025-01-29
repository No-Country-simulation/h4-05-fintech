from fastapi import FastAPI, HTTPException # type: ignore
from pydantic import BaseModel # type: ignore
import joblib
from pathlib import Path
from recommendation import get_recommendations

# Cargar el modelo entrenado
cwd = Path.cwd()
path = (cwd / ".." / "notebooks" / "modeling" / "modelo_riesgo.pkl").resolve()

model = joblib.load(str(path))

# Diccionarios de mapeo (texto -> número)
mapeo_objetivo_financiero = {
    "Libertad financiera": 0,
    "Ingresos adicionales": 1,
    "Jubilacion": 2,
    "Vacaciones": 3,
    "Compra de vivienda": 4,
    "Imprevistos": 5,
    "Proyectos a largo plazo": 6,
    "Otros": 7
}

mapeo_horizonte_tiempo = {
    "Corto plazo": 0,
    "Mediano plazo": 1,
    "Largo plazo": 2
}

mapeo_conocimiento_inversiones = {
    "No tengo idea": 0,
    "Me suena pero no estoy seguro": 1,
    "Se como funcionan": 2,
    "Invierto de forma regular": 3
}

mapeo_formacion = {
    "Certificado profesional": 0,
    "Tecnico o tecnologo": 1,
    "Carrera profesional": 2,
    "No tengo formación": 3
}

mapeo_instrumentos = {
    "Acciones": 0,
    "Cedears": 1,
    "Bonos": 2,
    "ETFs": 3
}

mapeo_reaccion_perdida = {
    "Venderia todo": 0,
    "Mantendria la inversion": 1,
    "Compraria mas": 2
}

mapeo_fuente_ingresos = {
    "Salario": 0,
    "Independiente": 1,
    "Inversiones": 2,
    "Ahorros": 3,
    "Jubilacion":4,
    "Herencia": 5
}

mapeo_ingresos_mensuales = {
    "Menos de 279718": 0,
    "Entre 280000 y 1400000": 1,
    "Mas de 1400000": 2
}

mapeo_gastos_mensuales = {
    "Menos del 30% de tus ingresos": 0,
    "Entre 30% y 60% de tus ingresos": 1,
    "Mas del 60% de tus ingresos": 2
}


'''
mapeo_rango_ahorros = {
    "Entre 0% y 30%": 0,
    "Entre 30% y 60%": 1,
    "Mas del 60%": 2
}
'''

# Definir la estructura de los datos de entrada
class UserData(BaseModel):
    objetivo_financiero: str
    horizonte_tiempo: str
    conocimiento_inversiones: str
    formacion: str
    instrumentos_invertidos: list
    reaccion_perdida: str
    fuente_ingresos: str
    ingresos_mensuales: str
    gastos_mensuales: str
    rango_ahorros: str

class UserDataForRecommendatios(BaseModel):
    income_source: str
    target_period: str
    expenses_average: str
    risk_tolerance: str

# Crear la aplicación FastAPI
app = FastAPI()

# Endpoint raíz
@app.get('/')
def read_root():
    return {"message": "Bienvenido a la API de perfil de riesgo. Usa el endpoint /predict para hacer predicciones."}

# Definir el endpoint para hacer predicciones
@app.post('/predict')
def predict(data: UserData):
    try:
         # Convertir las respuestas de texto a números
        objetivo_financiero = mapeo_objetivo_financiero[data.objetivo_financiero]
        horizonte_tiempo = mapeo_horizonte_tiempo[data.horizonte_tiempo]
        conocimiento_inversiones = mapeo_conocimiento_inversiones[data.conocimiento_inversiones]
        formacion = mapeo_formacion[data.formacion]
        reaccion_perdida = mapeo_reaccion_perdida[data.reaccion_perdida]
        fuente_ingresos = mapeo_fuente_ingresos[data.fuente_ingresos]
        ingresos_mensuales = mapeo_ingresos_mensuales[data.ingresos_mensuales]
        gastos_mensuales = mapeo_gastos_mensuales[data.gastos_mensuales]
        # rango_ahorros = mapeo_rango_ahorros[data.rango_ahorros]
        
        # Convertir la lista de instrumentos invertidos
        instrumentos_invertidos = [mapeo_instrumentos[inst] for inst in data.instrumentos_invertidos]
        
         # Crear la lista de características para el modelo
        features = [
            objetivo_financiero,
            horizonte_tiempo,
            conocimiento_inversiones,
            formacion,
            len(instrumentos_invertidos),  # Número de instrumentos invertidos
            reaccion_perdida,
            fuente_ingresos,
            ingresos_mensuales,
            gastos_mensuales,
            # rango_ahorros
        ]
        
        # Hacer la predicción
        prediction = model.predict([features])
        
        # Devolver la predicción como respuesta
        return {'prediccion': prediction[0]}
    
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Opción no válida: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))