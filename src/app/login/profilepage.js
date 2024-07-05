import React, { useCallback, useEffect, useState } from 'react';
import { signInoutWithGoogle, getuserdetailfromdb, savedatatodb ,uploadImageToStorage} from "@/lib/firebase";
import { Box, Heading, Textarea, Image, Button, Input, Card, useToast } from "@chakra-ui/react";
import RenderDropdown from './dropdown';
import { personaldetailsdata } from "@/lib/data";

const ProfileSection = ({ user, profileImage, handleImageChange }) => {
  console.log(profileImage);
  const handleSignOut = useCallback(() => {
    signInoutWithGoogle();
  }, []);

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
        console.log(userdataa);
        setProfileImage(userdataa.photoURL);
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
