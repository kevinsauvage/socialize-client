import './BlocTitle.scss'

const BlocTitle = ({ text, ...rest }) => {
  return (
    <div className="blocTitle">
      <h6 className="blocTitle__title" {...rest}>
        {text}
      </h6>
    </div>
  )
}

export default BlocTitle
