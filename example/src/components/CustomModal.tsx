import React from 'react'
import Modal from 'react-modal'

function CustomModal({ children, modalIsOpen, toggleModal }: any) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={toggleModal}
      className='mymodal'
      overlayClassName='myoverlay'
      contentLabel='Example Modal'
    >
      {children}
    </Modal>
  )
}

export default CustomModal
