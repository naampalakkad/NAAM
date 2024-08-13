'use client'
import React, { useState, useRef } from 'react';
import { Input, Button, Select, FormControl, FormLabel, FormHelperText, useToast } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import './page.css';
import dynamic from 'next/dynamic';
import {  auth, getdatafromdb, savedatatodb } from '@/lib/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from 'next/navigation';
import AdminApprovalWarning from '@/lib/approvalwarning'

if (typeof window !== 'undefined') {
  var ReactQuill = require('react-quill');
  require('react-quill/dist/quill.snow.css');
}

let ImageCompressor = null;
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
    type: '',
  });



  const quillRef = useRef();
  const fileInputRef = useRef();
  const router = useRouter();
  const toast = useToast(); 

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
  const [isfile, setFile] = useState(null); 

  const saveTestimonialToDb = async (testimonialContent) => {
    let user = await getdatafromdb("approvedUsers/"+auth.currentUser.uid);
    try {
      let testimonialData = {
        authorName: user.name || "unavailable",
        content: testimonialContent,
        photo: user.photoURL || "",
        batch: user.batch || "unavailable",
        time: new Date().getTime(),
      };
  
      savedatatodb("content/pendingtestimonials/" +testimonialData.time,testimonialData)
  
      toast({
        title: "Testimonial saved successfully!",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
  
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast({
        title: "Error saving testimonial.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
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
    setFile(e.target.files[0]);
  }


  const handleCancel =()=>{
    window.location.href = "/posts";

  }
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!formData.type) {
        toast({
          title: "Type of post",
          description: "Please select the type of post.",
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
        return;
      }

      if (!formData.title) {
        toast({
          title: "Title",
          description: "Please enter the title.",
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
        return;
      }
      event.preventDefault();
      if (!isfile) {
        toast({
          title: "Thumbnail photo",
          description: "Please select a thumbnail photo.",
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
        return;
      }
      const quillContent = quillRef.current?.getEditor().getContents();
      if (value.trim() === '') {
        toast({
          title: "Post content",
          description: "Please write something about your post.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
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
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          let postdata = {
            title: formData.title,
            thumbnail: downloadURL,
            content: quillContent,
            type: formData.type,
            time: new Date().getTime(),
            authorName: auth.currentUser.displayName || "unavailable",
            likes: {} 
          };
          savedatatodb('content/pendingposts/'+postdata.time,postdata)
          toast({
            title: "Success",
            description: "Form submitted.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          resetForm();
          router.push("/posts");
        });
      });

    } catch (error) {
      throw error;
    }
  };
  const handleTestimonialExtraAction = async () => {
    try {
      const testimonialContent = value.trim();
      if (testimonialContent.split(/\s+/).length > 70) {
        toast({
          title: "Limit exceeded",
          description: "Testimonial content should not exceed 70 words.",
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
        return;
      }

      if (!testimonialContent) {
        toast({
          title: "Testimonial",
          description: "Please write your testimonial.",
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
        return;
      }
      await saveTestimonialToDb(testimonialContent);
      resetForm();
      router.push("/");

    } catch (error) {
      console.error('Error adding testimonial:', error);
    }
  };

  return (
    <div className='container'>
      <h1 style={{fontFamily:'open Sans'}}>Upload Your Post<hr /></h1>
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
          <Button onClick={handleTestimonialExtraAction} colorScheme="blue" mt={4}>Add Testimonial</Button>
        </FormControl>
      ) : (
        <>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input variant='filled' placeholder='Enter the title' type='text' name='title' value={formData.title} onChange={onChangeHandler} required />
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
            <Button onClick={handleSubmit} colorScheme='yellow' type='submit' className='submit-button' mt={4}  >
              Submit
            </Button>
            <Button onClick={handleCancel} colorScheme='red' mt={4} ml={2}>
              Cancel
            </Button>
          </FormControl>
          <AdminApprovalWarning/>
        </>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(Page), { ssr: false });