import { signInoutWithGoogle } from "@/lib/firebase";
import { Box, Heading, Text, Button, Card, Stack } from "@chakra-ui/react";

// SignInCard component
const SignInCard = ({ signInWithGoogle }) => (
  <Card
    className="sign-in-card"
    padding={8}
    margin={4}
    boxShadow="md"
    borderRadius="lg"
    width="100%"
  >
    <Heading as="h2" size="lg" marginBottom={4}>Welcome Back!</Heading>
    <Text fontSize="lg" marginBottom={4}>
      Please sign in to continue to the NAAM website.
    </Text>
    <Button onClick={signInWithGoogle} colorScheme="blue" width="full" p={4}>
      Sign In with Google
    </Button>
  </Card>
);

const InfoCard = () => (
  <Card
    className="info-card"
    padding={8}
    margin={4}
    boxShadow="md"
    borderRadius="lg"
    width="100%"
  >
    <Heading as="h2" size="md" marginBottom={4}>About NAAM</Heading>
    <Text>
      By signing in with your Google account, you can manage your profile and connect with other alumni. Your information will be securely stored and will not be shared with anyone else.
      Please refer to Google’s privacy policy for details on data collection.
    </Text>
  </Card>
);

export default function SignInPage() {
  const signInWithGoogle = () => {
    signInoutWithGoogle();
  };

  return (
      <Stack spacing={4} width="full" maxWidth="lg"    className="cardcontainer"
      padding={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      >
        <SignInCard signInWithGoogle={signInWithGoogle} />
        <InfoCard />
      </Stack>
  );
}
