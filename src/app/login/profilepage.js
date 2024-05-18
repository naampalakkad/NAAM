import { signInoutWithGoogle } from "@/lib/firebase";
import { Box, Heading, Flex, Textarea, Image, Button, Switch, Text, Input, Card } from "@chakra-ui/react";


const ProfileSection = ({ user, profileImage, handleImageChange }) => (
  <Card className="profilebox">
    <label htmlFor="profileImageInput" className="profileimage">
      <Image
        src={profileImage}
        id="profileimagebox"
        alt={user.displayName}
        fallbackSrc="./assets/usericon.webp"
      />
      <span className="upload-icon">Upload</span>
    </label>
    <input
      type="file"
      id="profileImageInput"
      onChange={handleImageChange}
      style={{ display: "none" }}
    />
    <Box>
      <Heading as="h3" size="md" mt={2} mb={1}>{user.displayName}</Heading>
      <Text fontSize="sm" color="gray.600">{user.email}</Text>
    </Box>
    <Button onClick={signInoutWithGoogle}>Sign out</Button>
  </Card>
);

const DetailsSection = ({ personaldetailsdata, about, handleAboutChange, phonepermission, handlePermissionChange, updateFirebaseUserData }) => (
  <Box spacing={4} className="infobox">
    {personaldetailsdata.map((detail, index) => (
      <div className="detaillist" key={index}>
        <label htmlFor={"profile" + detail.name}>{detail.prop}</label>
        <Input
          className="detailitem"
          variant={"filled"}
          type={detail.type}
          placeholder={detail.default}
          id={"profile" + detail.name}
        />
      </div>
    ))}
    <div className="detaillist">
      <label htmlFor="About">About</label>
      <Textarea
        value={about}
        className="detailitem"
        variant={"filled"}
        onChange={handleAboutChange}
        placeholder="Tell us about yourself..."
        borderRadius="md"
        resize="vertical"
        height="180px" 
      />
    </div>
    <div className="detaillist">
      <label htmlFor="About"> Share</label>
      <div align="left" className="detailitem">
        <Switch isChecked={phonepermission} onChange={handlePermissionChange} size='lg' mr={2} />
        <Text fontSize="sm" color="gray.600"> {phonepermission ? "Display my phone number for others to see" : "I don't want to be contacted through phone"}</Text>
      </div>
    </div>

    <Button mt={4} colorScheme="blue" onClick={updateFirebaseUserData}>Save</Button>
  </Box>
);

export default function SignedInBox(props) {
  return (
    <div className="cardcontainer">
      <ProfileSection {...props} />
      <DetailsSection {...props} />
    </div>
  );
}
