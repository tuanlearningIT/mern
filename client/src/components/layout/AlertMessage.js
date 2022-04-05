
import { Alert } from "react-bootstrap";

const AlertMessage = ({ info }) => {

    return info === null ? null : (
        <Alert size='md' variant={info.type}>
            {info.message}
        </Alert>
    )
}

export default AlertMessage;