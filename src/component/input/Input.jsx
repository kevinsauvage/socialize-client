import { useRef, useState } from 'react'
import './Input.scss'

const Input = ({ label, type, name, value = '', onChange, ...rest }) => {
  const [focus, setFocus] = useState(false)
  const inputRef = useRef()

  const handleClickLabel = () => inputRef.current.focus()
  console.log(value)
  return (
    <div className="inputContainer" {...rest}>
      <label
        className={
          value?.length !== 0
            ? 'inputContainer__input-label--focus inputContainer__input-label'
            : focus
            ? 'inputContainer__input-label--focus inputContainer__input-label'
            : 'inputContainer__input-label'
        }
        onClick={handleClickLabel}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        className={
          value?.length !== 0
            ? 'inputContainer__input inputContainer__input--focus'
            : focus
            ? 'inputContainer__input inputContainer__input--focus'
            : 'inputContainer__input'
        }
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  )
}

export default Input
