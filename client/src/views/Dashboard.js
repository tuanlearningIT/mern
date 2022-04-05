import { PostContext } from "../contexts/PostContext";
import { useContext, useEffect } from "react";
import { Button, Card, Col, Tooltip, OverlayTrigger, Row } from 'react-bootstrap'
import { AuthContext } from "../contexts/AuthContext";
import SinglePost from "../components/posts/SinglePost";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddPostModal from "../components/posts/AddPostModal";
import addShow from '../assets/plus-circle-fill.svg'
import './DashBoard.scss'
import UpdatePostsModal from "../components/posts/UpdatePostsModal";

const DashBoard = () => {
    const { postsState: { posts, postsLoading, post }, getPosts, setShowAddPostModal } = useContext(PostContext)
    //context 
    const { authState: { user: { username } } } = useContext(AuthContext)

    // Start: get all posts
    useEffect(() =>
        getPosts()
        , [])
    let body = []
    if (postsLoading) {
        body = (
            <div className="spninner-container">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className='text-center m-5'>
                    <Card.Header as='h1'>hi {username}!</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to learnIt</Card.Title>
                        <Card.Text>
                            Click the button below to track your first skill to learn
                        </Card.Text>
                        <Button variant="primary" onClick={setShowAddPostModal.bind(this, true)}>LearnIt</Button>
                    </Card.Body>
                </Card>
            </>
        )
    } else {
        body = (

            <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">

                {
                    posts && posts.length > 0 &&
                    posts.map(post => {
                        return (
                            <Col key={post._id} className="my-2">
                                <SinglePost post={post} />
                            </Col>
                        )

                    })
                }

            </Row>

        )
    }
    return (
        <>
            {body}
            <AddPostModal />
            {post !== null && <UpdatePostsModal />}

            <OverlayTrigger placement="left" overlay={<Tooltip>Add a new thing to learn</Tooltip>}>

                <Button className="float-end me-3 mt-3" onClick={setShowAddPostModal.bind(this, true)}>
                    <img src={addShow} alt='add-show' width='64' height='64' />
                </Button>
            </OverlayTrigger>

        </>
    )
}

export default DashBoard;