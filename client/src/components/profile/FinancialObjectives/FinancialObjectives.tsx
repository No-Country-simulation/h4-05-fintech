import Button from "./Button"
import Logo from "./Logo"
import './FinancialObjectives.css'
import { Link } from "react-router-dom"

const FinancialObjectives = () => {
  return (
    <div className="financial-objectives">
      <div></div>
        <div className="financial-objectives-title">
            <Logo title="Super iUPi, para que podamos ofrecerte las mejores recomendaciones de inversión, necesitamos conocer tus aspiraciones financieras. ¿Nos contás un poco más?" />
        </div>
        <Link to="/experience" className="financial-objectives-button">
            <Button />
        </Link>
    </div>
  )
}

export default FinancialObjectives