import { lazy, Suspense, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import Loader from '../../../component/loader/Loader'

const EditPassword = lazy(() =>
  import('./../../../component/editPassword/EditPassword'),
)
const EditBasicInfo = lazy(() =>
  import('./../../../component/editBasicInfo/EditBasicInfo'),
)
const EditInterest = lazy(() =>
  import('../../../component/editInterest/EditInterest'),
)
const EditWorkEducation = lazy(() =>
  import('./../../../component/editWorkEducation/EditWorkEducation'),
)

const EditProfilInfo = () => {
  const location = useLocation()
  const history = useHistory()
  const [displayElement, setDisplayElement] = useState()

  useEffect(() => {
    location.pathname.split('/')[3]
      ? setDisplayElement(location.pathname.split('/')[3])
      : history.push('/profil/edit/basic_info')
  }, [location.pathname, history])

  return (
    <div className="editProfilInfo">
      <Suspense fallback={<Loader style={{ margin: '100px 0' }} />}>
        {displayElement === 'basic_info' && <EditBasicInfo />}
        {displayElement === 'change_password' && <EditPassword />}
        {displayElement === 'my_interest' && <EditInterest />}
        {displayElement === 'work_and_education' && <EditWorkEducation />}
      </Suspense>
    </div>
  )
}

export default EditProfilInfo
