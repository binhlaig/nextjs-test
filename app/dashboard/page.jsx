
import { handleLogout } from "@/components/action"
import Feed from "../ui/feed/Feed"

const dashboardPage = () => {
    return (
        <div>
            <Feed/>
            <form action={handleLogout}>
                <button>Logout</button>
            </form>
        </div>
    )
}

export default dashboardPage