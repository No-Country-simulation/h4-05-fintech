import Button from "./Button"
import Logo from "./Logo"
import './FinancialObjectives.css'

const FinancialObjectives = () => {
  return (
    <div className="financial-objectives">
        <div className="financial-objectives-title">
            <Logo />
        </div>
        <div className="financial-objectives-button">
            <Button />
        </div>
    </div>
  )
}

export default FinancialObjectives