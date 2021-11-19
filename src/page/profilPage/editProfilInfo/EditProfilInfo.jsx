import { lazy, Suspense, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
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
  const [displayElement, setDisplayElement] = useState()

  useEffect(() => setDisplayElement(location.pathname.split('/')[3]), [
    location.pathname,
  ])

  return (
    <div className="editProfilInfo">
      <Suspense fallback={<Loader />}>
        {displayElement === 'basic_info' && <EditBasicInfo />}
        {displayElement === 'change_password' && <EditPassword />}
        {displayElement === 'my_interest' && <EditInterest />}
        {displayElement === 'work_and_education' && <EditWorkEducation />}
      </Suspense>
    </div>
  )
}

export default EditProfilInfo
