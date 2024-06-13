'use client'
import React, { useState, useEffect } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import "./Modal.css";

export const BlogPost = ({ post }) => {
    let postdata = post[1];
    console.log(postdata);
    const defaultImage = "https://source.unsplash.com/800x600/?letter,d";
    const postDate = new Date(postdata.time);
    const formattedDate = postDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });


    const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  if (typeof window !== 'undefined') {
    var ReactQuill = require('react-quill');
    require('react-quill/dist/quill.snow.css');
  }

    return (
        <Box
            mb={['20px', '0']}
            borderRadius="8px"
            overflow="hidden"
            boxShadow="md"
            bg="#161a30"
            color="white"
            style={{ flex: '0 0 auto', maxWidth: ['100%', '50%'] }}
        >

            <Box p="20px" borderBottom="1px solid" backgroundColor="#161a30">
                <img
                    src={postdata.thumbnail || defaultImage}
                    alt={postdata.title}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
                />
                <Box display="flex" justifyContent="space-between" alignItems="baseline" mb="2">
                    <p style={{ textAlign: 'left', marginBottom: '5px' }}>Author: {postdata.authorName}</p>
                    <p style={{ textAlign: 'right', fontSize: '0.6em'}}>{formattedDate}</p>
                </Box>
                <Heading fontSize={['xl', '2xl']} mb="2" textAlign="center" color="yellow">{postdata.title}</Heading>
                <Box
                    maxH="4.5em"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="normal"
                    lineHeight="1.5em"
                    maxLines={3}
                    mb="2"
                >
                    <p>{postdata.description}</p>
                </Box>
                <Box textAlign="right">
                    <Button colorScheme="teal" size="sm" mt="2" onClick={toggleModal} className="btn-modal">
                            Read more
                    </Button>
                </Box>
            </Box>
            {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>{postdata.title}</h2>
            <img src={postdata.thumbnail} alt={"thumbnail"}></img>
            <ReactQuill value={postdata.content} readOnly={true} modules={{toolbar: false}}/>

            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
        </Box>

        
    );
};
