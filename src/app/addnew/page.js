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

// Function to handle saving testimonial data to Firebase
const saveTestimonialToDb = async (formData, testimonialContent) => {
  try {
    let testimonialData = {
      authorName: auth.currentUser.displayName,
      content: testimonialContent,
      time: new Date().getTime(),
    };

    // Save testimonial data to 'teste' collection in Firebase
    await saveposttodb('teste', testimonialData);

    // Optionally, you can redirect or show a success message
    window.alert("Testimonial saved successfully!");
  } catch (error) {
    console.error('Error saving testimonial:', error);
    // Handle error as needed
  }
};

function Page() {
  const [value, setValue] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    thumbnail: '',
    type: '',
  });

  const quillRef = useRef();
  const fileInputRef = useRef();
  const router = useRouter();
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
      matchVisual: false,
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
    if (quillRef.current) {
      quillRef.current.getEditor().setContents('');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageAsFile = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      thumbnail: e.target.files[0],
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!formData.type) {
        window.alert("Please select the type of post.");
        return;
      }
      if (formData.type === 'test') {
        // Handle testimonial data
        const testimonialContent = value.trim();
        if (testimonialContent.split(/\s+/).length > 70) {
          window.alert("Testimonial content should not exceed 70 words.");
          return;
        }
        if (!testimonialContent) {
          window.alert("Please write your testimonial.");
          return;
        }
        await saveTestimonialToDb(formData, testimonialContent);
      } else {
        // Handle regular post data
        if (!fileInputRef.current || !fileInputRef.current.files[0]) {
          window.alert("Please select a thumbnail photo.");
          return;
        }

        const file = fileInputRef.current.files[0];
        const compressor = new ImageCompressor();
        const compressedImage = await compressor.compress(file, {
          maxWidth: 720,
          maxHeight: 540,
          quality: 0.8,
          mimeType: 'image/webp',
        });

        const storage = getStorage();
        const storagePath = 'thumbnails/' + file.name;
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
            let postdata = {
              title: formData.title,
              thumbnail: downloadURL,
              content: quillRef.current?.getEditor().getContents(),
              type: formData.type,
              time: new Date().getTime(),
              authorName: auth.currentUser.displayName,
            };
            saveposttodb('posts', postdata); // Save regular post to 'posts' collection
          });
        });
      }

      if (typeof window !== 'undefined') {
        window.alert("Form submitted");
      }
      resetForm();
      router.push("/posts");
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='container'>
      <h1>Upload Your Post<hr /></h1>
      <form onSubmit={handleSubmit}>
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
            <option value='test'>Testimonial</option>
          </Select>
          <FormHelperText></FormHelperText>
        </FormControl>

        {formData.type === 'test' ? (
          <FormControl isRequired>
            <FormLabel>Write your testimonial</FormLabel>
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ border: '2px solid black', minHeight: '100px' }}
              className='testimonial-textarea'
              required
            />
            <FormHelperText>{`${value.trim().split(/\s+/).length} / 70 words`}</FormHelperText>
          </FormControl>
        ) : (
          <>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input variant='filled' placeholder='Enter the title' type='text' name='title' value={formData.title} onChange={onChangeHandler} required/>
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
          </>
        )}

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
