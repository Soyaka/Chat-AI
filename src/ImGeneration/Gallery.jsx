import React, { useState } from 'react'
import {Image} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
import {ImageGenerator} from '../API/Replicate'
import {Button} from "@nextui-org/react";
import {CameraIcon} from '../_Ext/CameraIcon';

const Gallery = () => {

    const [imgSrc, setimgSrc] = useState("https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg")
    const [value, setValue] = React.useState("");

    const HandleSubmit= async(e)=>{
        e.preventDefault();
        console.log(value)
        const InfUrl  = await ImageGenerator(value)
        console.log(InfUrl)

        setimgSrc(InfUrl)
    }








  return (
    <div className=' flex flex-col gap-10  p-4 items-center justify-center border relative left-[8em] top-[5em] w-[70%]'>
           <Image
            width={300}
            alt="NextUI hero Image"
            src= {imgSrc}
            />
      <form action="" onSubmit={e => HandleSubmit(e)} className='flex flex-row p-2 gap-2 ' >
            <Textarea
                value={value}
                onValueChange={setValue}
                variant="bordered"
                labelPlacement="outside"
                placeholder="Enter your description"
                defaultValue="a beautiful women walk on a trail "
                className="max-w-md  "
        />
            <Button onClick={e => HandleSubmit(e) } color="success" endContent={<CameraIcon/>}>
                Take a photo
            </Button>    
      </form>
    </div>
  )
}

export default Gallery
