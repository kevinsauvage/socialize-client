import './ModalPlayer.scss'
import { CgCloseO } from 'react-icons/cg'
import { TiArrowLeftOutline, TiArrowRightOutline } from 'react-icons/ti'

const ModalPlayer = ({ children, handleIndexUpdate, index, comparation }) => {
  return (
    <div className="ModalPlayer">
      <CgCloseO
        className="ModalPlayer__close"
        onClick={() => handleIndexUpdate(undefined)}
      />
      <div className="ModalPlayer__wrapper">
        <div
          onClick={() => handleIndexUpdate(index - 1)}
          className={
            index <= 0
              ? 'ModalPlayer__galleryArrow ModalPlayer__galleryArrow--leftInactive'
              : 'ModalPlayer__galleryArrow'
          }
        >
          <TiArrowLeftOutline />
        </div>
        {children}
        <div
          onClick={() => handleIndexUpdate(index + 1)}
          className={
            index >= comparation.length - 1
              ? 'ModalPlayer__galleryArrow ModalPlayer__galleryArrow--rightInactive'
              : 'ModalPlayer__galleryArrow'
          }
        >
          <TiArrowRightOutline />
        </div>
      </div>
    </div>
  )
}

export default ModalPlayer
