import {
    HStack,
    Box,
    Text,
    Card,
    Button,
    Image,
    VStack,
    useColorModeValue,
    Flex,
    Spacer,
    Grid,
    GridItem,
    Icon,
    Heading
} from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, RepeatIcon, TimeIcon, WarningIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { MdPerson, MdDateRange, MdAccessTime, MdPlace, MdDescription, MdClass, MdTitle } from 'react-icons/md';

const RenderItems = ({ items, handleMove, itemState, itemType }) => {
    const renderContent = (item) => {
        switch (itemType) {
            case 'posts':
                return (
                    <>
                        <Flex align="center">
                            <Heading size={"md"} fontWeight="bold">
                                {item.title}
                            </Heading>
                            <Spacer />
                            <Button
                                onClick={() => handleMove(item, 'readMore')}
                                leftIcon={<InfoOutlineIcon />}
                                colorScheme="blue"
                                variant="ghost"
                                size="sm"
                            >
                                Read More
                            </Button>
                        </Flex>
                        <Text>{item.authorName}</Text>
                        {item.thumbnail && <Image boxSize="150px" src={item.thumbnail} alt={item.title} mt={2} />}
                    </>
                );
            case 'testimonials':
                return (
                    <VStack align="start" spacing={3}>
                        <Flex w="100%" align="center">
                            <Icon as={MdPerson} boxSize={5} />
                            <Heading size={"md"} fontWeight="bold">
                                {item.authorName}
                            </Heading>
                            <Spacer />
                            <Icon as={MdClass} boxSize={5} />
                            <Text ml={2}>Batch: {item.batch}</Text>
                        </Flex>
                        <Text>{item.content}</Text>
                    </VStack>
                );
            case 'events':
                return (
                    <VStack align="start" spacing={3}>
                        <Heading size={"md"} fontWeight="bold">
                            {item.title}
                        </Heading>
                        <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
                            <GridItem>
                                <Flex align="center">
                                    <Icon as={MdPerson} boxSize={5} />
                                    <Text ml={2}>{item.userName}</Text>
                                </Flex>
                                <Flex align="center" mt={2}>
                                    <Icon as={MdDateRange} boxSize={5} />
                                    <Text ml={2}>{item.date}</Text>
                                </Flex>
                            </GridItem>
                            <GridItem>
                                <Flex align="center">
                                    <Icon as={MdAccessTime} boxSize={5} />
                                    <Text ml={2}>{item.time}</Text>
                                </Flex>
                                <Flex align="center" mt={2}>
                                    <Icon as={MdPlace} boxSize={5} />
                                    <Text ml={2}>{item.venue}</Text>
                                </Flex>
                            </GridItem>
                        </Grid>
                        <Text>
                            <Icon as={MdDescription} boxSize={5} mr={2} />{item.description}
                        </Text>
                    </VStack>
                );
            default:
                return null;
        }
    };

    return (
        <Box width={"30vw"}>
            {items.map((item) => (
                <Card key={item.id} p={4} shadow="md" borderWidth="1px" borderRadius="md" mb={4}>
                    {renderContent(item)}
                    <HStack mt={4} spacing={3} justifyContent="space-between">
                        <Button leftIcon={<DeleteIcon />} colorScheme="red" onClick={() => handleMove(item, 'delete')}>
                            Delete
                        </Button>
                        {itemState === 'pending' && (
                            <Button leftIcon={<CheckIcon />} colorScheme="green" onClick={() => handleMove(item, 'approve')}>
                                Approve
                            </Button>
                        )}
                        {itemState === 'approved' && (
                            <>
                                <Button leftIcon={<TimeIcon />} colorScheme="purple" onClick={() => handleMove(item, 'archive')}>
                                    Archive
                                </Button>
                                <Button leftIcon={<WarningIcon />} colorScheme="orange" onClick={() => handleMove(item, 'unapprove')}>
                                    Unapprove
                                </Button>
                            </>
                        )}
                        {itemState === 'archived' && (
                            <Button leftIcon={<RepeatIcon />} colorScheme="teal" onClick={() => handleMove(item, 'unarchive')}>
                                Unarchive
                            </Button>
                        )}
                    </HStack>
                </Card>
            ))}
        </Box>
    );
};

export default RenderItems;
