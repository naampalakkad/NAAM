'use client'
import { Box, Heading, Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const PDFViewer = dynamic(() => import('../components/PDFViewer'), {
  ssr: false,
});

const ScholorshipPage = () => {
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    setPdfUrl('./law.pdf');
  }, []);

  return (
    <Flex direction="column" align="center" justify="center" height="100vh" p={4} pt={"10vh"}>
      <Heading as="h1" mb={4} textAlign="center">Scholorship</Heading>
      <Box width="100%" maxW="900px" height="calc(100vh - 150px)" borderWidth="1px" borderRadius="lg" overflow="hidden">
        {pdfUrl && <PDFViewer pdfUrl={pdfUrl} />}
      </Box>
    </Flex>
  );
};

export default ScholorshipPage;
