import React, { Suspense, lazy } from 'react';
import { Heading, Stack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';
const ImageManager = lazy(() => import('./ImageManager'));
const GalleryManager = lazy(() => import('./gallerymanager'));
const ContentManager = lazy(() => import('./contentmanager'));
const BatchRepManager = lazy(() => import('./batchrepmanager'));
const AdminUserManagerPanel = lazy(()=> import('./adminusermanagerpanel'))

const LazyLoadComponent = ({ component: Component, ...rest }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...rest} />
  </Suspense>
);

const AdminPage = () => {
  return (
    <Stack spacing={5} width={"100vw"}>
         <Heading 
        m={3} 
        alignSelf={"center"} 
        size="2xl"
      >
        Admin Panel
      </Heading>
      <Accordion width={"100vw"} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Heading size="lg" color="teal.500">Content Management</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <LazyLoadComponent component={ContentManager} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Heading size="lg" color="teal.500">Carousal Images</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <LazyLoadComponent component={ImageManager} title="Carousal Images" location="carousalimages" />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Heading size="lg" color="teal.500">Gallery Images</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <LazyLoadComponent component={ImageManager} title="Gallery Images" location="galleryimgs" />
          </AccordionPanel>
        </AccordionItem> 
         <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Heading size="lg" color="teal.500">Gallery Manager</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <LazyLoadComponent component={GalleryManager} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Heading size="lg" color="teal.500">Batch Rep Management</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <LazyLoadComponent component={BatchRepManager} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Heading size="lg" color="teal.500">User Management</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <LazyLoadComponent component={AdminUserManagerPanel} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
};

export default AdminPage;