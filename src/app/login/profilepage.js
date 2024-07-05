import React, { useCallback, useEffect, useState } from 'react';
import { signInoutWithGoogle, getuserdetailfromdb, savedatatodb ,uploadImageToStorage} from "@/lib/firebase";
import { Box, Heading, Textarea, Image, Button, Input, Card, useToast } from "@chakra-ui/react";
import RenderDropdown from './dropdown';
import { personaldetailsdata } from "@/lib/data";
import { FaUpload } from "react-icons/fa";

const ProfileSection = ({ user, profileImage, handleImageChange }) => {
  const handleSignOut = () => {
    signInoutWithGoogle();
  };

  return (
    <Card className="profilebox" boxShadow="md" p={6} borderRadius="xl" textAlign="center">
      <label htmlFor="profileImageInput" className="profileimage" style={{ position: 'relative' }}>
        <Image
          src={profileImage || './assets/usericon.webp'}
          id="profileimagebox"
          alt={user.displayName}
          fallbackSrc="./assets/usericon.webp"
          borderRadius="full"
          objectFit="cover"
          mb={4}
          mx="auto"
          onMouseOver={(e) => e.currentTarget.style.opacity = 0.8}
          onMouseOut={(e) => e.currentTarget.style.opacity = 1}
          transition="opacity 0.3s ease-in-out"
        />
    <Box
  as="span"
  className="upload-icon"
  color="green.500"
  cursor="pointer"
  position="absolute"
  fontSize={16}
  top="50%"
  left="50%"
  transform="translate(-50%, -50%)"
  opacity={0}
  _hover={{ opacity: 1 }}
  p={4}
  display="flex"
  alignItems="center"
  justifyContent="center"
  borderRadius="50%"
>
  <FaUpload  size={50}/>
  Change Profile Image
</Box>
      </label>
      <input
        type="file"
        id="profileImageInput"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <Box mt={6}>
        <Heading as="h3" size="md" mb={2}>
          {user.displayName}
        </Heading>
        <Box fontSize="sm" color="gray.600" mb={4}>
          {user.email}
        </Box>
        <Button onClick={handleSignOut} colorScheme="blue" size="sm">
          Sign out
        </Button>
      </Box>
    </Card>
  );
};



const DetailsSection = ({ personaldetailsdata, updateFirebaseUserData, userdata, handleChange }) => {

  const renderInput = useCallback((detail) => (
    <Input
      className="detailitem"
      variant="filled"
      type={detail.type}
      placeholder={detail.default}
      id={"profile" + detail.name}
      value={userdata[detail.name] || ''}
      onChange={(e) => handleChange(detail.name, e.target.value)}
    />
  ), [userdata, handleChange]);

  const renderTextarea = useCallback((detail) => (
    <Textarea
      className="detailitem"
      variant="filled"
      placeholder="Tell us about yourself..."
      borderRadius="md"
      resize="vertical"
      height="180px"
      id={"profile" + detail.name}
      value={userdata[detail.name] || ''}
      onChange={(e) => handleChange(detail.name, e.target.value)}
    />
  ), [userdata, handleChange]);

  const renderSwitch = useCallback((detail) => (
    <label className='switchlabel'>
      <input
        type='checkbox'
        id={"profile" + detail.name}
        checked={userdata[detail.name] || false}
        onChange={(e) => handleChange(detail.name, e.target.checked)}
      />
    </label>
  ), [userdata, handleChange]);

  const renderDropdown = useCallback((detail) => (
    <RenderDropdown detail={detail} userdata={userdata} handleChange={handleChange} />
  ), [userdata, handleChange]);

  return (
    <Box spacing={4} className="infobox">
      {personaldetailsdata.map((detail, index) => (
        <div className="detaillist" key={index}>
          <label htmlFor={"profile" + detail.name}>{detail.prop}</label>
          {detail.type === "textarea" && renderTextarea(detail)}
          {detail.type === "selectable" && renderDropdown(detail)}
          {detail.type === "checkbox" && renderSwitch(detail)}
          {!["textarea", "selectable", "select", "checkbox"].includes(detail.type) && renderInput(detail)}
        </div>
      ))}
      <Button mt={4} colorScheme="blue" onClick={updateFirebaseUserData}>Save</Button>
    </Box>
  );
};

const SignedInBox = ({ user }) => {
  const toast = useToast();
  const [userdata, setUserdata] = useState({});
  const [profileImage, setProfileImage] = useState(user.photoURL);

  useEffect(() => {
    const setuserdetails = async () => {
      if (user) {
        setProfileImage(user.photoURL); 
        let userdataa = await getuserdetailfromdb(user.uid);
        if (userdataa== null) {
            userdataa = {
              name : "",
              email: "",
              batch: "",
              number: "",
              "alternate number": "",
              rollnow: "",
              linkedIn: "" ,
              facebook: "",
              location: "",
              nativelocation: "",
              profession: "",
              specialization: "",
              about: "",
              phoneperm: "",
              photoURL: "",
        }
      }
        setUserdata(userdataa);
        setProfileImage(userdataa.photoURL);
        if(userdataa.photoURL == "") {
          setProfileImage(user.photoURL);
        }
        
      } else {
        console.log("user not available");
      }
    };
    setuserdetails();
  }, [user]);

  const handleChange = (name, value) => {
    console.log(`Updating ${name} to ${value}`);
    setUserdata((prevUserdata) => ({
      ...prevUserdata,
      [name]: value,
    }));
    console.log(userdata)
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
      const newImageUrl = await uploadImageToStorage( user.uid,file);
      setProfileImage(newImageUrl);
      setUserdata((prevUserdata) => ({
        ...prevUserdata,
        photoURL: newImageUrl,
      }));
      savedatatodb("users/" + user.uid, userdata);
      toast({
                title: "Success",
                description: "Changed your profile image",
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
    }
    catch {
      toast({
                title: "Success",
                description: "Changed your profile image",
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
        
    }
    }
  };

  const updateFirebaseUserData = () => {
    new Promise((resolve, reject) => {
      try {
        savedatatodb("users/" + user.uid, userdata);
        resolve();
      } catch (error) {
        reject(error);
      }
    })
    .then(() => {
      toast({
        title: "Profile updated.",
        description: "Your profile information has been saved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    })
    .catch((error) => {
      toast({
        title: "Error updating profile.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
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
        updateFirebaseUserData={updateFirebaseUserData}
        userdata={userdata}
        handleChange={handleChange}
      />
    </Box>
  );
};

export default SignedInBox;
