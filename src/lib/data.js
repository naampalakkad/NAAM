export const photogalleryurl = "https://photos.app.goo.gl/DAAhH2DiYoqy9ohP8";
import {getdatafromStorage} from "@/lib/firebase";

export let thememode = 'dark';

export async function getCarouselImageUrls() {
    const carouselImageUrls = getdatafromStorage('carousalimages');
    return carouselImageUrls;
}

export async function getGalleryImageUrls() {
    const galleryImageUrls = [];
    const urls = await getdatafromStorage('galleryimgs');
    for (let i = 0; i < urls.length; i++) {
        const galleryImageUrl = urls[i];
        const img = new Image();
        img.onload = function() {
            const width = this.width;
            const height = this.height;
            const imgdata = { src: galleryImageUrl, width: width, height: height };
            galleryImageUrls.push(imgdata);
        };
        img.src = galleryImageUrl;
    }
    while (galleryImageUrls.length < urls.length) {
        await new Promise(r => setTimeout(r, 1000));
    }
    return galleryImageUrls;
}

export const statistics = [
    {
        "title": "years",
        "text": "7",
    },
    {
        "title": "Years of Service",
        "text": "35+",
    },
    {
        "title": "Almunis",
        "text": "10k+",
    },
    {
        "title": "branches",
        "text": "10+",
    }
]

export const blogposts = {
    "posts": [
        {
            "title": "Post 1",
            "content": "This is the first post. this is some dummy text used to fill in the rest of the page, and this is some random text",
            "image": "https://via.placeholder.com/150",
            type: "offer",
            author: "unnimaya",
        },
        {
            "title": "Post 2",
            "content": "This is the second post. this is some dummy text used to fill in the rest of the page, and this is some random text",
            "image": "https://via.placeholder.com/150",
            type: "blog",
            author: "Sreejith KS",
        },
        {
            "title": "Post 3",
            "content": "This is the third post. this is some dummy text used to fill in the rest of the page, and this is some random text",
            "image": "https://via.placeholder.com/150",
            type: "announcement",
            author: "Suneeb vishnu",
        },
        {
            "title": "Post 4",
            "content": "This is the fourth post. this is some dummy text used to fill in the rest of the page, and this is some random text",
            "image": "https://via.placeholder.com/150",
            type: "blog",
            author: "Anjitha J",
        },
    ]
}

export const MenuItems = [
    { name: 'Gallery', link: 'gallery' },
    { name: 'Alumni', link: 'alumni' },
    { name: 'News', link: 'posts' },
    { name: 'Calender', link: 'calender' },
    { name: 'Profile', link: 'login' },
];

export const FooterMenuItems = [
    { name: 'About Us', link: 'aboutus' },
    { name: 'Bye-Law', link: 'law' },
    { name: 'Profile', link: 'login' },
];

export const socialMediaUrls = [
    "https://www.linkedin.com",
    "https://www.facebook.com",
    "https://www.twitter.com",
    "https://www.instagram.com",
    "https://www.youtube.com"
];

export const galleryphotos = [
    { src: "assets/galleryimages/1.jpg", width: 560, height: 320 },
    { src: "assets/galleryimages/2.jpg", width: 720, height: 480 },
    { src: "assets/galleryimages/3.jpg", width: 640, height: 360 },
    { src: "assets/galleryimages/4.jpg", width: 480, height: 240 },
    { src: "assets/galleryimages/5.jpg", width: 800, height: 600 },
    { src: "assets/galleryimages/6.jpg", width: 720, height: 480 },
    { src: "assets/galleryimages/7.jpg", width: 600, height: 400 },
    { src: "assets/galleryimages/8.jpg", width: 640, height: 360 },
    { src: "assets/galleryimages/9.jpg", width: 500, height: 300 },
    { src: "assets/galleryimages/10.jpg", width: 400, height: 300 },
];

export let testimonial = [
    {
        name: "Sreejith KS",
        batch: "25th Batch",
        testimonial: "I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good. I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good.",
        image: "https://www.w3schools.com/w3images/avatar2.png",
    },
    {
        name: "Anjitha J",
        batch: "25th Batch",
        testimonial: "I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good. I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good.",
        image: "https://www.w3schools.com/w3images/avatar2.png",
    },
    {
        name: "Unnimaya T",
        batch: "5th Batch",
        testimonial: "I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good. I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good.",
        image: "https://www.w3schools.com/w3images/avatar2.png",
    },
    {
        name: "suneeb",
        batch: "17th Batch",
        testimonial: "I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good. I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good.",
        image: "https://www.w3schools.com/w3images/avatar2.png",
    },
]

