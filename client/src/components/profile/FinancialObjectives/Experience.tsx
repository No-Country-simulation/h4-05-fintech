import Button from "./Button"
import Logo from "./Logo"
import './FinancialObjectives.css'
import { Link } from "react-router-dom"
import ObjetivosFinancieros from "./ObjetivosFinancieros"

const Experience = () => {
  return (
    <div className="financial-objectives">
      <div></div>
        <div className="financial-objectives-title">
            <Logo />
        </div>
        <div>
          <ObjetivosFinancieros />
        </div>
        <Link to="/experience" className="financial-objectives-button">
            <Button />
        </Link>
    </div>
  )
}

export default Experience