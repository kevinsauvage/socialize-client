import './FormBtns.scss'

const FormBtns = ({ handleCancel, handleSubmit }) => {
  return (
    <div className="FormBtns">
      <button
        type="reset"
        className="FormBtns__btn FormBtns__btn--cancel"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="FormBtns__btn FormBtns__btn--update"
        onClick={handleSubmit}
      >
        Update
      </button>
    </div>
  )
}

export default FormBtns
