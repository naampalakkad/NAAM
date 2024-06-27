import { signInoutWithGoogle } from "@/lib/firebase";
import { Box, Heading, Text, Button, Card } from "@chakra-ui/react";

// SignInCard component
const SignInCard = ({ signInWithGoogle }) => (
  <Card className="sign-in-card" padding={8} margin={4}>
    <Heading as="h2" size="lg" marginBottom={4}>Sign In to NAAM Website</Heading>
    <Button onClick={signInWithGoogle} colorScheme="blue">Sign In</Button>
  </Card>
);

const InfoCard = () => (
  <Card className="info-card" padding={8} margin={4}>
    <Heading as="h2" size="md" marginBottom={4}>Welcome to NAAM Website</Heading>
    <Text>
      Sign in with your Google account to set your details so that other users can find you, or to view others' details.
      We will not share your details with anyone else, and we will not use your details for any other purpose.
      Google may collect your details as per their privacy policy.
    </Text>
  </Card>
);

export default function SignInPage() {
  const signInWithGoogle = () => {
    signInoutWithGoogle();
  };

  return (
    <Box  className="cardcontainer" padding={8}>
      <SignInCard signInWithGoogle={signInWithGoogle} />
      <InfoCard />
    </Box>
  );
}
