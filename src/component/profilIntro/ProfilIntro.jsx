import './ProfilIntro.scss'
import BlocTitle from './../blocTitle/BlocTitle'
import Avatar from '../avatar/Avatar'
import { convertFromRaw, Editor, EditorState } from 'draft-js'

const ProfilIntro = ({ user }) => {
  return (
    <div className="profilIntro">
      <BlocTitle text="Profil Intro" />
      <div className="profilIntro__username">
        <Avatar avatarImg={user?.avatar} />
        <div className="profilIntro__name">
          <h5 className="profilIntro__firstname">{user?.firstName}</h5>
          <h2 className="profilIntro__lastname">{user?.lastName}</h2>
        </div>
      </div>
      <div>
        <div className="profilIntro__box profilIntro__box--about">
          <h6 className="profilIntro__box-title">About</h6>
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
        </div>
        <div className="profilIntro__box profilIntro__box--birthday">
          <h6 className="profilIntro__box-title">Country</h6>
          {user?.country ? <p>{user.country}</p> : <p>No country added yet</p>}
        </div>
        <div className="profilIntro__box profilIntro__box--city">
          <h6 className="profilIntro__box-title">City</h6>
          {user?.city ? <p>{user.city}</p> : <p>No city added yet</p>}
        </div>
        <div className="profilIntro__box profilIntro__box--birthday">
          <h6 className="profilIntro__box-title">Birthday</h6>
          {user?.birthday ? (
            <p>{user.birthday.split('-').join(' ')}</p>
          ) : (
            <p>No birthday added yet</p>
          )}
        </div>
        {user?.website && (
          <div className="profilIntro__box">
            <h6 className="profilIntro__box-title">Website</h6>
            <p>{user.website}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilIntro
