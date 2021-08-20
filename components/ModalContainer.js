import React, {useState} from 'react'
import { Button, Image, Modal, Header, Icon } from 'semantic-ui-react'
import { API_URL } from '../config'
import Uploader from './Uploader'





export default function ModalContainer({ showModal, evtId, handleUpload, handleFileChange }) {

  const [open, setopen] = useState(showModal)

  return (
    <div style={{paddingTop: 20}}>
      <Modal
        size="tiny"
        closeIcon
        open={open}
        trigger={<Button secondary>Set Image</Button>}
        onClose={() => setopen(showModal)}
        onOpen={() => setopen(!showModal)}
      >
        <Header icon="image" content="Upload Event Image" />
        <Modal.Content>
          <Uploader
            evtId={evtId}
            handleUpload={handleUpload}
            handleFileChange={handleFileChange}
          />
        </Modal.Content>
      </Modal>
    </div>
  )
}

