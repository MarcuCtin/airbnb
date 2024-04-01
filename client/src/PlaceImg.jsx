import React from 'react'

const PlaceImg = ({place,index=0,className=null}) => {
    if(!place.addedPhotos?.length){return '';}
  if(!className){
    className = 'object-cover';
}
    return (
        <img className={className} src={'http://localhost:8080/'+place.addedPhotos[index]} alt="" />
  )
}

export default PlaceImg