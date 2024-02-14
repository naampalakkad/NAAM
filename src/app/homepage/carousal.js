let styles = {
   carousalbox: {
       width: "100%",
       height: "100%",
       overflow: "hidden",
       position: "relative",
       backgroundColor: "black"
   },
    carousalimg: {
        width: "100vw",
        height: "60vh",
        display: "flex",
        transition: "transform 300ms ease-in-out"
    },
    herotext: {
        position: "absolute",
        top: "50%",
        left: "10%",
        color: "yellow",
        fontSize: "100px",
        fontWeight: "bold",
        position: "absolute",
        textAlign: "left",
    }
};

export default function Carousal(){
  return (
     <div style={styles.carousalbox}>
          <img src="https://picsum.photos/2000/1000" style={styles.carousalimg} />
          <div style={styles.herotext}>NAAAM: The Navodayan Family</div>
      </div>
  );
}
