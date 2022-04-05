import { Button, Col, Row } from "react-bootstrap";

const About = () => {

    return (
        <>
            <Row>
                <Col className="text-center mt-5">
                    <Button
                        target="_blank"
                        variant="danger"
                        href="https://github.com/tuanlearningIT"
                        size="lg">
                        Visit my github for more tutorials
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default About;