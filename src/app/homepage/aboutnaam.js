import { Box, Card, Image, CardBody, CardHeader, SimpleGrid, Text, Grid } from '@chakra-ui/react';
import { aboutnaam } from '@/lib/data';

export default function AboutNaam() {
    return (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} p={4} className='cardcontainer'>
            <Card boxShadow="lg" p={0}>
                <CardHeader fontSize="3xl" color="rgb(23, 110, 81)" textAlign="center">
                    About NAAM
                </CardHeader>
                <CardBody>
                    <Grid templateColumns={{ base: "1fr", md: "150px auto" }} gap={6} alignItems="center">
                        <Box display="flex" justifyContent="center">
                            <Image boxSize='150px' src={"/assets/logo.webp"} alt="NAAM logo" loading="lazy" />
                        </Box>
                        <Text>{aboutnaam.about}</Text>
                    </Grid>
                </CardBody>
            </Card>
            <Card boxShadow="lg" p={0} borderRadius="10px">
                <CardHeader fontSize="3xl" color="rgb(23, 110, 81)" textAlign="center">
                    Our Mission
                </CardHeader>
                <CardBody>
                    <Grid templateColumns={{ base: "1fr", md: "150px auto" }} gap={6} alignItems="center">
                        <Box display="flex" justifyContent="center">
                            <Image boxSize='150px' src={"/assets/logo.webp"} alt="NAAM logo" loading="lazy" />
                        </Box>
                        <Text>{aboutnaam.mission}</Text>
                    </Grid>
                </CardBody>
            </Card>
        </SimpleGrid>
    );
}
