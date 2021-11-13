import './Loader.scss'

const Loader = ({ ...rest }) => {
  return (
    <div className="loader" {...rest}>
      <div className="lds-ring"></div>
    </div>
  )
}

export default Loader
