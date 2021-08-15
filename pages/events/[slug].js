import Layout from "@/components/Layout";
import Link from "next/link";
import styles from "@/styles/Event.module.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";
//import { API_URL } from "@/config/";


const API_URL_PATH = "http://localhost:3001";

export async function getStaticPaths() {
  const res = await fetch(`${API_URL_PATH}/events`);
  const events = await res.json();

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));

  //console.log(paths)

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  //console.log(slug)
  const res = await fetch(`${API_URL_PATH}/events?slug=${slug}`);
  const event = await res.json();
  console.log(event)
  return {
    props: {
      evt: event[0],
    },
  };
}

export default function SingleEventPage({ evt }) {
  //console.log(evt);

  const deleteEvent = (e) => {
    console.log("delete");
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <Link href="#">
            <a className={styles.delete} onClick={deleteEvent}>
              <FaTimes /> Delete Event
            </a>
          </Link>
        </div>

        <span>
          {evt.date} at {evt.time}
        </span>
        <h1>{evt.name}</h1>

        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image.formats.thumbnail.url} width={960} height={600} />
          </div>
        )}

        <h3>Performers</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a className={styles.back}>Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}
