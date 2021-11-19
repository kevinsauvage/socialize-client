import { useContext } from 'react'
import BlocTitle from '../../../component/blocTitle/BlocTitle'
import './AboutProfil.scss'
import { AuthContext } from './../../../context/AuthContext'
import { useState } from 'react'
import { RiUser3Line } from 'react-icons/ri'
import { GoLocation } from 'react-icons/go'
import { GiSmartphone } from 'react-icons/gi'
import { MdContactMail, MdOutlineWeb } from 'react-icons/md'
import { convertFromRaw, Editor, EditorState } from 'draft-js'

const ListItem = ({ icon, text, ...rest }) => {
  return (
    <li {...rest}>
      {icon} <span className="listItem__text">{text}</span>
    </li>
  )
}

const AboutProfil = () => {
  const { user } = useContext(AuthContext)
  const [basicInfo, setBasicInfo] = useState(true)
  const [location, setLocation] = useState(false)
  const [work, setWork] = useState(false)
  const [interest, setInterest] = useState(false)
  const [languages, setLanguages] = useState(false)

  const handleSetBasic = () => {
    setLocation(false)
    setWork(false)
    setInterest(false)
    setLanguages(false)
    setBasicInfo(true)
  }

  const handleSetLocation = () => {
    setWork(false)
    setInterest(false)
    setLanguages(false)
    setBasicInfo(false)
    setLocation(true)
  }
  const handleSetWork = () => {
    setInterest(false)
    setLanguages(false)
    setBasicInfo(false)
    setLocation(false)
    setWork(true)
  }
  const handleSetInterest = () => {
    setLanguages(false)
    setBasicInfo(false)
    setLocation(false)
    setWork(false)
    setInterest(true)
  }

  const handleSetLanguage = () => {
    setBasicInfo(false)
    setLocation(false)
    setWork(false)
    setInterest(false)
    setLanguages(true)
  }

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
              location
                ? 'AboutProfil__listItem AboutProfil__listItem--active'
                : 'AboutProfil__listItem'
            }
            onClick={handleSetLocation}
          >
            Location
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
          <li
            className={
              languages
                ? 'AboutProfil__listItem AboutProfil__listItem--active'
                : 'AboutProfil__listItem'
            }
            onClick={handleSetLanguage}
          >
            Languages
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
          </ul>
        )}
        {location && (
          <div className="AboutProfil__result">
            <p>location</p>
          </div>
        )}
        {work && (
          <div className="AboutProfil__result">
            <p>work</p>
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
        {languages && (
          <div className="AboutProfil__result">
            <p>languages</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AboutProfil
