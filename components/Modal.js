import React, {useState} from 'react'
import { Button, Image, Modal, Header, Icon } from 'semantic-ui-react'
import Layout from '@/components/Layout'
import ImageUpload from './ImageUpload'
import { API_URL } from '../config'





export default function TestModal({imageUploaded, show, setShow, evtId}) {

  return (
    <div>
        <Modal
        size="tiny"
      closeIcon
      open={show}
      trigger={<Button secondary>
          Set Image</Button>}
      onClose={() => setShow(show)}
      onOpen={() => setShow(!show)}
    >
      <Header icon='image' content='Upload Event Image' />
      <Modal.Content>
          <ImageUpload evtId={evtId} imageUploaded={imageUploaded}/>
      </Modal.Content>
    </Modal>
    </div>
  )
}

