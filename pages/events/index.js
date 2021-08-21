import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";

const PER_PAGE = 2

export async function getServerSideProps({ query: { page = 1 } }) {
  
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE
//Fetch Total/coun
  const totalRes = await fetch(
    `${API_URL}/events/count`
  );
  const total = await totalRes.json();

  //Events
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();

  return {
    props: { events, page: +page, total },
  }
}

export default function EventsPage({ events, total, page }) {
  //console.log(events);

  const lastPage =  Math.ceil(total / PER_PAGE)
//console.log(lastPage)
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No Event for now</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination total={total} page={page} lastPage={lastPage} />
    </Layout>
  );
}
