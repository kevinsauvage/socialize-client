import BlocTitle from '../blocTitle/BlocTitle'
import './EditInfo.scss'
import { BsInfoCircle } from 'react-icons/bs/index'
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
        <ListItem
          icon={<BsInfoCircle />}
          text="Basic Info"
          to="/profil/edit/basic_info"
        />
        <ListItem
          icon={<MdFavoriteBorder />}
          text="My Interestse"
          to="/profil/edit/my_interest"
        />
        <ListItem
          icon={<MdSettingsSuggest />}
          text="Account Settings"
          to="/profil/edit/account_setting"
        />
        <ListItem
          icon={<MdLockOutline />}
          text="Change Password"
          to="/profil/edit/change_password"
        />
      </ul>
    </div>
  )
}

export default EditInfo
