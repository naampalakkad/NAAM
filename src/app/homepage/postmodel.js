import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Heading,
  HStack,
  VStack,
  Text,
  Badge,
  Button,
  Textarea,
  Image,
  useToast,
  useColorMode,
} from '@chakra-ui/react';
import { getdatafromdb, savedatatodb, auth } from '@/lib/firebase';

const PostModal = ({ isOpen, onClose, selectedPost }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const toast = useToast();
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (selectedPost) {
      const fetchComments = async () => {
        const commentsFromDb = await getdatafromdb(`content/approvedposts/${selectedPost[0]}/comments`);
        if (commentsFromDb) {
          const commentsArray = Object.values(commentsFromDb);
          commentsArray.sort((a, b) => b.time - a.time);
          setComments(commentsArray);
        } else {
          setComments([]);
        }
      };
      fetchComments();
    }
  }, [selectedPost]);

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
        time: Date.now(),
      };
      await savedatatodb(`content/approvedposts/${selectedPost[0]}/comments/${cmtData.time}`, cmtData);
      setNewComment("");
      setComments((prev) => [cmtData, ...prev]);
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent maxWidth="70%">
        <ModalHeader textAlign="center">
          <Heading size="lg">{selectedPost?.[1]?.title}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mx="auto" p={5}>
            <HStack spacing={2} mb={4}>
              <Badge colorScheme="yellow">{selectedPost?.[1]?.authorName}</Badge>
              <Badge colorScheme="blue">{selectedPost?.[1]?.type}</Badge>
            </HStack>
            <VStack spacing={4} align="start">
              {selectedPost?.[1]?.content.ops.map((op, idx) => {
                if (op.insert && typeof op.insert === 'string') {
                  return (
                    <Text key={idx} textAlign="justify" id={`section-${idx}`}>
                      {op.attributes && op.attributes.bold ? <strong>{op.insert}</strong> : op.insert}
                    </Text>
                  );
                } else if (op.attributes && op.attributes.header) {
                  return (
                    <Heading key={idx} size={op.attributes.header === 1 ? 'lg' : 'md'}>
                      {op.insert}
                    </Heading>
                  );
                } else if (op.insert.image) {
                  return <Image key={idx} src={op.insert.image} alt="Image" maxWidth="100%" />;
                }
              })}
            </VStack>
            <Box mt={5} p={5} bg={colorMode === 'light' ? "gray.200" : "gray.600"}>
              <Text mb={4} fontSize="lg" fontWeight="bold">Comments</Text>
              <Box maxH="300px" overflowY="auto">
                {comments.length > 0 ? comments.map((cmt, idx) => (
                  <Box key={idx} mb={4}>
                    <Text fontWeight="bold">{cmt.username}</Text>
                    <Text fontSize="sm">{cmt.comment}</Text>
                  </Box>
                )) : <Text>No comments yet.</Text>}
              </Box>
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                mb={2}
              />
              <Button colorScheme="blue" onClick={handleCommentSubmit}>
                Submit
              </Button>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostModal;