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
//import ModalItem from "@/components/Modal";
import { Button, Icon, Modal, Header } from "semantic-ui-react";
import axios from "axios";
import EditForm from "@/components/EditForm";
import ModalContainer from "@/components/ModalContainer";


//passing the prop to the Component

export default function EditEventPage({ evt }) {
  //States

  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  })

  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  )

  //Open modal
  const [showModal, setShowModal] = useState(false);

  const router = useRouter()

  //Set image file from form to formdata
  const [image, setImage] = useState(null);

  //Actions

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

  //Image actions
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append("files", image)
    formData.append("ref", "events")
    formData.append("refId", evt.id)
    formData.append("field", "image")

    axios.post(`${API_URL}/upload`, formData)
      .then((response) => {
        console.log(response.data[0].id);
        const imageId = response.data[0].id;
        axios.put(`${API_URL}/events/${evt.id}`, { image: imageId })
          .then((response) => {
            toast.success("Image ID Restrived");
            console.log("Image ID Restrived");

            setImagePreview(response.data[0].image.formats.thumbnail.url)
            setShowModal(false)
            router.asPath

          })
          .catch((error) => {
            toast.warning("Gobe shele")
            console.log(error)
          });
      })
      .catch((error) => {
        console.log(error);
      });
    
    setImagePreview()
  };

   
  const imageSize = evt.image.formats.thumbnail
  
  
  
  return (
    <Layout title="Edit Event">
      <EditForm
        handleSubmit={handleSubmit}
        values={values}
        evt={evt}
        handleInputChange={handleInputChange}
        imagePreview={imagePreview}
        imageSize={imageSize}
      />
      <ModalContainer
        showModal={showModal}
        evtId={evt.id}
        handleUpload={handleUpload}
        handleFileChange={handleFileChange}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Layout>
  );
}



//Getting information from the server. SSR
export async function getServerSideProps({ req, params: { id } }) {
  const res = await fetch(`${API_URL}/events/${id}`);

  const evt = await res.json();
  console.log(req.headers.cookie);
  return {
    props: { evt },
  };
}