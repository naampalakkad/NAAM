import Carousel from "./homepage/carousal.js";
import Statisticspanel from "./homepage/statisticspanel.js";
import Blogspanel from "./homepage/blogspanel.js";
import Gallerypanel from "./homepage/gallerypanel.js";
import Testimonialpanel from "./homepage/testimonialpanel.js";
import './homepage/home.css';





export default function Home() {
  return (
    <div className="mainbody" >
     <Carousel/>
     <Statisticspanel/>
     <Blogspanel/>
     <Gallerypanel/>
     <Testimonialpanel/>
    </div>
  );
}
