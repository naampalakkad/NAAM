import React from 'react';
import Image from 'next/image';


// pull in the photos from the google photos link and display them in a grid

let photosurl ="https://photos.app.goo.gl/DAAhH2DiYoqy9ohP8";
let photos = [
    {
        url: "https://picsum.photos/200/300",
        caption: "A photo of a cat",
        width: 300,
        height: 200
    },
    {
        url: "https://picsum.photos/200/300",
        caption: "A photo of a cat",
        width: 300,
        height: 200
    },
    {
        url: "https://picsum.photos/200/300",
        caption: "A photo of a cat",
        width: 300,
        height: 200
    },
    {
        url: "https://picsum.photos/200/300",
        caption: "A photo of a cat",
        width: 300,
        height: 200
    },
    {
        url: "https://picsum.photos/200/300",
        caption: "A photo of a cat",
        width: 300,
        height: 200
    },
    {
        url: "https://picsum.photos/200/300",
        caption: "A photo of a cat",
        width: 300,
        height: 200
    },
    {
        url: "https://picsum.photos/200/300",
        caption: "A photo of a cat",
        width: 300,
        height: 200
    },
    {
        url: "https://picsum.photos/200/300",
        caption: "A photo of a cat",
        width: 300,
        height: 200
    },
    {
        url: "https://picsum.photos/200/300",
        caption: "A photo of a cat",
        width: 300,
        height: 200
    },
    {
        url: "https://picsum.photos/200/300",
        caption: "A photo of a cat",
        width: 300,
        height: 200
    },
];

let styles = {
    gallerypanel: {
        width: "80%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "0.1rem"
    },
    galleryitem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        borderRadius: "10px"
    }
};

export default function Gallerypanel(){
    return (
          <div className="gallerypanel" style={styles.gallerypanel} >
                {photos.map((photo, index) => (
                    <div key={index} className="galleryitem" style={styles.galleryitem}>
                        <Image src={photo.url} alt={photo.caption} width={photo.width} height={photo.height} style={styles.image}  />
                    </div>
                ))}
            </div>
      );
}


