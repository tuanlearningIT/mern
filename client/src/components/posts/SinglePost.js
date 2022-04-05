import { Badge, Card, Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ActionButtons from "./ActionButtons";

const SinglePost = ({ post: { _id, title, description, status, url } }) => {

    return (
        <Card className="shadow" border={status === 'TO LEARN' ? 'success'
            : status === 'LEARNING' ? 'warning' : 'danger'}>
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className="post-title">{title}</p>
                            <Badge pill variant={status === 'LEARN' ? 'success'
                                : status === 'LEARNING' ? 'warning' : 'danger'}>{status}</Badge>
                        </Col>
                        <Col className="text-end">
                            <ActionButtons url={url} _id={_id} />

                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    )


}

export default SinglePost;