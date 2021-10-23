import BlocTitle from '../blocTitle/BlocTitle'
import './EditInfo.scss'
import { BsInfoCircle } from 'react-icons/bs/index'
import { AiOutlineSchedule } from 'react-icons/ai/index'
import {
  MdFavoriteBorder,
  MdLockOutline,
  MdSettingsSuggest,
} from 'react-icons/md/index'
import ListItem from '../listItem/ListItem'

const EditInfo = () => {
  return (
    <div className="editInfo">
      <BlocTitle text="Edit Info" />
      <ul className="editInfo__list">
        <ListItem icon={<BsInfoCircle />} text="Basic Info" />
        <ListItem icon={<AiOutlineSchedule />} text="Education & Work" />
        <ListItem icon={<MdFavoriteBorder />} text="My Interests" />
        <ListItem icon={<MdSettingsSuggest />} text="Account Settings" />
        <ListItem icon={<MdLockOutline />} text="Change Password" />
      </ul>
    </div>
  )
}

export default EditInfo
