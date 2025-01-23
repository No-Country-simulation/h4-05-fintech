import './ObjetivosFinancieros.css'

const ObjetivosFinancieros = () => {
  return (
    <div className="financial-objectives">
        <div className="header">
            <h1>Objetivos financieros</h1>
            <p className="question">¿Qué te motiva principalmente a elegir IUPI como tu plataforma de inversión?</p>
        </div>
        
        <div className="options-container">
            <div className="option-item">
                <div className="option-content">
                    <span className="option-text">Ahorro</span>
                    <img src="https://dashboard.codeparrot.ai/api/image/Z5J1iXhIZI-ZK8hF/frame.png" alt="info" className="info-icon" />
                </div>
                <img src="https://dashboard.codeparrot.ai/api/image/Z5J1iXhIZI-ZK8hF/div.png" alt="checkbox" className="checkbox-icon" />
            </div>

            <div className="option-item">
                <div className="option-content">
                    <span className="option-text">Inversion</span>
                    <img src="https://dashboard.codeparrot.ai/api/image/Z5J1iXhIZI-ZK8hF/frame-2.png" alt="info" className="info-icon" />
                </div>
                <img src="https://dashboard.codeparrot.ai/api/image/Z5J1iXhIZI-ZK8hF/div-2.png" alt="checkbox" className="checkbox-icon" />
            </div>

            <div className="option-item">
                <div className="option-content">
                    <span className="option-text">Ambas</span>
                    <img src="https://dashboard.codeparrot.ai/api/image/Z5J1iXhIZI-ZK8hF/frame-3.png" alt="info" className="info-icon" />
                </div>
                <img src="https://dashboard.codeparrot.ai/api/image/Z5J1iXhIZI-ZK8hF/div-3.png" alt="checkbox" className="checkbox-icon" />
            </div>
        </div>
    </div>
  )
}

export default ObjetivosFinancieros