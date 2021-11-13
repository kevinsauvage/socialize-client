import './EditWorkEducation.scss'
import BlocTitle from '../blocTitle/BlocTitle'
import Input from './../input/Input'
import useForm from './../../hooks/useForm'
import FormBtns from './../formBtns/FormBtns'
import TextArea from '../textArea/TextArea'

const EditWorkEducation = () => {
  const submitCallback = async (form) => {
    console.log(form)
  }

  const {
    formData,
    handleInputChange,
    handleSubmit,
    setFormData,
    loading,
  } = useForm({ type: 'Education' }, submitCallback)

  const handleCheckBoxes = (e) => {
    var checkboxes = document.getElementsByName('typecheckbox')
    checkboxes.forEach((item) => {
      if (item !== e.target) item.checked = false
      else item.checked = true
    })
    setFormData({ ...formData, type: e.target.value })
  }

  return (
    <div className="EditWorkEducation">
      <BlocTitle text="Edit Work And Education" />
      <form action="submit" onSubmit={handleSubmit}>
        <label htmlFor=""></label>
        <div className="EditWorkEducation__checkBoxes">
          <span className="EditWorkEducation__checkBox">
            <label htmlFor="Education">Education</label>
            <input
              type="checkbox"
              name="typecheckbox"
              value="Education"
              checked={formData.type === 'Education'}
              id="Education"
              onChange={handleCheckBoxes}
            />
          </span>
          <span className="EditWorkEducation__checkBox">
            <label htmlFor="School">School</label>
            <input
              type="checkbox"
              name="typecheckbox"
              value="Work"
              id="School"
              onChange={handleCheckBoxes}
            />
          </span>
        </div>
        <Input
          label={
            formData.type === 'Education'
              ? 'Studying at'
              : formData.type === 'Work'
              ? 'Working at'
              : ''
          }
          type="text"
          name="name"
          value={!loading ? formData?.name : ''}
          onChange={handleInputChange}
        />
        <Input
          label="From"
          type="text"
          name="from"
          value={!loading ? formData?.from : ''}
          onChange={handleInputChange}
        />
        <Input
          label="to"
          type="text"
          name="to"
          value={!loading ? formData?.to : ''}
          onChange={handleInputChange}
        />
        <Input
          label="City"
          type="text"
          name="city"
          value={!loading ? formData?.city : ''}
          onChange={handleInputChange}
        />
        <Input
          label="Country"
          type="text"
          name="country"
          value={!loading ? formData?.country : ''}
          onChange={handleInputChange}
        />
        <TextArea
          name="description"
          onChange={handleInputChange}
          label="Description"
          value={formData.description}
        />
        <FormBtns onSubmit={handleSubmit} />
      </form>
    </div>
  )
}

export default EditWorkEducation
