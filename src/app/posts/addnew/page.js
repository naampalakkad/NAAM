'use client'
import React, { useState, useRef } from 'react';
import {Box,Input,Center,Heading, Button,Select,FormControl,FormLabel,FormHelperText,Textarea,} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Dropzone from 'react-dropzone';
import './page.css';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Page() {
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    description: '',
    thumbnail: '',
  });

  const quillRef = useRef(); 

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
    ],
  };

  const onChangeHandler = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const quillInstance = quillRef.current?.getEditor();

    if (quillInstance) {
      console.log({
        author: formData.author,
        title: formData.title,
        description: formData.description,
        thumbnail: formData.thumbnail,
        content: quillInstance.getContents(),
      });
    } else {
      console.error("Quill instance is not available");
    }

  
    setFormData({
      author: '',
      title: '',
      description: '',
      thumbnail: '',
    });
    setValue('');
  };

  return (
    <div className='container'>
      <h1>
        Upload Your Post
        <hr />
      </h1>

      <form onSubmit={handleSubmit}>
        <FormControl isRequired onChange={onChangeHandler}>
          <FormLabel className='font' htmlFor='author'>
            Author
          </FormLabel>
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
          <Textarea minH={'100px'} backgroundColor={' rgb(218, 223, 228)'} name='description' onChange={onChangeHandler}></Textarea>
          <FormHelperText></FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Thumbnail photo</FormLabel>
          <input type='file' name='thumbnail' onChange={onChangeHandler}></input>
          <FormHelperText></FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Write your post here</FormLabel>
          <ReactQuill
            ref={quillRef} 
            theme='snow'
            value={value}
            onChange={(content) => setValue(content)}
            modules={modules}
            style={{ border: 'none', minHeight: '200px', borderRadius: '0' }}
            className='editor'
          />
          <FormHelperText></FormHelperText>
        </FormControl>

        <FormControl>
          <center>
            <Button type='submit' colorScheme={'blue'}>
              UPLOAD
            </Button>
          </center>
        </FormControl>
      </form>
    </div>
  );
}
export default Page;
