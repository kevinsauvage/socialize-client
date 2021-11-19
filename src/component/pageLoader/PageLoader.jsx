import './PageLoader.scss'
import Loader from '../loader/Loader'

const PageLoader = () => {
  return (
    <div className="PageLoader">
      <div>
        <Loader />
        <p>Page is loading, please wait!</p>
      </div>
    </div>
  )
}

export default PageLoader
