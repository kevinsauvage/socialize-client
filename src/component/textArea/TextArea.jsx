import { useState } from 'react'
import './TextArea.scss'

const TextArea = ({ name, onChange, value = '', label }) => {
  const [focus, setFocus] = useState(false)

  return (
    <div className="TextArea">
      <label
        className={
          value?.length !== 0
            ? 'TextArea__label TextArea__label--focus'
            : focus
            ? 'TextArea__label TextArea__label--focus'
            : 'TextArea__label'
        }
      >
        {label}
      </label>
      <textarea
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={onChange}
        name={name}
        value={value}
        className={
          value?.length !== 0
            ? 'TextArea__input TextArea__input--focus'
            : focus
            ? 'TextArea__input TextArea__input--focus'
            : 'TextArea__input'
        }
      ></textarea>
    </div>
  )
}

export default TextArea
