import './EditInterest.scss'
import BlocTitle from '../blocTitle/BlocTitle'
import { useEffect, useState, useContext } from 'react'
import { MdOutlineDeleteSweep } from 'react-icons/md'
import { AuthContext } from '../../context/AuthContext'
import FormBtns from '../formBtns/FormBtns'

const EditInterest = () => {
  const [interests, setInterests] = useState([])
  const [input, setInput] = useState('')
  const { updateUser, user, findOne } = useContext(AuthContext)

  useEffect(() => user?.interests && setInterests(user.interests), [user])

  const handleSubmit = (e) => {
    e.preventDefault()
    setInterests([...interests, input])
    setInput('')
  }

  const handleRemove = (element) => {
    const newInterest = interests.filter((item) => item !== element)
    setInterests(newInterest)
  }

  const handleCancel = () => {
    setInterests(user.interests)
    setInput('')
  }

  const handleUpdateInterest = () => {
    updateUser({ interests: interests })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => setInterests([]))
      .finally(() => findOne(user._id))
  }

  return (
    <div className="EditInterest">
      <BlocTitle text="My Interests" style={{ fontSize: '24px' }} />
      <form className="EditInterest__form" onSubmit={handleSubmit}>
        <label htmlFor="iterestInput" className="EditInterest__label">
          Add interests:
        </label>
        <div className="EditInterest__formRow">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="EditInterest__input"
            type="text"
            name="interest"
            id="iterestInput"
            placeholder="Photography, Traveling, Hiking..."
          />
          <button className="EditInterest__addBtn">Add</button>
        </div>
      </form>
      <ul className="EditInterest__list">
        {interests.map((item, i) => (
          <li className="EditInterest__listItem" key={i}>
            <MdOutlineDeleteSweep
              className="EditInterest__deleteIcon"
              onClick={() => handleRemove(item)}
            />
            <p>{item}</p>
          </li>
        ))}
      </ul>
      {interests.length > 0 && (
        <FormBtns
          handleCancel={handleCancel}
          handleSubmit={handleUpdateInterest}
        />
      )}
    </div>
  )
}

export default EditInterest
