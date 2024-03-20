'use client'
import React, { useState, useRef } from 'react';
import { Box, Input, Button, Select, FormControl, FormLabel, FormHelperText, Textarea, } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import './page.css';

if (typeof window !== 'undefined') {
  var ReactQuill = require('react-quill');
  require('react-quill/dist/quill.snow.css');
}
import { saveposttodb } from '@/lib/firebase';

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

  const resetForm = () => {
    setAuthor('');
    setDescription('');
    setValue('');
    setFormData({
      author: '',
      title: '',
      description: '',
      thumbnail: '',
    });
    // Reset the Quill editor
    if (quillRef.current) {
      quillRef.current.getEditor().setContents('');
    }

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const quillContent = quillRef.current?.getEditor().getContents();

    let postdata = {
      authorName: formData.author,
      description: formData.description,
      title: formData.title,
      thumbnail: formData.thumbnail,
      content: quillContent,
      type: formData.type,
      time: new Date().getTime(),
    };

    saveposttodb(postdata)
    if (typeof window !== 'undefined') {
      window.alert("Form submitted");
    }
    resetForm(); // Reset the form after submission
  };

  const processOp = (op) => {
    if (typeof op.insert === 'object' && op.insert.image) {
      return `Image: ${op.insert.image}`;
    }

    return op.insert;
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
          <Input variant='filled' placeholder='Enter the name' type='text' name='author' value={formData.author} />
          <FormHelperText></FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input variant='filled' placeholder='Enter the title' type='text' name='title' value={formData.title} onChange={onChangeHandler} />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Type of post</FormLabel>
          <Select
            variant='filled'
            icon={<ChevronDownIcon />}
            placeholder='Select the type'
            name='type'
            value={formData.type}
            onChange={onChangeHandler}
          >
            <option value='EVENT'>Event</option>
            <option value='JOB'>Job</option>
            <option value='anoun'>Announcement</option>
            <option value='BLOG'>Blog</option>
          </Select>
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea minH={'100px'} backgroundColor={' rgb(218, 223, 228)'} name='description' value={formData.description} onChange={onChangeHandler}></Textarea>
          <FormHelperText></FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Thumbnail photo</FormLabel>
          <input type='file' name='thumbnail' value={formData.thumbnail} onChange={onChangeHandler}></input>
          <FormHelperText></FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Write your post here</FormLabel>
          { ReactQuill ? <ReactQuill
            ref={quillRef}
            value={value}
            onChange={(content) => setValue(content)}
            modules={modules}
            style={{ border: 'none', height: 'auto', borderRadius: '0' }}
            className='editor'
            onKeyUp={() => {
              const editor = quillRef.current?.getEditor();
              if (editor) {
                const height = Math.max(editor.container.clientHeight, 200);
                editor.container.style.height = `${height}px`;
              }
            }}
          />
          :
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ border: 'none', height: 'auto', borderRadius: '0' }}
            className='editor'
          />
          }
          <FormHelperText></FormHelperText>
        </FormControl>

        <FormControl>
          <center>
            <Button type='submit' colorScheme={'blue'} >
              UPLOAD
            </Button>
          </center>
        </FormControl>
      </form>
    </div>
  );
}
export default Page;
