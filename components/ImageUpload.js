import { Input, Button } from "semantic-ui-react";
import { useState } from "react";
import { API_URL } from "../config";
import { useRouter } from "next/router";
import styles from '@/styles/Form.module.css'


export default function ImageUpload({ImageUploaded, evtId}) {

    const [image, setImage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('files', image)
        formData.append('ref', 'events')
        formData.append('refID', evtId)
        formData.append('field', 'image')

        const res = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData
        })

        if (res.ok) {
            ImageUploaded
        }
    }

    const handleFileChange = (e) => {
        //console.log(e.target.files[0])
        setImage(e.target.files[0])
    }
    
    return (
        <div className={styles.form}>
            <p><em><code>Select image from local folder</code></em></p>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input type="file" onChange={handleFileChange} />
                    
                    <Button fluid positive type="submit" className={styles.file} primary>Upload Image</Button>
                </div>
            </form>
        </div>
    )
}
