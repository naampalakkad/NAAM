'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Select, FormControl, FormLabel, FormHelperText} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import './page.css';
import dynamic from 'next/dynamic';

if (typeof window !== 'undefined') {
  var ReactQuill = require('react-quill');
  require('react-quill/dist/quill.snow.css');
}
import { saveposttodb,checkuserrole } from '@/lib/firebase';

function Page() {
  const [value, setValue] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    thumbnail: '',
  });

  const quillRef = useRef();

  useEffect(() => {
    const fetchUserRole = async () => {
        const isUserAdmin = await checkuserrole('blogger');
        
        setIsAdmin(isUserAdmin);
    };

    fetchUserRole();
  }, []);

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
    setValue('');
    setFormData({
      author: '',
      title: '',
      description: '',
      thumbnail: '',
    });
    if (quillRef.current) {
      quillRef.current.getEditor().setContents('');
    }

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const quillContent = quillRef.current?.getEditor().getContents();

    let postdata = {
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
    resetForm();
  };

  const processOp = (op) => {
    if (typeof op.insert === 'object' && op.insert.image) {
      return `Image: ${op.insert.image}`;
    }

    return op.insert;
  };



  return (
    <div className='container'>
      {isAdmin ? (
        <>
          <h1>
            Upload Your Post
            <hr />
          </h1>
  
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input 
                variant='filled' 
                placeholder='Enter the title' 
                type='text' 
                name='title' 
                value={formData.title} 
                onChange={onChangeHandler} 
              />
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
                style={{ border: '2px solid black' }} 
              >
                <option value='EVENT'>Event</option>
                <option value='JOB'>Job</option>
                <option value='anoun'>Announcement</option>
                <option value='BLOG'>Blog</option>
              </Select>
              <FormHelperText></FormHelperText>
            </FormControl>      
  
            <FormControl>
              <FormLabel>Thumbnail photo</FormLabel>
              <input 
                type='file' 
                name='thumbnail' 
                onChange={onChangeHandler} 
              />
              <FormHelperText></FormHelperText>
            </FormControl>
  
            <FormControl>
              <FormLabel>Write your post here</FormLabel>
              {ReactQuill ? (
                <ReactQuill
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
              ) : (
                <textarea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  style={{ border: 'none', height: 'auto', borderRadius: '0' }}
                  className='editor'
                />
              )}
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
        </>
      ) : (
        <div>
          <h1>You are not registered as a blogger.</h1>
          <p>To add posts, kindly contact the admin and get yourself enrolled as a blogger.</p>
        </div>
      )}
    </div>
  );
}
  
export default dynamic(() => Promise.resolve(Page),{ssr:false});