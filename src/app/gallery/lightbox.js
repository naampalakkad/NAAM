import React from 'react';
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

const LightboxComponent = ({ images, isOpen, ind, onClose }) => {
  return (
    <Lightbox
      slides={images}
      open={isOpen}
      index={ind} // Set initial index if provided
      close={onClose}
      plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
    />
  );
};

export default LightboxComponent;
