import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

function MeetupList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup._id}
          id={meetup._id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.location}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
