'use client';
import React, { useState, useEffect } from "react";
import { Box, Heading, Button, IconButton, useToast } from "@chakra-ui/react";
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import { getDatabase, ref, get } from 'firebase/database'; 
import { update,remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { addLike, removeLike, getLikesCount } from '@/lib/firebase'; // Adjust the path accordingly
import "./Modal.css"; // Import your custom CSS file here

// Initialize Firebase
const auth = getAuth(); // Initialize auth
const db = getDatabase(); 

export const BlogPost = ({ post }) => {
    const postId = post[0]; // Assuming the post ID is the first element
    const postdata = post[1];
    const postDate = new Date(postdata.time);
    const formattedDate = postDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    const [modal, setModal] = useState(false);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const toast = useToast();

    useEffect(() => {
        // Fetch like status and count when the component mounts
        const fetchLikes = async () => {
            try {
                // Replace with actual function to check if the user has liked the post
                const currentUserId = auth.currentUser.uid;
                const hasLiked = (await get(ref(db, `posts/${postId}/likes/${currentUserId}`))).exists();
                setLiked(hasLiked);

                const likeCount = await getLikesCount(postId);
                setLikes(likeCount);
            } catch (error) {
                console.error('Error fetching like data:', error);
            }
        };

        fetchLikes();
    }, [postId]);

    const handleLike = async () => {
        try {
            const userId = auth.currentUser.uid;
            if (liked) {
                // Remove like
                await removeLike(postId, userId);
                setLiked(false);
                setLikes(prevLikes => prevLikes - 1);
                toast({
                    title: "Like removed",
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                // Add like
                await addLike(postId, userId);
                setLiked(true);
                setLikes(prevLikes => prevLikes + 1);
                toast({
                    title: "Like added",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error handling like:', error);
        }
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
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
            <Box p="20px" borderBottom="px solid" backgroundColor="#161a30" width={"400px"}>
                <img
                    src={postdata.thumbnail}
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
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                        <IconButton
                            icon={liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
                            onClick={handleLike}
                            colorScheme={liked ? 'blue' : 'gray'}
                            size="sm"
                            mr="2"
                        />
                        <p>{likes}</p>
                    </Box>
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
