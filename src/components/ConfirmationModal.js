import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ConfirmationModal = (props) => {
    return(
    <Modal {...props} centered animation={false}>
        <Modal.Body>
        {props.text}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-danger" onClick={props.confirme}>
                Yes
            </Button>
            <Button variant="outline-success" onClick={props.onHide}>
                Cancel
            </Button>
        </Modal.Footer>
    </Modal>
    );
}

export default ConfirmationModal;