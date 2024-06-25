import React from 'react';
import { signInoutWithGoogle } from "@/lib/firebase";
import { Box, Heading, Textarea, Image, Button,  Input, Card, Select} from "@chakra-ui/react";

const ProfileSection = ({ user, profileImage, handleImageChange }) => {
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

const DetailsSection = ({ personaldetailsdata, updateFirebaseUserData }) => {
  const renderInput = (detail) => (
    <Input
      className="detailitem"
      variant="filled"
      type={detail.type}
      placeholder={detail.default}
      id={"profile" + detail.name}
    />
  );

  const renderTextarea = (detail) => (
    <Textarea
      className="detailitem"
      variant="filled"
      placeholder="Tell us about yourself..."
      borderRadius="md"
      resize="vertical"
      height="180px"
      id={"profile" + detail.name}
    />
  );

  const renderSwitch = (detail) => (
      
      <label className='switchlabel'>
        <input type='checkbox' id={"profile" + detail.name} />
    </label>
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
          {
          detail.type === "textarea" ? renderTextarea(detail) :
          detail.type === "select" ? renderDropdown(detail) : 
          detail.type === "checkbox" ? renderSwitch(detail) : 
          renderInput(detail)
          }
        </div>
      ))}
      <Button mt={4} colorScheme="blue" onClick={updateFirebaseUserData}>Save</Button>
    </Box>
  );
};


export default function SignedInBox({ user, profileImage, handleImageChange, personaldetailsdata,updateFirebaseUserData}) {
  return (
    <Box className="cardcontainer">
      <ProfileSection
        user={user}
        profileImage={profileImage}
        handleImageChange={handleImageChange}
      />
      <DetailsSection
        personaldetailsdata={personaldetailsdata}
        updateFirebaseUserData={updateFirebaseUserData}
      />
    </Box>
  );
}
