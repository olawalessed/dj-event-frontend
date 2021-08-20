import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import styles from '@/styles/Form.module.css'
import moment from 'moment'
import {Image} from 'semantic-ui-react'


export default function EditForm({evt, values, imageSize, handleSubmit, handleInputChange, imagePreview }) {

  return (
    <div>
      <Link href="/events">
        <a> Go Back</a>
      </Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          {/* Name */}
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>

          {/* Venue */}
          <div>
            <label htmlFor="name">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>

          {/* address */}
          <div>
            <label htmlFor="name">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>

          {/* performers */}
          <div>
            <label htmlFor="name">performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>

          {/* date */}
          <div>
            <label htmlFor="name">date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>

          {/* time */}
          <div>
            <label htmlFor="name">time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* description */}
        <div>
          <label htmlFor="name">Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" values="Update Event" className="btn" />
      </form>

      <div>
        <h2>Event Image</h2>
        {evt.image ? (
          <Image
            src={imagePreview}
            height={imageSize.height}
            width={imageSize.width}
          />
        ) : (
          <div>
            <p>No image uploaded</p>
          </div>
        )}
      </div>
      <div>
        {/* Modal here */}

        <div></div>
      </div>
    </div>
  );
}
