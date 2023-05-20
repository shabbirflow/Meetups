import { useRouter } from "next/router";
import classes from "./MeetupDetail.module.css";

function MeetupDetail(props) {

  const router = useRouter();

  // console.log("ID", router.query.meetupid);

  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
      <button
        onClick={props.deleteHandler}
        style={{
          backgroundColor: "red",
          border: "none",
          color: "white",
          padding: "5px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </section>
  );
}

export default MeetupDetail;
