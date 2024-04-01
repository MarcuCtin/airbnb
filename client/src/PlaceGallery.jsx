import React from 'react'
import { useState } from 'react';
const PlaceGallery = ({place}) => {
    
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    
    if (showAllPhotos) {
        return (
            <div className='absolute inset-0 bg-black min-w-full min-h-screen'>
                <div className='p-8 grid bg-black gap-4'>
                    <div>
                        <h2 className='text-white text-3xl'>Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className='right-8 top-8 shadow flex shadow-blackflex gap-1 py-2 px-4 rounded-2xl bg-black fixed text-white bg-white text-black'>
                            Close
                        </button>
                    </div>
                    {
                        place?.addedPhotos?.length > 0 && place.addedPhotos.map(photo => (
                            <div>
                                <img  className=' w-full' src={'http://localhost:8080/' + photo} alt="" />
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
  return (
    <div className="relative">
                <div className='rounded-2xl shadow shadow-lg overflow-hidden  grid gap-2 grid-cols-[2fr_1fr]'>
                    <div className=''>
                        {place.addedPhotos?.[0] && (
                            <div>
                                <img onClick={() => setShowAllPhotos(true)} className=' aspect-square object-cover' src={'http://localhost:8080/' + place.addedPhotos?.[0]} />

                            </div>
                        )}

                    </div>
                    <div className='grid '>
                        {place.addedPhotos?.[1] && (
                            <img onClick={() => setShowAllPhotos(true)} className='aspect-square object-cover' src={'http://localhost:8080/' + place.addedPhotos?.[1]} />
                        )}
                        <div className=' overflow-hidden'>
                            {place.addedPhotos?.[2] && (
                                <img onClick={() => setShowAllPhotos(true)} className='relative top-2 aspect-square object-cover' src={'http://localhost:8080/' + place.addedPhotos?.[2]} />
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={() => setShowAllPhotos(true)} className='absolute bottom-2 right-2 py-2 px-2 bg-white shadow shadow-md shadow-gray-500 rounded-xl opacity-80 font-semibold'>Show More Photos</button>
            </div>
  )
}

export default PlaceGallery