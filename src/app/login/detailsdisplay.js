import React from 'react';
import { Box, Heading, Text, Card, Flex } from "@chakra-ui/react";

const ProfileDetails = ({ personaldetailsdata, userdata }) => {
    return (
        <Card
            p={2}
            m={1}
            textAlign="left"
            borderRadius="md"
            boxShadow="sm"
            w={{ base: '100%', md: '55%' }}
        >
            <Heading as="h4" size="lg" align="center" mb={4}>Profile Details</Heading>
            <Flex direction="column">
                {personaldetailsdata
                    .filter(detail => detail.name !== 'phoneperm')
                    .map((detail, index) => (
                        <Box
                            key={detail.name}
                            mb={2}
                            p={2}
                            borderRadius="md"
                            boxShadow="sm"
                            border="1px solid"
                            borderColor="gray.300"
                            w={{ base: '100%', md: '100%' }}
                        >
                            <Flex>
                                <Text fontWeight="bold" color="teal" w="35%">{detail.prop}</Text>
                                <Text color="gray.500" width="5%" textAlign="center">:</Text>
                                <Text fontStyle="oblique" flex="1" w="60%">{userdata[detail.name] || 'N/A'}</Text>
                            </Flex>
                        </Box>
                    ))}
            </Flex>
        </Card>
    );
};

export default ProfileDetails;
