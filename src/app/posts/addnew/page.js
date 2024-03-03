'use client';

import React, { useState } from 'react';
import { Box, Input, Center, Heading, Button, Select } from "@chakra-ui/react";
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';
import { ChevronDownIcon} from '@chakra-ui/icons';
import { Textarea } from '@chakra-ui/react';
import Dropzone from 'react-dropzone';
import './page.css';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Page() {
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);


  const handleSubmit = (event) => {
    event.preventDefault();

    setAuthor('');
    setDescription('');
    setTitle('');
    setMediaType('');
    setUploadedFiles([]);
  };

  const [value, setValue] = useState('');

  const modules ={
    toolbar:[
      [{header: [1,2,3,4,5,6,false] }],
      [{ font: []}],
      [{ size: []}],
      ["bold", "italic", "underline" ,"strike","blockquote"],
      [
        { list:"ordered"},
        {list:"bullet"},
    ],
    ["link","image","video"]
    ]
  }
  const [formData,setFormData] = useState({
    author:'',
    title:'',
    description:'',
    thumbnail:''

  })
  const onChangeHandler =(e)=>{
    setFormData(()=>({
      ...formData,[e.target.name]:e.target.value
    }))
  }

  return (
    <div className='container'>
      <h1>Upload Your Post
      <hr></hr>
      </h1>
      
    <form onSubmit={handleSubmit}>
          <FormControl isRequired onChange={onChangeHandler} >
            <FormLabel className='font' htmlFor='author' >Author</FormLabel>
            <Input variant='filled' placeholder='Enter the name' type='text' name='author' />
            <FormHelperText></FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input variant='filled' placeholder='Enter the title' type='text' name='title' onChange={onChangeHandler} />
            <FormHelperText></FormHelperText>
          </FormControl>

          <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea minH={'100px'} backgroundColor={" rgb(218, 223, 228)"} name='description' onChange={onChangeHandler}></Textarea>
          <FormHelperText></FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Thumbnail photo</FormLabel>
               <input type='file' name='thumbnail'  onChange={onChangeHandler}></input>
            <FormHelperText></FormHelperText>
          </FormControl>

          <FormControl >
          <FormLabel>Write your post here</FormLabel>
          <ReactQuill theme="snow" value={value} onChange={(setValue) } 
              modules={modules}
              className='editor'
              />  
              
          <FormHelperText></FormHelperText>
          </FormControl>

          <FormControl>
            <center><Button type="submit" colorScheme={"blue"} onClick={()=>console.log(formData)}> UPLOAD </Button></center>
          </FormControl>
        </form>
        </div>      
  );
}

export default Page;

