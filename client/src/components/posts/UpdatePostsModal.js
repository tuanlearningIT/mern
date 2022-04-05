import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Modal } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../contexts/PostContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UpdatePostsModal = () => {
    const { postsState: { post }, showUpdatePostModal, setShowUpdatePostModal, updatePosts } = useContext(PostContext)
    const [updatedPosts, setUpdatedPosts] = useState(post)
    useEffect(() => setUpdatedPosts(post), [post])
    const { title, description, url, status } = updatedPosts
    const onchangeUpdatedPosts = (e) => {
        setUpdatedPosts({
            ...updatedPosts,
            [e.target.name]: e.target.value
        })
    }
    const onCloseModal = () => {
        setUpdatedPosts(post)
        setShowUpdatePostModal(false)
    }
    const updatePost = async () => {
        const update = await updatePosts(updatedPosts)
        if (update) {
            toast.success('Updated posts success!')
            onCloseModal()
        } else {
            toast.error('Updated posts error!')
        }
    }
    return (
        <>
            <Modal show={showUpdatePostModal} onHide={onCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you want to update?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group >
                        <Form.Control text='text' placeholder='Enter title...' name='title' aria-describedby='title-help' value={title} onChange={onchangeUpdatedPosts} />
                        <Form.Text id='title-help' muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Control as='textarea' rows={3} placeholder='Enter description...' name='description' value={description} onChange={onchangeUpdatedPosts} />
                    </Form.Group>
                    <Form.Group className='mt-3'>

                        <Form.Control text='text' placeholder='Tutorial URL...' name='url' value={url} onChange={onchangeUpdatedPosts} />
                    </Form.Group>

                    <Form.Group className='mt-3'>
                        <Form.Label>Select status</Form.Label>
                        <Form.Select value={status} name='status' onChange={onchangeUpdatedPosts}>
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={updatePost}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpdatePostsModal;