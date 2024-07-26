import React, { useState, useEffect } from 'react';
import {
    VStack,
    HStack,
    Box,
    Spinner,
    Text,
    useToast,
    IconButton,
    Heading,
    Button,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Badge,
    List,
    Link,
} from '@chakra-ui/react';import { CheckIcon, DeleteIcon, RepeatIcon, TimeIcon } from '@chakra-ui/icons';
import { getdatafromdb, savedatatodb, deletedatafromdb } from '@/lib/firebase';

const RenderPosts = ({ posts, handleApprove, handleArchive, handleDelete, handleReadMore }) => {
    if (!Array.isArray(posts)) {
        console.error('Expected posts to be an array but got', posts);
        return null;
    }

    return (
        <Box>
            {posts.map((post) => (
                <Box key={post.id} p={4} shadow="md" borderWidth="1px">
                    <Text fontWeight="bold">{post.title}</Text>
                    <Text>{post.authorName}</Text>
                    {post.thumbnail && <Image boxSize="150px" src={post.thumbnail} alt={post.title} />}
                    <HStack mt={2}>
                        <Button onClick={() => handleReadMore(post)}>
                            <CheckIcon /> Read More
                        </Button>
                        <Button onClick={() => handleApprove(post.id)}>
                            <CheckIcon /> Approve
                        </Button>
                        <Button onClick={() => handleArchive(post.id)}>
                            <TimeIcon /> Archive
                        </Button>
                        <Button onClick={() => handleDelete(post.id)}>
                            <DeleteIcon /> Delete
                        </Button>
                        <Button onClick={() => handleApprove(post.id)}>
                            <RepeatIcon /> Unarchive
                        </Button>
                    </HStack>
                </Box>
            ))}
        </Box>
    );
};

const AdminPanel = () => {
    const [pendingPosts, setPendingPosts] = useState([]);
    const [approvedPosts, setApprovedPosts] = useState([]);
    const [archivedPosts, setArchivedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pending = await getdatafromdb('posts');
                const approved = await getdatafromdb('content/approvedposts');
                const archived = await getdatafromdb('content/archivedposts');

                const transformData = (data) => {
                    if (data == null) {
                        return [];
                    }
                    return Object.keys(data).map(key => ({
                        ...data[key],
                        id: key
                    }));
                };

                setPendingPosts(transformData(pending));
                setApprovedPosts(transformData(approved));
                setArchivedPosts(transformData(archived));
            } catch (error) {
                toast({
                    title: "Error fetching data",
                    description: error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [toast]);

    const handleApprove = async (id) => {
        try {
            const postToApprove = pendingPosts.find(post => post.id === id);
            await savedatatodb(`content/approvedposts/${id}`, postToApprove);
            await deletedatafromdb(`posts/${id}`);
            setPendingPosts(pendingPosts.filter(post => post.id !== id));
            setApprovedPosts([...approvedPosts, { ...postToApprove, approved: true }]);
            toast({
                title: "Post Approved",
                description: "The post has been approved.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error Approving Post",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const handleArchive = async (id) => {
        try {
            const postToArchive = approvedPosts.find(post => post.id === id);
            await savedatatodb(`content/archivedposts/${id}`, postToArchive);
            await deletedatafromdb(`content/approvedposts/${id}`);
            setApprovedPosts(approvedPosts.filter(post => post.id !== id));
            setArchivedPosts([...archivedPosts, { ...postToArchive, archived: true }]);
            toast({
                title: "Post Archived",
                description: "The post has been archived.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error Archiving Post",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletedatafromdb(`posts/${id}`);
            await deletedatafromdb(`content/approvedposts/${id}`);
            await deletedatafromdb(`content/archivedposts/${id}`);
            setPendingPosts(pendingPosts.filter(post => post.id !== id));
            setApprovedPosts(approvedPosts.filter(post => post.id !== id));
            setArchivedPosts(archivedPosts.filter(post => post.id !== id));
            toast({
                title: "Post Deleted",
                description: "The post has been deleted.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error Deleting Post",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const handleReadMore = (post) => {
        setSelectedPost(post);
        onOpen();
    };

    if (loading) {
        return (
            <VStack align="center" justify="center" height="100vh">
                <Spinner size="xl" />
            </VStack>
        );
    }

    return (
        <VStack align="start" spacing={8}>
            <Heading size="lg">Posts</Heading>
            <Heading size="md">Pending Posts</Heading>
            <RenderPosts posts={pendingPosts} handleApprove={handleApprove} handleArchive={handleArchive} handleDelete={handleDelete} handleReadMore={handleReadMore} />
            <Heading size="md">Approved Posts</Heading>
            <RenderPosts posts={approvedPosts} handleApprove={handleApprove} handleArchive={handleArchive} handleDelete={handleDelete} handleReadMore={handleReadMore} />
            <Heading size="md">Archived Posts</Heading>
            <RenderPosts posts={archivedPosts} handleApprove={handleApprove} handleArchive={handleArchive} handleDelete={handleDelete} handleReadMore={handleReadMore} />

            {selectedPost && (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{selectedPost.title}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box maxW="800px" mx="auto" p={5} pt="12vh">
                                <Heading mb={4}>{selectedPost.title}</Heading>
                                <HStack spacing={2} mb={4}>
                                    <Badge colorScheme="yellow">{selectedPost.authorName}</Badge>
                                    <Badge colorScheme="blue">{selectedPost.type}</Badge>
                                </HStack>
                                <VStack spacing={4} align="start">
                                    {selectedPost.content.ops.map((op, idx) => {
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
                                                <Image key={idx} src={op.insert.image} alt="Post content" mx="auto" />
                                            );
                                        }
                                        return null;
                                    })}
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

            )}
        </VStack>
    );
};

export default AdminPanel;
