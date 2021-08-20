import styles from '@/styles/Form.module.css'
import { Button } from 'semantic-ui-react'



export default function Uploader({ handleUpload, handleFileChange }) {
  return (
    <div>
      <div className={styles.form}>
        <p>
          <em>
            <code>Select image from local folder</code>
          </em>
        </p>
        <form onSubmit={handleUpload}>
          <div className={styles.file}>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            <Button
              fluid
              positive
              type="submit"
              className={styles.file}
              primary
            >
              Upload Image
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
