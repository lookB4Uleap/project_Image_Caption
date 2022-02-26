import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Caption = ({ image }) => {
    const [caption, setCaption] = useState("")

    useEffect(() => {
        const URL = "https://projectImageGenerator.anishsarkar.repl.co/api/generate-caption"
        console.log(image)
        const formData = new FormData()
        formData.append("image", image.file, image.file.name)
        console.log(formData)
        axios.post(URL, formData
            , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then(res => setCaption(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='w-full flex justify-center items-center'>{caption}</div>
    )
}

export default Caption