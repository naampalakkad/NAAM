//let photossrc ="https://photos.app.goo.gl/DAAhH2DiYoqy9ohP8";

export const photogalleryurl = "https://photos.app.goo.gl/DAAhH2DiYoqy9ohP8";
import {getdatafromStorage} from "@/lib/firebase";

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
        prop: "Facebook",
        name: "facebook",
        default: "Enter your Facebook Profile",
        type: "text"
    },
    {
        prop: "Occupation",
        name: "occupation",
        default: "Enter your occupation",
        type: "text"
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
    }
]
