"use client"
import { useState } from "react"
import Form from "@/app/ui/form/form"


const EditPage = () => {
    const [work, setWork] = useState({
        creator: "",
        category: "",
        title: "",
        description: "",
        price: "",
        photos: []
    })
    return (
        <div>
            <Form type="edit" work={work}
                setWork={setWork} />
        </div>
    )
}

export default EditPage