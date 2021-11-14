import { useEffect, useRef, useState } from 'react'
import './TextArea.scss'
import { convertToRaw, Editor } from 'draft-js'

const TextArea = ({ name, state, onChange, label }) => {
  const editor = useRef(null)
  const [focus, setFocus] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    state && setText(convertToRaw(state?.getCurrentContent()).blocks[0].text)
  }, [state])

  const handleLabelClick = () => editor.current.focus()

  return (
    <div
      className={
        text.length !== 0
          ? 'TextArea TextArea--focus'
          : focus
          ? 'TextArea TextArea--focus'
          : 'TextArea'
      }
    >
      <label
        onClick={handleLabelClick}
        className={
          text.length !== 0
            ? 'TextArea__label TextArea__label--focus'
            : focus
            ? 'TextArea__label TextArea__label--focus'
            : 'TextArea__label'
        }
      >
        {label}
      </label>
      <Editor
        ref={editor}
        name={name}
        onFocus={() => setFocus(true)}
        onBlur={() => text.length === 0 && setFocus(false)}
        editorState={state}
        onChange={onChange}
      />
    </div>
  )
}

export default TextArea
