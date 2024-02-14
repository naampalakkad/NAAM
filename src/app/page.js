import Carousel from "./homepage/carousal.js";
import Statisticspanel from "./homepage/statisticspanel.js";
import Blogspanel from "./homepage/blogspanel.js";
import Gallerypanel from "./homepage/gallerypanel.js";
import Testimonialpanel from "./homepage/testimonialpanel.js";



let styles = {
  "container": {
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    width: "100%",
  }
}

export default function Home() {
  return (
    <div className={styles.container} style={styles.container} >
     <Carousel/>
     <Statisticspanel/>
     <Blogspanel/>
     <Gallerypanel/>
     <Testimonialpanel/>
    </div>
  );
}
