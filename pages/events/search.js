import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import qs from 'qs'
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/router";

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
      _where: {
          _or: [
              {name_contains: term},
              {performers_contains: term},
              {description_contains: term},
              {venue_contains: term}
          ]
      }
  });

  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events },
  };
}

export default function SearchPage({ events }) {

  const router = useRouter()

  return (
    <Layout>
      <h1>Search Results For: {router.query.term} </h1>

      <div className=''>
      </div>
        

      {events.length === 0 && <h3>No Event for now</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}