export let aboutnaam = {

    about: " NAAM (Navodaya Alumni Association Malampuzha), unites Alumnis from Jawahar Navodaya Vidyalaya Palakkad. We celebrate shared experiences, fostering connections, and giving back to our alma mater and the community.",
    mission: "NAAM unites Jawahar Navodaya Vidyalaya Palakkad alumni, fostering lifelong connections and professional growth. Our mission is to celebrate shared experiences, give back to our alma mater, and engage in impactful community initiatives. NAAM stands for camaraderie, excellence, and service, embodying the values instilled by Jawahar Navodaya Vidyalaya Palakkad."
}

export let personaldetailsdata = [
    {
        prop: "Name",
        name: "name",
        default: "Enter your name",
        type: "text"
      },
      {
        prop: "Email",
        name:"email",
        default: "Enter your email",
        type: "email"
      },
      {
        prop: "Batch",
        name: "batch",
        default: "Enter your batch,  eg: 25",
        type: "Number"
      },
      {
        prop: "Number",
        name:"number",
        default: "Enter your Mobile number",
        type: "Number"
      },
      {
        prop: "Alternate Number",
        name:"Alternate number",
        default: "Enter your Alternate number",
        type: "Number"
      },
      {
        prop: "Current Location",
        name: "location",
        default: "Select your current location",
        type: "select",
        options: ["Location1", "Location2", "Location3"]  
      },
      {
        prop: "Native Location",
        name: "location2",
        default: "Select your native location",
        type: "select",
        options: ["Location4", "Location5", "Location6"]  
      },
      {
        prop: "Profession",
        name: "profession",
        default: "Select your profession",
        type: "select",
        options: ["Profession1", "Profession2", "Profession3"]  
      },
      {
        prop: "Specialization",
        name: "specialization",
        default: "Select your specialization",
        type: "select",
        options: ["Specialization1", "Specialization2", "Specialization3"]  
      },
      {
        prop: "JNV Roll No",
        name: "rollno",
        default: "Enter your JNV Roll No",
        type: "Number"
      },
      {
        prop: "LinkedIn",
        name: "linkedIn",
        default: "Enter your LinkedIn Profile",
        type: "text"
      },
      {
        prop: "Facebook",
        name: "facebook",
        default: "Enter your Facebook Profile",
        type: "text"
      },
      {
        prop: "About",
        name: "about",
        default: "tell us about you",
        type: "textarea"
      },
      {
        prop: "Share Phone Number",
        name: "phoneperm",
        default: true,
        type: "checkbox"
      },
      

]

export const phototilesData = [
    {
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/naam-751a5.appspot.com/o/galleryimgs%2F1-small.webp?alt=media&token=507d4913-9500-4b92-9c30-1cd68891383f',
      text: 'Get Together 2021',
      link: 'https://photos.app.goo.gl/DAAhH2DiYoqy9ohP8'
    },
    {
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/naam-751a5.appspot.com/o/galleryimgs%2F4-small.webp?alt=media&token=6b9b0e06-0328-441a-91e1-1c3c79213ce8',
      text: 'Get Together 2022',
      link: 'https://photos.app.goo.gl/DAAhH2DiYoqy9ohP8'
    },
    {
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/naam-751a5.appspot.com/o/galleryimgs%2F3-small.webp?alt=media&token=7e7f50c9-e73c-46a5-8452-894446ba998e',
        text: 'Milan',
        link: 'https://photos.app.goo.gl/DAAhH2DiYoqy9ohP8'
      },
      {
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/naam-751a5.appspot.com/o/galleryimgs%2F2-small.webp?alt=media&token=bbb56e27-5a4a-4850-92bd-bc248634ad42',
        text: 'Dubhai section',
        link: 'https://photos.app.goo.gl/DAAhH2DiYoqy9ohP8'
      },
      {
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/naam-751a5.appspot.com/o/galleryimgs%2F5-small.webp?alt=media&token=10953dcc-ff8a-4449-aec9-d3e8e4b2954f',
        text: 'Navodaya Malampuzha',
        link: 'https://photos.app.goo.gl/DAAhH2DiYoqy9ohP8'
      },
  ];