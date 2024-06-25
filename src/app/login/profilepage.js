import { signInoutWithGoogle } from "@/lib/firebase";
import { Box, Heading, Flex, Textarea, Image, Button, Switch, Text, Input, Card ,Select} from "@chakra-ui/react";
import React from 'react';
import {
  auth,
  savedatatodb,
  getuserdetailfromdb,
  uploadImageToStorage,
} from "@/lib/firebase";
import { useToast } from "@chakra-ui/react";
const ProfileSection = ({ user, profileImage, handleImageChange }) => {

  const toast = useToast();
  // Function to handle sign out
  const handleSignOut = () => {
    signInoutWithGoogle(); // Assuming this function signs the user out
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
          {detail.name === "About" ? renderTextarea() :
           detail.name === "phone" ? renderSwitch() :
           detail.name === "location" || detail.name === "profession" || detail.name === "specialization" ? renderDropdown(detail) :
           renderInput(detail)}
        </div>
      ))}
      <Button mt={4} colorScheme="blue" onClick={updateFirebaseUserData}>Save</Button>
    </Box>
  );
};


// export default function SignedInBox(props) {
//   return (
//     <div className="cardcontainer">
//       <ProfileSection {...props} />
//       <DetailsSection {...props} />
//     </div>
//   );
// }
export default function SignedInBox  ({ user, profileImage, handleImageChange })  {
    const toast = useToast();
  // Mock profile data
  const personaldetailsdata = [
    
    {
      prop: "Name",
      name: "name",
      default: "Enter your name",
      type: "text"
    },
    {
      prop: "Email",
      name:"email",
      default: "Enter your email",
      type: "email"
    },
    {
      prop: "Batch",
      name: "batch",
      default: "Enter your batch,  eg: 25",
      type: "Number"
    },
    {
      prop: "Number",
      name:"number",
      default: "Enter your Mobile number",
      type: "Number"
    },
    {
      prop: "Alternate Number",
      name:"Alternate number",
      default: "Enter your Alternate number",
      type: "Number"
    },
    {
      prop: "Location",
      name: "location",
      default: "Select your location",
      type: "select",
      options: ["Location1", "Location2", "Location3"]  
    },
    {
      prop: "Profession",
      name: "profession",
      default: "Select your profession",
      type: "select",
      options: ["Profession1", "Profession2", "Profession3"]  
    },
    {
      prop: "Specialization",
      name: "specialization",
      default: "Select your specialization",
      type: "select",
      options: ["Specialization1", "Specialization2", "Specialization3"]  
    },
    {
      prop: "JNV Roll No",
      name: "rollno",
      default: "Enter your JNV Roll No",
      type: "Number"
    },
    {
      prop: "LinkedIn",
      name: "linkedIn",
      default: "Enter your LinkedIn Profile",
      type: "text"
    },
    {
      prop: "Facebook",
      name: "facebook",
      default: "Enter your Facebook Profile",
      type: "text"
    }
  ];
 
  const [about, setAbout] = React.useState("");
  const [phonepermission, setPhonePermission] = React.useState(false);
 
  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };
 
  const handlePermissionChange = () => {
    setPhonePermission(!phonepermission);
  };
 
  // const updateFirebaseUserData = () => {
  //   console.log("Updating user data...");
  //   // Implement logic to update user data in Firebase
  // };

  function updateFirebaseUserData() {
    
    let userdetails = {}
    userdetails["photo"] = profileImage;
    userdetails["phoneperm"] = phonepermission;
    userdetails["about"] = about;
    personaldetailsdata.forEach(detail => {
      const input = document.getElementById("profile" + detail.name);
      if ((input) && (input.value)) {
        userdetails[detail.name] = input.value;
      }
    });
    savedatatodb("users/" + user.uid, userdetails);
    toast({
      title: 'Success',
      description: " Successfully updated your profile.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

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
