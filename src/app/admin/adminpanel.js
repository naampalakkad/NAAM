import { Box, Heading, Stack } from '@chakra-ui/react';
import ImageManager from './ImageManager';

const AdminPage = () => {
  return (
    <Box p={5} pt={"10vh"}>
      <Heading mb={5}>Admin Panel</Heading>
      <Stack spacing={10}>
        <ImageManager title="Carousal Images" location="carousalimages" />
        <ImageManager title="Gallery Images" location="galleryimgs" />
      </Stack>
    </Box>
  );
};

export default AdminPage;


// facility to edut/upload images
// facility to add batch rep emials [aka emails with roles] aka user management
// Admin approve batch rep Batch rep approve users
// facility to accept posts // post management
// facility to approve teestimonials // testimonial management
// facility to approve events // event management
// ability to add new links in gallery
// Remove blogger role