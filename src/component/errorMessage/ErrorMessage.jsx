import './ErrorMessage.scss'

const ErrorMessage = ({ text, ...rest }) => {
  return (
    <p className="ErrorMessage" {...rest}>
      {text}
    </p>
  )
}

export default ErrorMessage
