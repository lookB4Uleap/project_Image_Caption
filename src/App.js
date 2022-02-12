import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import ImageUploading from 'react-images-uploading'


export default function App() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="min-h-full min-w-full flex flex-col justify-center items-center py-5">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="flex flex-col justify-center items-start">
            <button
              style={isDragging ? { borderColor: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
              className="flex flex-col border-solid border-2 self-center items-center justify-center border-indigo-900 m-2 p-10 rounded-md hover:border-red-700"
            >
              <FontAwesomeIcon icon={faPlus} className="text-indigo-900" />
              <small className="w-2/3">Click or Drop here</small>
            </button>

            <button onClick={onImageRemoveAll}
              className="border-solid border-2 self-center border-indigo-900 w-100 m-2 p-2 rounded-full"
            >
              Remove all images
            </button>
            {imageList.map((image, index) => (
              <>
                <div className="w-screen border-t border-indigo-800"></div>
                <div key={index} className="flex flex-col flex-wrap justify-center items-center self-center  md:flex-row py-2">
                  <img src={image['data_url']} alt="" className="w-full md:h-auto shadow-lg md:w-full" style={{ maxWidth: "700px" }} />
                  <div className="flex flex-row items-center justify-center p-2">
                    <button onClick={() => onImageUpdate(index)} className="border-solid border-2 border-indigo-900 ml-10 mr-10 mb-2 mt-2 w-50 p-2 rounded-full">Update</button>
                    <button onClick={() => onImageRemove(index)} className="border-solid border-2 border-indigo-900 ml-10 mr-10 mb-2 mt-2 w-50 p-2 rounded-full">Remove</button>
                  </div>
                </div>
              </>

            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}