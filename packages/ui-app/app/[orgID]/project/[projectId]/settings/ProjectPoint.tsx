
import { useParams, useRouter } from "next/navigation"


export default function ProjectPoint () {
  const params = useParams()
  console.log(params)
  return <div>Project Status</div>
}
