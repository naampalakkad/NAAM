import React from 'react';
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const LightboxComponent = ({ images, isOpen, currentIndex, onClose }) => {
  return (
    <Lightbox
      slides={images}
      open={isOpen}
      index={currentIndex} // Set initial index if provided
      close={onClose}
      plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
    />
  );
};

export default LightboxComponent;
