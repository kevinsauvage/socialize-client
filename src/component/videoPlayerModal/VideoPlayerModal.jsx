import { useContext } from 'react'
import ReactPlayer from 'react-player'
import { AuthContext } from '../../context/AuthContext'
import ModalPlayer from '../modalPlayer/ModalPlayer'

const VideoPlayerModal = ({ url, handleIndexUpdate, index }) => {
  const { user } = useContext(AuthContext)

  return (
    <ModalPlayer
      handleIndexUpdate={handleIndexUpdate}
      index={index}
      comparation={user.videos}
    >
      <ReactPlayer url={url} controls={true} width={'100%'} />
    </ModalPlayer>
  )
}

export default VideoPlayerModal
