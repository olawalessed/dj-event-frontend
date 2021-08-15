import Layout from '@/components/Layout'
import {API_URL} from '@/config/index'
import EventItem from '@/components/EventItem'


export async function getStaticProps () {
  const res = await fetch(`${API_URL}/events`)
  const events = await res.json()

  return {
    props: { events },
    revalidate: 1
  }
}


export default function EventsPage({events}) {

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No Event for now</h3>}


      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      

    </Layout>
  )
}



