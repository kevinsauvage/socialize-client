import './Friends.scss'
import BlocTitle from '../blocTitle/BlocTitle'
import Avatar from '../avatar/Avatar'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Friends = () => {
  const { searchUsers } = useContext(AuthContext)
  const [result, setResult] = useState([])

  const handleChange = (e) => {
    searchUsers(e.target.value)
      .then((res) => res.json())
      .then((data) => setResult(data))
  }

  return (
    <section className="friends">
      <BlocTitle text={'Friends'} />
      <form
        action="submit"
        className="friends__form"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          name="query"
          placeholder="Search Contacts..."
          className="friends__input"
          onChange={handleChange}
        />
      </form>
      <div className="friends__container">
        {result.map((user) => (
          <Avatar avatarImg={user.avatar} name={user.username} />
        ))}
      </div>
    </section>
  )
}

export default Friends
