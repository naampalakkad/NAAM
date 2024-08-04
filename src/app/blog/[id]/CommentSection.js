'use client';
import { useEffect, useState } from 'react';
import { auth, getdatafromdb, savedatatodb } from '@/lib/firebase';
import { Box, Textarea, Button, VStack, Text, HStack, Spinner, useToast } from '@chakra-ui/react';

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loadingComments, setLoadingComments] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchComments = async () => {
      if (postId) {
        const commentsFromDb = await getdatafromdb(`content/approvedposts/${postId}/comments`);
        if (commentsFromDb) {
          const commentsArray = Object.entries(commentsFromDb).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setComments(commentsArray);
        }
        setLoadingComments(false);
      }
    };
    fetchComments();
  }, [postId]);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleAddComment = async () => {
    if (!auth.currentUser) {
      toast({
        title: 'You need to sign in to post a comment',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (commentText.trim() === '') {
      toast({
        title: 'Comment cannot be empty',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const newComment = {
        username: auth.currentUser.displayName,
        content: commentText,
        timestamp: new Date().getTime(),
      };
      await savedatatodb(`content/approvedposts/${postId}/comments`, newComment);
      setComments([...comments, newComment]);
      setCommentText('');
      toast({
        title: 'Comment added',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: 'Error adding comment',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack align="start" spacing={4} w="full" pt={4}>
      <Text fontSize="lg" mb={2}>Comments</Text>
      {loadingComments ? (
        <Spinner size="lg" />
      ) : (
        comments.map((comment) => (
          <Box key={comment.id} p={4} w="full" borderWidth="1px" borderRadius="lg">
            <HStack justifyContent="space-between">
              <Text fontWeight="bold">{comment.username}</Text>
              <Text fontSize="sm" color="gray.500">
                {new Date(comment.time).toLocaleString()}
              </Text>
            </HStack>
            <Text>{comment.comment}</Text>
          </Box>
        ))
      )}
      <Textarea
        value={commentText}
        onChange={handleCommentChange}
        placeholder="Add a comment..."
        size="sm"
        mt={4}
      />
      <Button colorScheme="blue" onClick={handleAddComment} mt={2}>
        Post Comment
      </Button>
    </VStack>
  );
}
