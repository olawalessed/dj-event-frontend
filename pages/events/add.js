import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from '@/styles/Form.module.css'
import Link from 'next/link'
import {API_URL} from '@/config/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AddEvent() {

    const [values, setValues] = useState({
        name: '',
        performers: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: ''
    })

    const router = useRouter()
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const hasEmptyFields = Object.values(values).some((element) => element === ''
        )
 
        if (hasEmptyFields) {
            toast.error('Please fill in all fields')
        }

        const res = await fetch(`${API_URL}/events`, {
            method: 'POST',
            headers: {
             'Content-type': 'application/json'  
            },
            body: JSON.stringify(values)
        })

        if (!res.ok) {
            toast.error('Something went wrong')
        } else {
            const evt = await res.json()
            toast.success('Item Added succesfully')
            router.push(`/events`)
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
//        console.log(name, value)
        setValues({...values, [name]: value})
        //setValues({...values, [name]: value})
        
    }
 
    return (
      <Layout title="Add New Event">
        <Link href="/events">
            <a> Go Back</a>
        </Link>
        <h1>Add New Event</h1>
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
                value={values.date}
                onChange={handleInputChange}
              />
            </div>

            {/* time */}
            <div>
              <label htmlFor="name">time</label>
              <input
                type="time"
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

            <input type="submit" values="Add Event" className='btn' />
        </form>
      </Layout>
    );
}
