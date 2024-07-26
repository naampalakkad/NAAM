import {
    HStack,
    Box,
    Text,
    Button,
    Image,
} from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, RepeatIcon, TimeIcon, WarningIcon } from '@chakra-ui/icons';

const RenderItems = ({ items, handleMove, itemState }) => {
    if (!Array.isArray(items)) {
        console.error('Expected items to be an array but got', items);
        return null;
    }

    return (
        <Box>
            {items.map((item) => (
                <Box key={item.id} p={4} shadow="md" borderWidth="1px">
                    <Text fontWeight="bold">{item.title}</Text>
                    <Text>{item.authorName}</Text>
                    {item.thumbnail && <Image boxSize="150px" src={item.thumbnail} alt={item.title} />}
                    <HStack mt={2}>
                        <Button onClick={() => handleMove(item, 'readMore')}>
                            <CheckIcon /> Read More
                        </Button>
                        <Button onClick={() => handleMove(item, 'delete')}>
                            <DeleteIcon /> Delete
                        </Button>
                        {itemState === 'pending' && (
                            <Button onClick={() => handleMove(item, 'approve')}>
                                <CheckIcon /> Approve
                            </Button>
                        )}
                        {itemState === 'approved' && (
                            <>
                                <Button onClick={() => handleMove(item, 'archive')}>
                                    <TimeIcon /> Archive
                                </Button>
                                <Button onClick={() => handleMove(item, 'unapprove')}>
                                    <WarningIcon /> Unapprove
                                </Button>
                            </>
                        )}
                        {itemState === 'archived' && (
                            <Button onClick={() => handleMove(item, 'unarchive')}>
                                <RepeatIcon /> Unarchive
                            </Button>
                        )}
                    </HStack>
                </Box>
            ))}
        </Box>
    );
};

export default RenderItems;