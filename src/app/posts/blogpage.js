'use client'
import React, { useState, useEffect } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import "./Modal.css";

export const BlogPost = ({ post }) => {
    let postdata = post[1];
    const defaultImage = "./assets/logo.webp";
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




    return (
        <Box
            mb={['20px', '0']}
            borderRadius="8px"
            overflow="hidden"
            boxShadow="md"
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
            <h2>Hello Modal</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              perferendis suscipit officia recusandae, eveniet quaerat assumenda
              id fugit, dignissimos maxime non natus placeat illo iusto!
              Sapiente dolorum id maiores dolores? Illum pariatur possimus
              quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
              placeat tempora vitae enim incidunt porro fuga ea.
            </p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
        </Box>

        
    );
};
