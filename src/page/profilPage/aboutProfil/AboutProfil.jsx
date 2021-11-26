import './AboutProfil.scss'
import BlocTitle from '../../../component/blocTitle/BlocTitle'
import { useState } from 'react'
import { RiUser3Line } from 'react-icons/ri'
import { GoLocation } from 'react-icons/go'
import { GiSmartphone } from 'react-icons/gi'
import { MdContactMail, MdOutlineWeb } from 'react-icons/md'
import { convertFromRaw, Editor, EditorState } from 'draft-js'
import { FaBirthdayCake } from 'react-icons/fa'

const ListItem = ({ icon, text, ...rest }) => {
  return (
    <li {...rest}>
      {icon} <span className="listItem__text">{text}</span>
    </li>
  )
}

const AboutProfil = ({ user }) => {
  const [basicInfo, setBasicInfo] = useState(true)
  const [work, setWork] = useState(false)
  const [interest, setInterest] = useState(false)

  const handleSetBasic = () => {
    setWork(false)
    setInterest(false)
    setBasicInfo(true)
  }

  const handleSetWork = () => {
    setInterest(false)
    setBasicInfo(false)
    setWork(true)
  }
  const handleSetInterest = () => {
    setBasicInfo(false)
    setWork(false)
    setInterest(true)
  }

  console.log(user)

  return (
    <div className="AboutProfil">
      <BlocTitle text="Personal Info" />
      {user?.about ? (
        <Editor
          editorState={EditorState.createWithContent(
            convertFromRaw(JSON.parse(user?.about)),
          )}
          readOnly={true}
        />
      ) : (
        <p>No description added yet</p>
      )}
      <div className="AboutProfil__table">
        <ul className="AboutProfil__list">
          <li
            className={
              basicInfo
                ? 'AboutProfil__listItem AboutProfil__listItem--active'
                : 'AboutProfil__listItem'
            }
            onClick={handleSetBasic}
          >
            Basic Info
          </li>

          <li
            className={
              work
                ? 'AboutProfil__listItem AboutProfil__listItem--active'
                : 'AboutProfil__listItem'
            }
            onClick={handleSetWork}
          >
            Work And Education
          </li>
          <li
            className={
              interest
                ? 'AboutProfil__listItem AboutProfil__listItem--active'
                : 'AboutProfil__listItem'
            }
            onClick={handleSetInterest}
          >
            Interest
          </li>
        </ul>
        {basicInfo && (
          <ul className="AboutProfil__result">
            <ListItem
              icon={<RiUser3Line />}
              text={user?.username}
              className="AboutProfil__resultItem"
            />
            {(user?.city || user?.country) && (
              <ListItem
                className="AboutProfil__resultItem"
                icon={<GoLocation />}
                text={`${user?.city} ${user?.country}`}
              />
            )}
            {user?.phone && (
              <ListItem
                className="AboutProfil__resultItem"
                icon={<GiSmartphone />}
                text={user?.phone}
              />
            )}
            {user?.email && (
              <ListItem
                className="AboutProfil__resultItem"
                icon={<MdContactMail />}
                text={user?.email}
              />
            )}
            {user?.website && (
              <ListItem
                className="AboutProfil__resultItem"
                icon={<MdOutlineWeb />}
                text={user?.website}
              />
            )}
            {user?.birthday && (
              <ListItem
                className="AboutProfil__resultItem"
                icon={<FaBirthdayCake />}
                text={user.birthday}
              />
            )}
          </ul>
        )}

        {work && (
          <div className="AboutProfil__result">
            {user.educations.map((edu, i) => {
              return (
                <div key={i} className="AboutProfil__resultEdu">
                  <h6 className="AboutProfil__resultItem AboutProfil__resultEduTitle">
                    Studying at {edu.name}
                  </h6>
                  <div className="AboutProfil__resultEdu__date">
                    <p className="AboutProfil__resultEdu__from">
                      <strong>From :</strong> {edu.from}
                    </p>
                    <p className="AboutProfil__resultEdu__to">
                      <strong>To :</strong> {edu.to}
                    </p>
                  </div>
                </div>
              )
            })}
            {user.works.map((edu, i) => {
              return (
                <div key={i}>
                  <h6 className="AboutProfil__resultItem AboutProfil__resultEduTitle">
                    Working at {edu.name}
                  </h6>
                  <div className="AboutProfil__resultEdu__date">
                    <p>
                      <strong>From :</strong> {edu.from}
                    </p>
                    <p>
                      <strong>To :</strong> {edu.to || 'today'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {interest && (
          <div className="AboutProfil__result">
            {user.interests.map((interest, i) => (
              <p key={i} className="AboutProfil__resultItem">
                {interest}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AboutProfil
