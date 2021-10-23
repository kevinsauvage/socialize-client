import './Friends.scss'
import BlocTitle from '../blocTitle/BlocTitle'
import Avatar from '../avatar/Avatar'

const Friends = () => {
  return (
    <section className="friends">
      <BlocTitle text={'Friends'} />
      <form action="submit" className="friends__form">
        <input
          type="text"
          placeholder="Search Contacts..."
          className="friends__input"
        />
      </form>
      <div className="friends__container">
        <Avatar name="Oliver doe" style={{ width: '33%' }} />
        <Avatar name="Oliver doe" style={{ width: '33%' }} />
        <Avatar name="Oliver doe" style={{ width: '33%' }} />
        <Avatar name="Oliver doe" style={{ width: '33%' }} />
        <Avatar name="Oliver doe" style={{ width: '33%' }} />
        <Avatar name="Oliver doe" style={{ width: '33%' }} />
      </div>
    </section>
  )
}

export default Friends
