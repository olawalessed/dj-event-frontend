import moment from "moment";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Form.module.css";
import Link from "next/link";
import { API_URL } from "@/config/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import ModalItem from "@/components/Modal";
import { Button, Icon } from "semantic-ui-react";




//Getting information from the server. SSR
export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/events/${id}`);

  const evt = await res.json();
  //console.log(evt);
  return {
    props: { evt },
  };
}

//passing the prop to the Component

export default function EditEventPage({ evt }) {
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });

  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  );

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error("Something went wrong");
    } else {
      const evt = await res.json();
      toast.success("Item deleted succesfully");
      router.push(`/events`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Edit Event">
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
          <Image rounded src={imagePreview} height={200} width={350} />
        ) : (
          <div>
            <p>No image uploaded</p>
          </div>
        )}
      </div>
      <div>
        <ModalItem show={showModal} />
      </div>
    </Layout>
  );
}
