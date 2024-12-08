
import "@/styles/WorkList.scss"
import WorkCard from "../workcard/WorkCard"

const WorkLiist = ({ data }) => {
    return (
        <div className="work-list">
            {data.map((work) => (
                <WorkCard
                    key={work._id}
                    work={work}
                />
            ))}

        </div>
    )
}

export default WorkLiist