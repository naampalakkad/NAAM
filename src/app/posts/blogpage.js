'use client'
import React, { useState } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import "./Modal.css"; // Import your custom CSS file here

export const BlogPost = ({ post }) => {
    let postdata = post[1];
    const postDate = new Date(postdata.time);
    const formattedDate = postDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
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
            <Box p="20px" borderBottom="px solid" backgroundColor="#161a30">
                <img
                    src={postdata.thumbnail }
                    className="post-thumbnail" 
                    alt="Thumbnail"
                />
                <Box display="flex" justifyContent="space-between" alignItems="baseline" mb="2">
                <p style={{ flex: '1', textAlign: 'left', marginBottom: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    Author: {postdata.authorName || 'Unknown Author'}
                </p>
                <p style={{ textAlign: 'right', fontSize: '0.6em' }}>{formattedDate}</p>
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
                </Box>
                <Box textAlign="right">
                    <Button colorScheme="teal" size="sm" mt="2" onClick={toggleModal} className="btn-modal">
                        Read more
                    </Button>
                </Box>
            </Box>
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay modal-overlay"></div>
                    <div className="modal-container">
                        <div className="modal-container-controls">
                            <button className="close-modal modal-container-close-button" onClick={toggleModal}>CLOSE</button>
                        </div>
                        <div className="modal-container-content">
                            <div style={{ textAlign: 'center' }}>
                                <strong style={{ fontSize: '40px' }}>{postdata.title}</strong>
                            </div>
                            <ReactQuill value={postdata.content} readOnly={true} modules={{ toolbar: false }} />
                        </div>
                    </div>
                </div>
            )}
        </Box>
    );
};
