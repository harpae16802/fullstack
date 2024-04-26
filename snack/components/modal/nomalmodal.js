
import { Modal, Button } from 'react-bootstrap'

function NomalModal({ children,show,onhide }) {
  return (
    <div>
      <Modal show={show} onHide={onhide}>
        <Modal.Header closeButton style={{ border: 'none' }}></Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </div>
  )
}

export default NomalModal
