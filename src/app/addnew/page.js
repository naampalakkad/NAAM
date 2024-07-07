'use client'
import React, { useState, useRef } from 'react';
import { Input, Button, Select, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import './page.css';
import dynamic from 'next/dynamic';
import { saveposttodb, auth } from '@/lib/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from 'next/navigation';

if (typeof window !== 'undefined') {
  var ReactQuill = require('react-quill');
  require('react-quill/dist/quill.snow.css');
}
let ImageCompressor = null
if (typeof window !== "undefined") {
  import('image-compressor.js')
    .then((module) => {
      ImageCompressor = module.default;
    })
    .catch((err) => {
      console.error('Error loading ImageCompressor:', err);
    });
}

function Page() {
  const [value, setValue] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    thumbnail: '',
  });

  const quillRef = useRef();
  const fileInputRef = useRef(); // Add a ref for the file input
  const router= useRouter();
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
    ],
    clipboard: {
      matchVisual: false, // for link
    },
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
      title: '',
      thumbnail: '',
      type: '',
    });
    // Reset the Quill editor
    if (quillRef.current) {
      quillRef.current.getEditor().setContents('');
    }
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Thumbnail handle
  const [isfile, setFile] = useState(null);
  const handleImageAsFile = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!isfile) {
        window.alert("Please select a thumbnail photo.");
        return;
      }
      const quillContent = quillRef.current?.getEditor().getContents();

      let file = isfile;

      const compressor = new ImageCompressor();
      const compressedImage = await compressor.compress(file, {
        maxWidth: 720,
        maxHeight: 540,
        quality: 0.8,
        mimeType: 'image/webp',
      });


      const storage = getStorage();
      var storagePath = 'thumbnail/' + file.name;

      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, compressedImage);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            let postdata = {
              title: formData.title,
              thumbnail: downloadURL,
              content: quillContent,
              type: formData.type,
              time: new Date().getTime(),
              authorName: auth.currentUser.displayName,
            };
            saveposttodb(postdata);
          });
        });

      if (typeof window !== 'undefined') {
        window.alert("Form submitted");
      }
      resetForm();
      router.push("/posts");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className='container'>
      <h1>Upload Your Post<hr /></h1>

      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input variant='filled' placeholder='Enter the title' type='text' name='title' value={formData.title} onChange={onChangeHandler} required/>
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Type of post</FormLabel>
          <Select
            variant='filled'
            icon={<ChevronDownIcon />}
            placeholder='Select the type'
            name='type'
            value={formData.type}
            onChange={onChangeHandler}
            style={{ border: '2px solid black' }}
            required
          >
            <option value='EVENT'>Event</option>
            <option value='JOB'>Job</option>
            <option value='anoun'>Announcement</option>
            <option value='BLOG'>Blog</option>
          </Select>
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Thumbnail photo</FormLabel>
          <input
            type='file'
            name='thumbnail'
            accept='.png, .jpg, .jpeg'
            onChange={handleImageAsFile}
            ref={fileInputRef} 
            required
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Write your post here</FormLabel>
          {ReactQuill ? <ReactQuill
            ref={quillRef}
            value={value}
            onChange={(content) => setValue(content)}
            modules={modules}
            style={{ border: 'none', height: 'auto', borderRadius: '0' }}
            className='editor'
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
        <FormControl style={{ paddingTop: '25px' }}>
          <Button colorScheme='yellow' type='submit' className='submit-button' mt={4}  >
            Submit
          </Button>
        </FormControl>
      </form>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Page), { ssr: false });