import { VStack, HStack, Box, Text, Heading, Button, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Badge, Link, useToast, Spinner,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { auth, getdatafromdb, savedatatodb } from '@/lib/firebase';

const ItemModal = ({ isOpen, onClose, selectedItem }) => {
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const fetchComments = async () => {
            if (selectedItem && selectedItem.comments) {
                const commentsArray = Object.entries(selectedItem.comments).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));
                setComments(commentsArray);
            }
            setLoadingComments(false);
        };
        fetchComments();
    }, [selectedItem]);

    const handleRemoveComment = async (commentId) => {
        try {
            await savedatatodb(`content/approvedposts/${selectedItem.id}/comments/${commentId}`, null);
            setComments(comments.filter(comment => comment.id !== commentId));
            toast({
                title: 'Comment removed',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error removing comment:', error);
            toast({
                title: 'Error removing comment',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size={"xxl"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{selectedItem.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box width="60vw" mx="auto" p={5} pt="12vh">
                        <Heading mb={4}>{selectedItem.title}</Heading>
                        <HStack spacing={2} mb={4}>
                            <Badge colorScheme="yellow">{selectedItem.authorName}</Badge>
                            <Badge colorScheme="blue">{selectedItem.type}</Badge>
                        </HStack>
                        <VStack spacing={4} align="start">
                            {selectedItem.content.ops.map((op, idx) => {
                                if (op.insert && typeof op.insert === 'string') {
                                    return (
                                        <Text key={idx} textAlign="justify" id={`section-${idx}`}>
                                            {op.attributes && op.attributes.bold ? (
                                                <strong>{op.insert}</strong>
                                            ) : (
                                                op.insert
                                            )}
                                        </Text>
                                    );
                                } else if (op.attributes && op.attributes.header) {
                                    const HeadingComponent = `h${op.attributes.header}`;
                                    return (
                                        <HeadingComponent key={idx} textAlign="justify" id={`section-${idx}`}>
                                            {op.insert}
                                        </HeadingComponent>
                                    );
                                } else if (op.attributes && op.attributes.link) {
                                    return (
                                        <Link key={idx} href={op.attributes.link} color="teal.500" isExternal>
                                            {op.insert}
                                        </Link>
                                    );
                                } else if (op.insert && op.insert.image) {
                                    return (
                                        <Image key={idx} src={op.insert.image} alt="Item content" mx="auto" />
                                    );
                                }
                                return null;
                            })}
                        </VStack>

                        <VStack align="start" spacing={4} w="full" pt={4}>
                            <Heading fontSize="lg" mb={2}>Comments</Heading>
                            {loadingComments ? (
                                <Spinner size="lg" />
                            ) : comments.length > 0 ? (
                                comments.map((comment) => (
                                    <Box key={comment.id} p={4} w="full" borderWidth="1px" borderRadius="lg">
                                        <HStack justifyContent="space-between">
                                            <Text fontWeight="bold">{comment.authorname}</Text>
                                            <Text fontSize="sm" color="gray.500">
                                                {new Date(comment.time).toLocaleString()}
                                            </Text>
                                        </HStack>
                                        <Text>{comment.comment}</Text>
                                        <Button
                                            size="sm"
                                            colorScheme="red"
                                            mt={2}
                                            onClick={() => handleRemoveComment(comment.id)}
                                        >
                                            Remove Comment
                                        </Button>
                                    </Box>
                                ))
                            ) : (
                                <Text>No comments available</Text>
                            )}
                        </VStack>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ItemModal;
