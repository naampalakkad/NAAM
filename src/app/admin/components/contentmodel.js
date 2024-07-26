import {
    VStack,
    HStack,
    Box,
    Text,
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
    Badge,
    Link,
} from '@chakra-ui/react';

const ItemModal = ({ isOpen, onClose, selectedItem }) => (
    <Modal isOpen={isOpen} onClose={onClose}  scrollBehavior="inside" size={"xl"}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>{selectedItem.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Box idth="60vw" mx="auto" p={5} pt="12vh">
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

export default ItemModal;