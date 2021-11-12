import { useEffect, useState } from 'react/cjs/react.development'
import { useLocation } from 'react-router'
import EditBasicInfo from './../../../component/editBasicInfo/EditBasicInfo'
import EditPassword from './../../../component/editPassword/EditPassword'
import EditInterest from '../../../component/editInterest/EditInterest'

const EditProfilInfo = () => {
  const location = useLocation()
  const [displayElement, setDisplayElement] = useState()

  useEffect(() => {
    setDisplayElement(location.pathname.split('/')[3])
  }, [location.pathname])

  return (
    <div className="editProfilInfo">
      {displayElement === 'basic_info' && <EditBasicInfo />}
      {displayElement === 'change_password' && <EditPassword />}
      {displayElement === 'my_interest' && <EditInterest />}
    </div>
  )
}

export default EditProfilInfo
