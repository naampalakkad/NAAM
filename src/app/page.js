import Carousel from "./homepage/carousal.js";
import Statisticspanel from "./homepage/statisticspanel.js";
import Blogspanel from "./homepage/blogspanel.js";
import Gallerypanel from "./homepage/gallerypanel.js";
import Testimonialpanel from "./homepage/testimonialpanel.js";
import AboutNaam from "./homepage/aboutnaam.js";
import "./globals.css";

export default function Home() {
  return (
    <div id="mainbody" >
     <Carousel/>
     <Statisticspanel/>
     <AboutNaam/>
     <Blogspanel/>
     <Gallerypanel/>
     <Testimonialpanel/>
    </div>
  );
}
