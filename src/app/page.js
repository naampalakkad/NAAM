import Carousel from "./homepage/carousal.js";
import Statisticspanel from "./homepage/statisticspanel.js";
import Blogspanel from "./homepage/blogspanel.js";
import Gallerypanel from "./homepage/gallerypanel.js";
import Testimonialpanel from "./homepage/testimonialpanel.js";
import Contactpanel from "./homepage/contactpanel.js";


import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container} style={{width: '100vw'}}>
     <Carousel/>
     <Statisticspanel/>
     <Blogspanel/>
     <Gallerypanel/>
     <Testimonialpanel/>
     <Contactpanel/>
    </div>
  );
}
