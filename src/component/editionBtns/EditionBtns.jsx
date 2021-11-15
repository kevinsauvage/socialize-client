import './EditionBtns.scss'
import { MdDeleteSweep, MdEdit } from 'react-icons/md'

const EditionBtns = ({ handleDelete, handleModify }) => {
  return (
    <div className="EditionBtns">
      {handleModify && (
        <span
          className="EditionBtns__btn EditionBtns__btn--edit"
          onClick={handleModify}
        >
          <MdEdit />
        </span>
      )}
      {handleDelete && (
        <span
          className="EditionBtns__btn EditionBtns__btn--delete"
          onClick={handleDelete}
        >
          <MdDeleteSweep />
        </span>
      )}
    </div>
  )
}

export default EditionBtns
