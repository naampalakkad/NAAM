'use client'
import { Box, Heading, Flex, Button } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const PDFViewer = dynamic(() => import('../components/PDFViewer'), {
  ssr: false,
});

const ScholorshipPage = () => {
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    setPdfUrl('./NAAM Scholarship.pdf');
  }, []);

  return (
    <Flex direction="column" align="center" justify="center" height="100vh" p={4} pt={"10vh"}>
      <Heading as="h1" mb={4} textAlign="center">Scholarship</Heading>
      <Box mb={4} width="100%" maxW="900px" fontSize={"160%"} textAlign="center">
        <p>Please read all the conditions carefully before submitting your application to 
           ensure that you do not miss out on this valuable opportunity.
        </p>
      </Box>
      <Box width="100%" maxW="900px" height="calc(100vh - 300px)" border="none" borderRadius="none" overflow="hidden" boxShadow="none">
        {pdfUrl && <PDFViewer pdfUrl={pdfUrl} hideToolbar={true} />}
      </Box>
      <Box mt={1} textAlign="center">
        <Button as="a" href="https://forms.gle/pvxUVKikua2m7rKo7" target="_blank" rel="noopener noreferrer" colorScheme="teal" size="lg" mt={2} boxShadow="sm">
          Click to Apply
        </Button>
      </Box>
    </Flex>
  );
};

export default ScholorshipPage;
