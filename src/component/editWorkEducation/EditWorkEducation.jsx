import './EditWorkEducation.scss'
import BlocTitle from '../blocTitle/BlocTitle'
import Input from './../input/Input'
import useForm from './../../hooks/useForm'
import FormBtns from './../formBtns/FormBtns'
import TextArea from '../textArea/TextArea'
import { useContext } from 'react'
import { AuthContext } from './../../context/AuthContext'
import WorkEducationCard from '../workEducationCard/WorkEducationCard'
import { convertToRaw, EditorState, convertFromRaw } from 'draft-js'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const EditWorkEducation = () => {
  const { updateUser, user } = useContext(AuthContext)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )

  const submitCallback = async (form) => {
    let newForm

    if (form.type === 'Education') {
      if (form._id) {
        const newUserEdu = user.educations.map((item) => {
          if (item._id === form._id) return form
          else return item
        })
        newForm = { educations: newUserEdu }
      } else {
        form._id = uuidv4()
        newForm = { educations: [...user.educations, form] }
      }
    }

    if (form.type === 'Work') {
      if (form._id) {
        const newUserWorks = user.works.map((item) => {
          if (item._id === form._id) return form
          else return item
        })
        newForm = { works: newUserWorks }
      } else {
        form._id = uuidv4()
        newForm = { works: [...user.works, form] }
      }
    }

    const res = await updateUser(newForm)

    if (res.ok) {
      setEditorState(EditorState.createEmpty())
      setFormData({ type: 'Education' })
    } else {
      alert('Oups, something went wrong. Try again.')
    }
    const data = await res.json()
    console.log(data)
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

  const handleChangeTextArea = (e) => {
    setEditorState(e)
    const data = editorState.getCurrentContent()
    const content = JSON.stringify(convertToRaw(data))
    setFormData({ ...formData, description: content })
  }

  const handleDelete = (item) => {
    if (item.type === 'Education') {
      const newEdu = user.educations.filter((edu) => edu._id !== item._id)
      const objectToUpdate = { educations: newEdu }
      updateUser(objectToUpdate)
    }
    if (item.type === 'Work') {
      const newWork = user.works.filter((edu) => edu._id !== item._id)
      const objectToUpdate = { works: newWork }
      updateUser(objectToUpdate)
    }
  }

  const handleModify = (item) => {
    window.scrollTo(0, 0)
    setFormData(item)
    const editorState = EditorState.createWithContent(
      convertFromRaw(JSON.parse(item?.description)),
    )
    setEditorState(editorState)
  }

  const handleCancel = () => {
    setEditorState(EditorState.createEmpty())
    setFormData({ type: 'Education' })
  }

  return (
    <>
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
              <label htmlFor="School">Work</label>
              <input
                type="checkbox"
                name="typecheckbox"
                value="Work"
                checked={formData.type === 'Work'}
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
          {formData.type === 'Work' && (
            <Input
              label="Position"
              type="text"
              name="position"
              value={!loading ? formData?.position : ''}
              onChange={handleInputChange}
            />
          )}
          <div className="EditWorkEducation__row">
            <Input
              label="From"
              type="date"
              name="from"
              value={!loading ? formData?.from : ''}
              onChange={handleInputChange}
            />
            <Input
              label="to"
              type="date"
              name="to"
              value={!loading ? formData?.to : ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="EditWorkEducation__row">
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
          </div>
          <TextArea
            name="description"
            onChange={handleChangeTextArea}
            label="Description"
            state={editorState}
          />
          <FormBtns onSubmit={handleSubmit} handleCancel={handleCancel} />
        </form>
      </div>
      {user?.educations.map((edu, i) => (
        <WorkEducationCard
          key={i}
          item={edu}
          handleDelete={handleDelete}
          handleModify={handleModify}
        />
      ))}
      {user?.works.map((edu, i) => (
        <WorkEducationCard
          key={i}
          item={edu}
          handleDelete={handleDelete}
          handleModify={handleModify}
        />
      ))}
    </>
  )
}

export default EditWorkEducation
