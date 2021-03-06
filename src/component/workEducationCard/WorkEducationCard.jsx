import { convertFromRaw, Editor, EditorState } from 'draft-js'
import BlocTitle from '../blocTitle/BlocTitle'
import EditionBtns from '../editionBtns/EditionBtns'
import './WorkEducationCard.scss'

const WorkEducationCard = ({ item, handleDelete, handleModify, ...rest }) => {
  return (
    <div className="WorkEducationCard" {...rest}>
      <BlocTitle text={item.type === 'Education' ? 'Education' : 'Work'} />
      <div className="WorkEducationCard__wrapper">
        {item.position ? (
          <div className="WorkEducationCard__position">
            <h3>{item.position}</h3>
            <p>at {item.name}</p>
          </div>
        ) : (
          <h3 className="WorkEducationCard__name">{item.name}</h3>
        )}
        <p className="WorkEducationCard__address">{`${item.city} ${item.country}`}</p>
      </div>
      <i className="WorkEducationCard__date">{`${item.from} - ${item.to}`} </i>
      <div className="WorkEducationCard__editor">
        {item.description && (
          <Editor
            editorState={EditorState.createWithContent(
              convertFromRaw(JSON.parse(item?.description)),
            )}
            readOnly={true}
          />
        )}
      </div>
      <EditionBtns
        handleDelete={() => handleDelete(item)}
        handleModify={() => handleModify(item)}
      />
    </div>
  )
}

export default WorkEducationCard
