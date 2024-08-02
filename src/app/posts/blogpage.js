'use client';
import React, { useState, useEffect } from "react";
import { Box, Heading, Button, IconButton, useToast, Textarea, VStack, useColorMode } from "@chakra-ui/react";
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import { savedatatodb, getdatafromdb,auth ,getLikesCount,removeLike,addLike} from '@/lib/firebase';
import "./Modal.css";

export const BlogPost = ({ post }) => {
    const { colorMode } = useColorMode();
    const postId = post[0];
    const postdata = post[1];
    const postDate = new Date(postdata.time);
    const formattedDate = postDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    const [modal, setModal] = useState(false);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const toast = useToast();

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

                if (currentUserId) {
                    const hasLiked = await getdatafromdb(`content/approvedposts/${postId}/likes/${currentUserId}`);
                    setLiked(!!hasLiked);
                }

                const likeCount = await getLikesCount(postId);
                setLikes(likeCount);
            } catch (error) {
                console.error('Error fetching like data:', error);
            }
        };
        fetchLikes();

        const fetchComments = async () => {
            try {
                const commentsData = await getdatafromdb(`content/approvedposts/${postId}/comments`);
                setComments(commentsData ? Object.values(commentsData) : []);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, [postId]);

    const handleLike = async () => {
        try {
            if (!auth.currentUser) {
                toast({
                    title: "You need to sign in to like posts",
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
            const userId = auth.currentUser.uid;
            if (liked) {
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

    const handleCommentSubmit = async () => {
        try {
            if (!auth.currentUser) {
                toast({
                    title: "You need to sign in to comment",
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
            const user = auth.currentUser;
            const cmtData = {
                username: user.displayName || 'Anonymous',
                comment: newComment,
                time: Date.now()
            };
            savedatatodb(`content/approvedposts/${postId}/comments/${cmtData.time}`, cmtData);
            setNewComment("");
            toast({
                title: "Comment added",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error adding comment:', error);
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
                        <Box mt="4">
                            <Heading size="md" mb="2" color="black">Comments</Heading>
                            <Box mt="4" display="flex" alignItems="center">
                                <Textarea
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    mb="2"
                                    color="black"
                                    className="comment-textarea"
                                    borderColor={colorMode === 'dark' ? 'white' : 'black'}
                                    _placeholder={{ color: 'black' }}
                                />
                                <Button onClick={handleCommentSubmit} colorScheme="teal" ml="2" className="submit-button">Submit</Button>
                            </Box>
                            <VStack align="stretch" spacing="4">
                                {comments.map((comment, index) => (
                                    <Box key={index} p="4" className="comment-box" borderRadius="md">
                                        <div className="comment-content">
                                            <span className="comment-username">{comment.username}</span>
                                            <span className="comment-date">{new Date(comment.time).toLocaleString()}</span>
                                        </div>
                                        <p className="comment-text">{comment.comment}</p>
                                    </Box>
                                ))}
                            </VStack>
                        </Box>
                    </div>
                </div>
            )}
        </Box>
    );


};
