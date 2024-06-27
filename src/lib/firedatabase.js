import {getdatafromStorage,savedatatodb,getdatafromdb } from "@/lib/firebase";

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

export async function getStatistics() {
    const stats = await getdatafromdb('statistics');
    if (!stats) {
        savedatatodb('statistics', [
            { "title": "years", "text": "7" },
            { "title": "Years of Service", "text": "35+" },
            { "title": "Almunis", "text": "10k+" },
            { "title": "branches", "text": "10+" }
        ]);
        return [
            { "title": "years", "text": "7" },
            { "title": "Years of Service", "text": "35+" },
            { "title": "Almunis", "text": "10k+" },
            { "title": "branches", "text": "10+" }
        ];
    }
    return stats;
}

export async function getBlogPosts() {
    const posts = await getdatafromdb('blogposts');
    if (!posts) {
        savedatatodb('blogposts', {
            "posts": [
                {
                    "title": "Post 1",
                    "content": "This is the first post. this is some dummy text used to fill in the rest of the page, and this is some random text",
                    "image": "https://via.placeholder.com/150",
                    type: "offer",
                    author: "unnimaya",
                },
            ]
        });
        return {
            "posts": [
                {
                    "title": "Post 1",
                    "content": "This is the first post. this is some dummy text used to fill in the rest of the page, and this is some random text",
                    "image": "https://via.placeholder.com/150",
                    type: "offer",
                    author: "unnimaya",
                },
            ]
        };
    }
    return posts;
}

export async function getMenuItems() {
    const menuItems = await getdatafromdb('menuitems');
    if (!menuItems) {
        savedatatodb('menuitems', [
            { name: 'Gallery', link: 'gallery' },
            { name: 'Alumni', link: 'alumni' },
            { name: 'News', link: 'posts' },
            { name: 'Calendar', link: 'calendar' },
            { name: 'Profile', link: 'login' },
        ]);
        return [
            { name: 'Gallery', link: 'gallery' },
            { name: 'Alumni', link: 'alumni' },
            { name: 'News', link: 'posts' },
            { name: 'Calendar', link: 'calendar' },
            { name: 'Profile', link: 'login' },
        ];
    }
    return menuItems;
}

export async function getFooterMenuItems() {
    const footerMenuItems = await getdatafromdb('footermenuitems');
    if (!footerMenuItems) {
        savedatatodb('footermenuitems', [
            { name: 'About Us', link: 'aboutus' },
            { name: 'Bye-Law', link: 'law' },
            { name: 'Profile', link: 'login' },
        ]);
        return [
            { name: 'About Us', link: 'aboutus' },
            { name: 'Bye-Law', link: 'law' },
            { name: 'Profile', link: 'login' },
        ];
    }
    return footerMenuItems;
}

export async function getSocialMediaUrls() {
    const socialUrls = await getdatafromdb('socialmediaurls');
    if (!socialUrls) {
        savedatatodb('socialmediaurls', [
            "https://www.linkedin.com",
            "https://www.facebook.com",
            "https://www.twitter.com",
            "https://www.instagram.com",
            "https://www.youtube.com"
        ]);
        return [
            "https://www.linkedin.com",
            "https://www.facebook.com",
            "https://www.twitter.com",
            "https://www.instagram.com",
            "https://www.youtube.com"
        ];
    }
    return socialUrls;
}

export async function getGalleryPhotos() {
    const galleryPhotos = await getdatafromdb('galleryphotos');
    if (!galleryPhotos) {
        savedatatodb('galleryphotos', [
            { src: "assets/galleryimages/1.jpg", width: 560, height: 320 },
            { src: "assets/galleryimages/2.jpg", width: 720, height: 480 },
            { src: "assets/galleryimages/3.jpg", width: 640, height: 360 },
        ]);
        return [
            { src: "assets/galleryimages/1.jpg", width: 560, height: 320 },
            { src: "assets/galleryimages/2.jpg", width: 720, height: 480 },
            { src: "assets/galleryimages/3.jpg", width: 640, height: 360 },
        ];
    }
    return galleryPhotos;
}

export async function getTestimonials() {
    const testimonials = await getdatafromdb('testimonials');
    if (!testimonials) {
        savedatatodb('testimonials', [
            {
                name: "Sreejith KS",
                batch: "25th Batch",
                testimonial: "I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good. I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good.",
                image: "https://www.w3schools.com/w3images/avatar2.png",
            },
        ]);
        return [
            {
                name: "Sreejith KS",
                batch: "25th Batch",
                testimonial: "I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good. I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good.",
                image: "https://www.w3schools.com/w3images/avatar2.png",
            },
        ];
    }
    return testimonials;
}

export async function getAboutNAAM() {
    const aboutNAAM = await getdatafromdb('aboutnaam');
    if (!aboutNAAM) {
        savedatatodb('aboutnaam', {
            about: "NAAM (Navodaya Alumni Association Malampuzha), unites Alumnis from Jawahar Navodaya Vidyalaya Palakkad. We celebrate shared experiences, fostering connections, and giving back to our alma mater and the community.",
            mission: "NAAM unites Jawahar Navodaya Vidyalaya Palakkad alumni, fostering lifelong connections and professional growth. Our mission is to celebrate shared experiences, give back to our alma mater, and engage in impactful community initiatives. NAAM stands for camaraderie, excellence, and service, embodying the values instilled by Jawahar Navodaya Vidyalaya Palakkad."
        });
        return {
            about: "NAAM (Navodaya Alumni Association Malampuzha), unites Alumnis from Jawahar Navodaya Vidyalaya Palakkad. We celebrate shared experiences, fostering connections, and giving back to our alma mater and the community.",
            mission: "NAAM unites Jawahar Navodaya Vidyalaya Palakkad alumni, fostering lifelong connections and professional growth. Our mission is to celebrate shared experiences, give back to our alma mater, and engage in impactful community initiatives. NAAM stands for camaraderie, excellence, and service, embodying the values instilled by Jawahar Navodaya Vidyalaya Palakkad."
        };
    }
    return aboutNAAM;
}

export async function getPersonalDetailsData() {
    const personalDetails = await getdatafromdb('personaldetailsdata');
    if (!personalDetails) {
        savedatatodb('personaldetailsdata', [
            {
                prop: "Name",
                name: "name",
                default: "Enter your name",
                type: "text"
            },
        ]);
        return [
            {
                prop: "Name",
                name: "name",
                default: "Enter your name",
                type: "text"
            },
        ];
    }
    return personalDetails;
}

export async function getPhotoTilesData() {
    const photoTiles = await getdatafromdb('phototilesData');
    if (!photoTiles) {
        savedatatodb('phototilesData', [
            {
                imageUrl: 'https://firebasestorage.googleapis.com/v0/b/naam-751a5.appspot.com/o/galleryimgs%2F1-small.webp?alt=media&token=507d4913-9500-4b92-9c30-1cd68891383f',
                text: 'Get Together 2021',
                link: 'https://photos.app.goo.gl/DAAhH2DiYoqy9ohP8'
            },
        ]);
        return [
            {
                imageUrl: 'https://firebasestorage.googleapis.com/v0/b/naam-751a5.appspot.com/o/galleryimgs%2F1-small.webp?alt=media&token=507d4913-9500-4b92-9c30-1cd68891383f',
                text: 'Get Together 2021',
                link: 'https://photos.app.goo.gl/DAAhH2DiYoqy9ohP8'
            },
        ];
    }
    return photoTiles;
}