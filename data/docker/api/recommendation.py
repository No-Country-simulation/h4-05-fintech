from pydantic import BaseModel # type: ignore

class ForRecommendations(BaseModel):
    income_source: str
    target_period: str
    expenses_average: str
    risk_tolerance: str

investment_options = {
    "CDEARS": {"income_source": ["SALARIO", "Ambos"], "target_period": ["Corto plazo"], "expenses_average": ["<30%", "30%-60%"], "risk_tolerance": ["Conservador", "Moderado"]},
    "Bonos": {"income_source": ["SALARIO", "Ambos"], "target_period": ["Mediano plazo", "Largo plazo"], "expenses_average": ["<30%", "30%-60%"], "risk_tolerance": ["Conservador", "Moderado"]},
    "ETFs": {"income_source": ["Ambos", "Trabajo independiente"], "target_period": ["Largo plazo"], "expenses_average": ["<30%"], "risk_tolerance": ["Moderado", "Arriesgado"]},
    "Acciones": {"income_source": ["Trabajo independiente"], "target_period": ["Largo plazo"], "expenses_average": ["<30%"], "risk_tolerance": ["Arriesgado"]},
    "Fondos Diversificados": {"income_source": ["Ambos", "Trabajo fijo"], "target_period": ["Mediano plazo", "Largo plazo"], "expenses_average": ["30%-60%"], "risk_tolerance": ["Moderado"]}
}

def get_recommendations(user_data: ForRecommendations):
    recommendations = []
    
    print(user_data)
    
    for option, criteria in investment_options.items():
        if (
            user_data.income_source in criteria["income_source"] and
            user_data.target_period in criteria["target_period"] and
            user_data.expenses_average in criteria["expenses_average"] and
            user_data.risk_tolerance in criteria["risk_tolerance"]
        ):
            recommendations.append(option)
    
    return recommendations