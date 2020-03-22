import React from 'react';
import { Modal } from 'react-bootstrap';

const VideoModal = ({
    toggleVideoModal,
    handleToggleVideoModal,
    videoSrc
}) => {

    return (
        <Modal
            show={toggleVideoModal}
            onHide={handleToggleVideoModal}
            size="lg"
            centered
        >
            <Modal.Body>
                <iframe width="100%" height="345" src={`//www.youtube.com/embed/${videoSrc}?autoplay="1"`} frameborder="0" allowFullScreen>
                </iframe>
            </Modal.Body>
        </Modal>
    )
}

export default VideoModal;