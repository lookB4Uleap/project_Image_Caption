import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Rings } from 'react-loader-spinner'
// import { URL } from 'url'

const CaptionDisplay = () => {
    const [file, setFile] = useState()
    const [caption, setCaption] = useState("")
    const [preview, setPreview] = useState(false)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState({})
    // const URL = "https://projectImageGenerator.anishsarkar.repl.co/api/generate-caption"
    // const URL = 'http://127.0.0.1:5000/'
    const URL = 'https://captioneer.azurewebsites.net/'

    const uploadImage = () => {
        setLoading(true)
        const formData = new FormData()
        formData.append("image", file)
        console.log(file)
        axios.post(URL + 'api/generate-caption', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res.data)
                setImage(res.data)
                setCaption(res.data.caption)
                setLoading(false)
            })
            .catch(err => console.log(err))
        setPreview(true)
    }

    const fileChangeHandler = (e) => {
        setFile(e.target.files[0])
        // const objectUrl = URL.createObjectURL(file)
        // setPreview(objectUrl)
        setPreview(false)
    }

    return (
        <div className='flex w-4/5 justify-center items-center flex-col'>
            {
                // preview && image && caption 
                !loading?
                    <>
                        <div className='flex justify-evenly items-center flex-col'>
                            <input
                                type='file' name='image' id='image'
                                className='border-solid border-2 self-center border-indigo-900 w-100 m-2 px-4 py-2 rounded-full'
                                onChange={fileChangeHandler}
                            />
                            <button
                                className='border-solid border-2 self-center border-indigo-900 w-100 m-2 px-4 py-2 rounded-full'
                                onClick={uploadImage}
                            >
                                Upload
                            </button>
                        </div>
                        {
                            preview && image ?
                                <>
                                    <div className="w-full border-t border-indigo-800 my-4"></div>
                                    <img src={`${URL}${image.path}`}
                                        className="w-full md:h-auto shadow-2xl md:w-full"
                                        style={{ maxWidth: "500px" }}
                                    />
                                    <div className='font-mono text-lg my-5'>{caption}</div>
                                </>
                                : <></>
                        }
                    </> :
                    <Rings color="#00BFFF" height={100} width={100} />
            }
        </div>
    )
}

export default CaptionDisplay