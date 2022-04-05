import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Modal } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../contexts/PostContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddPostModal = () => {
    const { showAddPostModal, setShowAddPostModal, addPosts } = useContext(PostContext)
    const [newPosts, setNewPosts] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })
    const { title, description, url, status } = newPosts
    const onchangeNewPosts = (e) => {
        setNewPosts({
            ...newPosts,
            [e.target.name]: e.target.value
        })
    }
    const onCloseModal = () => {
        setNewPosts({ title: '', description: '', url: '', status: 'TO LEARN' })
        setShowAddPostModal(false)
    }
    const saveLearnit = async () => {
        const add = await addPosts(newPosts)
        if (add) {
            toast.success('Add new posts success!')
            onCloseModal()
        } else {
            toast.error('Add new posts error!')
        }
    }

    return (
        <>
            <Modal show={showAddPostModal} onHide={onCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>What do yoy want to learn?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group >
                        <Form.Control text='text' placeholder='Enter title...' name='title' aria-describedby='title-help' value={title} onChange={onchangeNewPosts} />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as='textarea' rows={3} placeholder='Enter description...' name='description' value={description} onChange={onchangeNewPosts} />
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Control text='text' placeholder='Tutorial URL...' name='url' value={url} onChange={onchangeNewPosts} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={saveLearnit}>
                        Learnit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )

}
export default AddPostModal;