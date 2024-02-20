'use client';
import { Box, Input, Center, Heading, Button, Select } from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    FormHelperText,
  } from '@chakra-ui/react';
  import { ChevronDownIcon } from '@chakra-ui/icons';
  import Dropzone from 'react-dropzone';


function page(){

    return (
        <Center bg='lightgrey'  color='rgb(0, 19, 59)' mt='50px' ml={'150px'} mr={'150px'} mb={'50px'}>

        <Box maxW="480px" height={'500px'}> <center>
            <Heading mb={'30px'}>Upload Your Files</Heading></center>
            <form method="post" action="/">
            <FormControl isRequired>
  <FormLabel>Author</FormLabel>
  <Input variant='filled' placeholder='Enter the name' type='text' />
  <FormHelperText></FormHelperText>
</FormControl>

        <FormControl>
        <FormLabel>Description</FormLabel>
        <Input variant='filled' placeholder='Description' type='text' />
        <FormHelperText></FormHelperText>
        </FormControl>

        <FormControl isRequired> 
            
        <Select icon={<ChevronDownIcon />} placeholder='Select Media' >
        <option value='option1'>Image</option>
  <     option value='option2'>Video</option>
        <option value='option3'>Audio</option>
        <option value='option3'>Text-based post</option>
        <option value='option3'>GIFs/memes</option>
        <option value='option3'>URL/links to other content </option>
        </Select>
        <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl isRequired>
        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Box bg={'lightgreen'} p={'50px'} bgGradient="radial(gray.300, green.100, green.200)" >
        <p>Drag 'n' drop some files here, or click to select files</p>
        </Box>
      </div>
    </section>
  )}
</Dropzone>
<FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
            <center><Button type="submit"> upload </Button></center>
        </FormControl>

</form>
        </Box>
        </Center>
    )
    
    
}
export default page;