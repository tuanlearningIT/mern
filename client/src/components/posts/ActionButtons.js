import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import playIcon from '../../assets/play-fill.svg';
import editIcon from '../../assets/pencil-fill.svg';
import deleteIcon from '../../assets/trash-fill.svg';
import './ActionButtons.scss'
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";
const ActionButtons = ({ _id, url }) => {
    const { deletePosts, findPosts, setShowUpdatePostModal } = useContext(PostContext)
    const choosePosts = (postId) => {
        findPosts(postId)
        setShowUpdatePostModal(true)
    }

    return (
        <>
            <Button className="post-btn-play" href={url} target="_blank" >
                <img src={playIcon} alt='play' width='32' height='32' />
            </Button>
            <Button className="post-btn-edit" onClick={choosePosts.bind(this, _id)} >
                <img src={editIcon} alt='edit' width='24' height='24' />
            </Button>
            <Button className="post-btn-delete"
                onClick={deletePosts.bind(this, _id)}
            >
                <img src={deleteIcon} alt='delete' width='24' height='24' />
            </Button>

        </>
    )
}

export default ActionButtons;