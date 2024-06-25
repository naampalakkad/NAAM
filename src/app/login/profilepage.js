import React from 'react';
import { signInoutWithGoogle } from "@/lib/firebase";
import { Box, Heading, Textarea, Image, Button, Switch, Text, Input, Card, Select } from "@chakra-ui/react";
import { personaldetailsdata } from '@/lib/data'
import { savedatatodb, } from "@/lib/firebase";
import { useToast } from "@chakra-ui/react";

const ProfileSection = ({ user, profileImage, handleImageChange }) => {
  const toast = useToast();
  const handleSignOut = () => {
    signInoutWithGoogle();
  };

  return (
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
        <Box fontSize="sm" color="gray.600" mb={2}>{user.email}</Box>
      </Box>
      <Button onClick={handleSignOut} colorScheme="blue">Sign out</Button>
    </Card>
  );
};

const DetailsSection = ({ personaldetailsdata, about, handleAboutChange, phonepermission, handlePermissionChange, updateFirebaseUserData }) => {

  const renderInput = (detail) => (
    <Input
      className="detailitem"
      variant="filled"
      type={detail.type}
      placeholder={detail.default}
      id={"profile" + detail.name}
    />
  );

  const renderTextarea = () => (
    <Textarea
      value={about}
      className="detailitem"
      variant="filled"
      onChange={handleAboutChange}
      placeholder="Tell us about yourself..."
      borderRadius="md"
      resize="vertical"
      height="180px"
    />
  );

  const renderSwitch = () => (
    <div align="left" className="detailitem">
      <Switch isChecked={phonepermission} onChange={handlePermissionChange} size='lg' mr={2} />
      <Text fontSize="sm" color="gray.600"> {phonepermission ? "Display my phone number for others to see" : "I don't want to be contacted through phone"}</Text>
    </div>
  );

  const renderDropdown = (detail) => (
    <Select
      className="detailitem"
      variant="filled"
      placeholder={detail.default}
      id={"profile" + detail.name}
    >
      {detail.options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </Select>
  );

  return (
    <Box spacing={4} className="infobox">
      {personaldetailsdata.map((detail, index) => (
        <div className="detaillist" key={index}>
          <label htmlFor={"profile" + detail.name}>{detail.prop}</label>
          {detail.name === "about" ? renderTextarea() :
            detail.name === "phone" ? renderSwitch() :
              detail.name === "location" || detail.name === "profession" || detail.name === "specialization" || detail.name === "location2" ? renderDropdown(detail) :
                renderInput(detail)}
        </div>
      ))}
       {renderSwitch()}
      <Button mt={4} colorScheme="blue" onClick={updateFirebaseUserData}>Save</Button>
      
    </Box>
  );
};

export default function SignedInBox({ user, profileImage, handleImageChange,updateFirebaseUserData, }) {
  const toast = useToast();
  const [about, setAbout] = React.useState("");
  const [phonepermission, setPhonePermission] = React.useState(false);

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const handlePermissionChange = () => {
    setPhonePermission(!phonepermission);
  };

  return (
    <Box className="cardcontainer">
      <ProfileSection
        user={user}
        profileImage={profileImage}
        handleImageChange={handleImageChange}
      />
      <DetailsSection
        personaldetailsdata={personaldetailsdata}
        about={about}
        handleAboutChange={handleAboutChange}
        phonepermission={phonepermission}
        handlePermissionChange={handlePermissionChange}
        updateFirebaseUserData={updateFirebaseUserData}
      />
    </Box>
  );
};
