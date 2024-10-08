'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Grid, Card, CardHeader, Image, CardBody, Stack, Badge, Button, HStack, Skeleton, SkeletonText, Heading, useToast, IconButton } from '@chakra-ui/react';
import { getdatafromdb, auth, getLikesCount, addLike, removeLike } from '@/lib/firebase';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import PostModal from './postmodel';

const defaultImage = "./assets/logo.webp";

const LoadingSkeleton = () => (
  <Card  variant="elevated" size="sm">
    <Skeleton height="150px" />
    <CardBody>
      <SkeletonText noOfLines={2} spacing={4} />
    </CardBody>
  </Card>
);

const PostCard = ({ post, onOpen, liked, onLike, likesCount }) => (
  <Card   variant="elevated" size="sm">
    <CardHeader>
      <Image
        src={post[1]?.thumbnail || defaultImage}
        alt="Cover Image"
        borderRadius="lg"
        maxH="150px"
        width={"100%"}
        objectFit="cover"
        cursor="pointer"
        onClick={() => onOpen(post)}
      />
    </CardHeader>
    <CardBody>
      <Stack>
        <HStack>
        <Badge  overflow={"hidden"}  colorScheme="blue">{post[1]?.type}</Badge>
        <Badge overflow={"hidden"} colorScheme="yellow">{post[1]?.authorName}</Badge>
        </HStack>
        <Heading size={"md"}>{post[1]?.title}</Heading>
        <HStack justifyContent={"space-between"}>
          <Button fontWeight="bold"  colorScheme="blue" onClick={() => onOpen(post)}>
            Read More
          </Button>
          <HStack>
          <IconButton
            aria-label="Like button"
            icon={liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
            variant="link"
            onClick={() => onLike(post[0])}
          />
          <span>{likesCount}</span>
        </HStack>
        </HStack>
      </Stack>
    </CardBody>
  </Card>
);

const BlogsPanel = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const toast = useToast();

  const fetchPosts = useCallback(async () => {
    const postsFromDb = await getdatafromdb('content/approvedposts');
    if (postsFromDb) {
      const postsArray = Object.entries(postsFromDb);
      postsArray.sort((a, b) => b[1].timestamp - a[1].timestamp);
      setPosts(postsArray);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const fetchLikes = useCallback(async () => {
    const likesData = {};
    const likedData = {};
    for (const [id, post] of posts) {
      const likeCount = await getLikesCount(id);
      likesData[id] = likeCount;

      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const hasLiked = await getdatafromdb(`content/approvedposts/${id}/likes/${userId}`);
        likedData[id] = !!hasLiked;
      }
    }
    setLikes(likesData);
    setLikedPosts(likedData);
  }, [posts]);

  useEffect(() => {
    if (posts.length) {
      fetchLikes();
    }
  }, [posts, fetchLikes]);

  const openModal = (post) => {
    // window.location.href=`/blog/${post[0]}`;
    setSelectedPost(post);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsOpen(false);
  };

  const handleLike = async (postId) => {
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
    try {
      if (likedPosts[postId]) {
        await removeLike(postId, userId);
        setLikedPosts((prev) => ({ ...prev, [postId]: false }));
        setLikes((prev) => ({ ...prev, [postId]: prev[postId] - 1 }));
        toast({
          title: "Like removed",
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await addLike(postId, userId);
        setLikedPosts((prev) => ({ ...prev, [postId]: true }));
        setLikes((prev) => ({ ...prev, [postId]: prev[postId] + 1 }));
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

  return (
    <>
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={4}
        width={"80vw"}
      >
        {loading
          ? Array.from({ length: 4 }).map((_, index) => <LoadingSkeleton key={index} />)
          : posts.map((post, index) => (
            <PostCard
              key={index}
              post={post}
              onOpen={openModal}
              liked={likedPosts[post[0]]}
              onLike={handleLike}
              likesCount={likes[post[0]] || 0}
            />
          ))}
      </Grid>
      {selectedPost && (
        <PostModal
          isOpen={isOpen}
          onClose={closeModal}
          selectedPost={selectedPost}
        />
      )}
    </>
  );
};

export default BlogsPanel;
