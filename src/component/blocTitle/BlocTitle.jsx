import './BlocTitle.scss'

const BlocTitle = ({ text, ...rest }) => {
  return (
    <h6 className="blocTitle" {...rest}>
      {text}
    </h6>
  )
}

export default BlocTitle
