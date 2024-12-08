"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import Loader from '@/app/ui/Loader/loader';
import Form from '@/app/ui/form/form';

const UpdateWorkPage = () => {
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const workId = searchParams.get("id");
    const [work, setWork] = useState({
        category: "",
        title: "",
        description: "",
        price: "",
        photos: [],
    });

    useEffect(() => {
        const getWorkDetails = async () => {
            const response = await fetch(`/api/work/${workId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();

            setWork({
                category: data.category,
                title: data.title,
                description: data.description,
                price: data.price,
                photos: data.workPhotoPaths,
            });
            setLoading(false);
        };
        if (workId) {
            getWorkDetails();
        }
    }, [workId]);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        try {
          const updateFormWork = new FormData()
    
          for (var key in work) {
            updateFormWork.append(key, work[key])
          }
    
          work.photos.forEach((photo) => {
            updateFormWork.append("workPhotoPaths", photo)
          })
    
          const response = await fetch(`/api/work/${workId}`, {
            method: "PATCH",
            body: updateFormWork
          })
          if (response.ok) {
            router.push('/dashboard')
          }
    
    
        } catch (err) {
          console.log("Publish Work failed", err.message)
        }
      }


    return loading ? (
        <Loader />
    ) : (

        <>
            <Form
                type="Edit"
                work={work}
                setWork={setWork}
                handleSubmit={handleSubmit}
            />

        </>
    )
}

export default UpdateWorkPage