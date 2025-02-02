import * as React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean;
  label: string;
}

const InputRadioCheckbox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, type, onChange, label, ...props }, ref) => {
    return (
      <div className="w-full h-9 flex-col justify-start items-start gap-2 inline-flex">
        <div className="self-stretch p-2 bg.darkBlue rounded-lg border-gray-200 justify-between items-center inline-flex">
          <div className="justify-start items-center gap-4 flex">
            <div className="w-4 h-4 bg-black/0 border-gray-200 justify-center items-center flex">
              <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="Frame">
                    <path d="M0 0.84668H16V16.8467H0V0.84668Z" stroke="#E5E7EB"/>
                    <path id="Vector" d="M2 2.84668C2 2.29355 1.55313 1.84668 1 1.84668C0.446875 1.84668 0 2.29355 0 2.84668V13.3467C0 14.7279 1.11875 15.8467 2.5 15.8467H15C15.5531 15.8467 16 15.3998 16 14.8467C16 14.2936 15.5531 13.8467 15 13.8467H2.5C2.225 13.8467 2 13.6217 2 13.3467V2.84668ZM14.7063 5.55293C15.0969 5.1623 15.0969 4.52793 14.7063 4.1373C14.3156 3.74668 13.6812 3.74668 13.2906 4.1373L10 7.43105L8.20625 5.6373C7.81563 5.24668 7.18125 5.24668 6.79063 5.6373L3.29063 9.1373C2.9 9.52793 2.9 10.1623 3.29063 10.5529C3.68125 10.9436 4.31563 10.9436 4.70625 10.5529L7.5 7.7623L9.29375 9.55606C9.68437 9.94668 10.3188 9.94668 10.7094 9.55606L14.7094 5.55605L14.7063 5.55293Z" fill="#9333EA"/>
                  </g>
                </svg>
              </div>
            </div>
            <div className="w-[267px] h-5 text-lightBlue text-sm font-normal font-['Open Sans'] leading-tight tracking-tight">
               {label}
            </div>
          </div>
          <input type={type} name={name} onChange={onChange} ref={ref} {...props} />
        </div>
      </div>
    )
  }
)

InputRadioCheckbox.displayName = "Radio"

export default InputRadioCheckbox;