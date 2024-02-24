'use client';

import React, { useState } from 'react';
import { Box, Input, Center, Heading, Button, Select } from "@chakra-ui/react";
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Textarea } from '@chakra-ui/react';
import Dropzone from 'react-dropzone';

function Page() {
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileDrop = (acceptedFiles) => {
    setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
  };

  const getDropzoneLabel = () => {
    if (mediaType === 'option1') {
      return ''; 
    } else {
      return 'Drop your files here'; 
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setAuthor('');
    setDescription('');
    setTitle('');
    setMediaType('');
    setUploadedFiles([]);
  };

  return (
    <Center bg='lightgrey' color='rgb(0, 19, 59)' mt='50px' ml={'150px'} mr={'150px'} mb={'50px'}>
      <Box maxW="480px" height={'600px'}>
        <center>
          <Heading mb={'30px'}>Upload Your Files</Heading>
        </center>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Author</FormLabel>
            <Input variant='filled' placeholder='Enter the name' type='text' />
            <FormHelperText></FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <Select
              icon={<ChevronDownIcon />}
              placeholder='Select Media'
              onChange={(e) => setMediaType(e.target.value)}
              value={mediaType}
            >
              <option value='option1'>Text-based post</option>
              <option value='option2'>File Upload</option>
            </Select>
            <FormHelperText></FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input variant='filled' placeholder='Enter the title' type='text' onChange={(e) => setTitle(e.target.value)} />
            <FormHelperText></FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Content</FormLabel>
            {mediaType === 'option1' ? (
              <Textarea variant='filled' placeholder='Enter your text here' onChange={(e) => setDescription(e.target.value)} />
            ) : (
              <Dropzone onDrop={handleFileDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} multiple />
                      <Box p={'50px'} style={{ background: '#8491d7', borderRadius: '8px' }}>
                        <p>{getDropzoneLabel()}</p>
                        {uploadedFiles.length > 0 && (
                          <div>
                            <p>Selected Files:</p>
                            <ul>
                              {uploadedFiles.map((file, index) => (
                                <li key={index}>{file.name}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </Box>
                    </div>
                  </section>
                )}
              </Dropzone>
            )}
            <FormHelperText></FormHelperText>
          </FormControl>

          <FormControl>
            <center><Button type="submit" colorScheme="green"> upload </Button></center>
          </FormControl>
        </form>
      </Box>
    </Center>
  );
}

export default Page;
<<<<<<< HEAD
=======





>>>>>>> 975a548041406b2d5156d952a8f722acc6f68bbe
