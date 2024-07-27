import { Heading, Stack , Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box} from '@chakra-ui/react';
import ImageManager from './ImageManager';
import GalleryManager from './gallerymanager';
import ContentManager from './contentmanager';
const AdminPage = () => {
  return (
      <Stack spacing={5} width={"100vw"}>
       <Heading mb={5} alignSelf={"center"} p={10} m={5}>Admin Panel</Heading>
        <ContentManager/> 
        {/* <Accordion allowMultiple  width={"100vw"}>
        <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
            <Heading size="lg" color="teal.500">
              ContentManagement
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        <ContentManager/>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
            <Heading size="lg" color="teal.500">
              Carousal Images
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <ImageManager title="Carousal Images" location="carousalimages" />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
            <Heading size="lg" color="teal.500">
              Gallery Images
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <ImageManager title="Gallery Images" location="galleryimgs" />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
            <Heading size="lg" color="teal.500">
              Gallery Manager
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <GalleryManager />
        </AccordionPanel>
      </AccordionItem>
    </Accordion> */}
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