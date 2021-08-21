import Link from 'next/link'
import { Button } from 'semantic-ui-react';


export default function Pagination({ page,lastPage }) {
  return (
    <div>
      {page > 1 && (
        <Link href={`/events/?page=${page - 1}`}>
          <Button secondary>Prev</Button>
        </Link>
      )}
      {page < lastPage && (
        <Link href={`/events/?page=${page + 1}`}>
          <Button secondary>Next</Button>
        </Link>
      )}
    </div>
  )
}
