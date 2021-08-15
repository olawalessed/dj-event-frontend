import { useRouter } from "next/router";




export default function EditEvent() {

    const router = useRouter()
    const id = router.query.id
    
    console.log(id)

    return (
        <div>
            <h1>Page ID is {id}</h1>
        </div>
    )
}
