import { Heading, Stack } from '@chakra-ui/react';
import ImageManager from './ImageManager';
import GalleryManager from './gallerymanager';
import ContentManager from './contentmanager';
const AdminPage = () => {
  return (
      <Stack spacing={5} width={"90vw"}>
       <Heading mb={5} alignSelf={"center"} p={10} m={5}>Admin Panel</Heading>
        <ContentManager/>
        {/*
        <ImageManager title="Carousal Images" location="carousalimages" />
        <ImageManager title="Gallery Images" location="galleryimgs" />
        <GalleryManager/> */}
      </Stack>
  );
};

export default AdminPage;


// facility to edut/upload images => Done
// ability to add new links in gallery => Done
// facility to accept posts // post management
// facility to approve teestimonials // testimonial management
// facility to approve events // event management
// Remove blogger role
// facility to add batch rep emials [aka emails with roles] aka user management
// Admin approve batch rep Batch rep approve users