import { Modal, Button } from 'react-bootstrap';
import _ from 'lodash';

function DeleteModal({
  show = false,
  onCancel = _.noop,
  onDelete = _.noop,
} = {}) {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete this item?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { DeleteModal };
