import {signInoutWithGoogle} from "@/lib/firebase";
import { Box, Heading, Textarea, Image, Button, Switch, Text, Input, Card } from "@chakra-ui/react";

function signInWithGoogle() {
    signInoutWithGoogle();
  }



export default function SignedInBox({ user, about, profileImage, phonepermission, handlePermissionChange, updateFirebaseUserData, handleImageChange, handleAboutChange, personaldetailsdata }) {
    return (
      <div className="cardcontainer">
        <Card className="profilebox">
          <div className="profileimagecontainer">
            <label htmlFor="profileImageInput" className="profileimage">
              <Image
                src={profileImage}
                id="profileimagebox"
                alt={user.displayName}
                fallbackSrc='./assets/usericon.webp'
              />
              <span className="upload-icon">Upload</span>
            </label>
            <input
              type="file"
              id="profileImageInput"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          <p>{user.displayName}</p>
          <p>{user.email}</p>
          <Button onClick={()=>signInWithGoogle()}>Sign out</Button>
        </Card>
        <Box spacing={4} className="infobox">
          {personaldetailsdata.map((detail, index) => (
            <div className="detaillist" key={index}>
              <label>{detail.prop}</label>
              <Input
                className="detailitem"
                variant={"filled"}
                type={detail.type}
                placeholder={detail.default}
                id={"profile" + detail.name}
              />
            </div>
          ))}
          <Textarea
            value={about}
            onChange={handleAboutChange}
            placeholder="Tell us about yourself..."
            size="lg"
          />
          <Card padding={1} margin={2} direction={"row"} width={"100%"} align='center'>
            <Heading as='h6' size='xs' >
              Share your contact ? &nbsp; &nbsp;&nbsp;
            </Heading>
            <Switch isChecked={phonepermission} onChange={handlePermissionChange} mr={2} />
            <Text>{phonepermission ? "Yes, display my phone number for others to see." : "No, I don't want to be contacted through phone."}</Text>
          </Card>
          <Button mt={4} colorScheme="blue" onClick={updateFirebaseUserData}>Save</Button>
        </Box>
      </div>
    );
  }