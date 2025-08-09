import { getdatafromStorage } from "@/lib/firebase";

export let thememode = 'dark';

export async function getCarouselImageUrls() {
  const carouselImageUrls = getdatafromStorage('carousalimages');
  return carouselImageUrls;
}

export const statistics = [
  {
    "title": "years Legacy",
    "text": "30",
  },
  {
    "title": "Batches",
    "text": "29",
  },
  {
    "title": "Almunis",
    "text": "2k+",
  },
  {
    "title": "Years",
    "text": "7",
  }
]

export const MenuItems = [
  { name: 'Home', link: '/' },
  { name: 'Gallery', link: '/gallery' },
  { name: 'Scholorship', link: '/scholorship' },
  { name: 'Alumni', link: '/alumni' },
  { name: 'Articles', link: '/posts' },
  { name: 'Calendar', link: '/calendar' },
  { name: 'Profile', link: '/profile' },
];

export const FooterMenuItems = [
  { name: 'About Us', link: '/aboutus' },
  { name: 'ByLaw', link: '/law' },
  { name: 'Profile', link: '/profile' },
  { name: 'Scholorship', link: '/scolorship' },

];

export const socialMediaUrls = [
  "https://www.linkedin.com/groups/4107176/",
  "https://www.facebook.com/groups/jnvitesalumni/",
  // "https://www.x.com",
  // "https://www.instagram.com",
  "https://www.youtube.com/@navodayaalumniassociationm5762"
];


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
    name: "email",
    default: "Enter your email",
    type: "email"
  },
  {
    prop: "Batch",
    name: "batch",
    default: "Enter your batch,  eg: 25",
    type: "number"
  },
  {
    prop: "Number",
    name: "number",
    default: "Enter your Mobile number",
  },
  {
    prop: "Alternate Number",
    name: "alternate",
    default: "Enter your Alternate number",
    type: "number"
  },

  {
    prop: "JNV Roll No",
    name: "rollno",
    default: "Enter your JNV Roll No.",
    type: "number"
  },
  {
    prop: "LinkedIn",
    name: "linkedIn",
    default: "EG : https://www.linkedin.com/in/username",
    type: "text"
  },
  {
    prop: "Facebook",
    name: "facebook",
    default: "EG: https://www.facebook.com/username",
    type: "text"
  },
  {
    prop: "Current Location",
    name: "location",
    default: "Select your current location",
    type: "selectable",
    options: "locationlist"
  },
  {
    prop: "Native Location",
    name: "nativelocation",
    default: "Select your native location",
    type: "selectable",
    options: "nativelocationlist"
  },
  {
    prop: "Profession",
    name: "profession",
    default: "Select your profession",
    type: "selectable",
    options: "professionlist"
  },
  {
    prop: "Specialization",
    name: "specialization",
    default: "Select your specialization",
    type: "selectable",
    options: "specializationlist"
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
