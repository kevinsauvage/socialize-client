import './ConfirmationMessage.scss'

const ConfirmationMessage = ({ text, ...rest }) => {
  return (
    <p className="ConfirmationMessage" {...rest}>
      {text}
    </p>
  )
}

export default ConfirmationMessage
