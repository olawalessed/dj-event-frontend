import Layout from "@/components/Layout";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";
import styles from '@/styles/Dashboard.module.css'
import DashboardEvent from "@/components/DashboardEvent";
import router, { useRouter } from 'next/router'

export default function DashboardPage({ events }) {
  console.log(events)
  
  const router = useRouter()
    
  const deleteEvent = async (e) => {
    if (confirm("Are you sure")) {
      const res = await fetch(`${API_URL_PATH}/events/${evt.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  }
  
  return (
    <div>
      <Layout title="User Dashboard">
        <ToastContainer position="top-center" />
        <div className={styles.dash}>
          <h1>Dashboard</h1>
          <h3>My Events</h3>
          {events.map((evt) => (
            <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
          ))}
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)
  
  // console.log(token)

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const events = await res.json()
  console.log(events)

  return {
    props: {events},
  }
}