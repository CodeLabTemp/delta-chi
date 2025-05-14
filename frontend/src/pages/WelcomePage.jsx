import PublicHeader from "@/components/PublicHeader";
import PublicAbout from "@/components/PublicAbout";
import PublicContact from "@/components/PublicContact";
import PublicEvents from "@/components/PublicEvents";
import PublicGallery from "@/components/PublicGallery";
import PublicExecutives from "@/components/PublicExecutives";

const WelcomePage = () => {
  let pictures = [
    { photoName: "Photo1", photoSource: "/aboutpic.jpg" },
    { photoName: "Photo2", photoSource: "/DC_header.jpg" },
    { photoName: "Photo3", photoSource: "/event.jpg" },
    { photoName: "Photo4", photoSource: "/membership.jpg" },
  ];

  const evBoard = [
    {
      eventImage: "/event.jpg",
      eventName: "Main Event",
      eventDate: "November 19, 2024",
      eventLocation: "Location A",
      eventTime: "6:00 PM",
      eventDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      isMain: true, // Mark the main event
    },
    {
      eventImage: "/event.jpg",
      eventName: "Event 1",
      eventDate: "November 19, 2024",
      eventLocation: "Location B",
      eventTime: "5:00 PM",
      eventDescription: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,",
    },
    {
      eventImage: "/event.jpg",
      eventName: "Event 2",
      eventDate: "December 1, 2024",
      eventLocation: "Location C",
      eventTime: "3:00 PM",
      eventDescription: "qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
    },
    {
      eventImage: "/event.jpg",
      eventName: "Event 3",
      eventDate: "January 5, 2025",
      eventLocation: "Location D",
      eventTime: "7:30 PM",
      eventDescription: " Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    },
  ];

  const exBoard = [
    {
      memberRank: "President",
      memberName: "Alex Nguyen",
      memberImage: "/member1.jpg",
    },
    {
      memberRank: "Vice President",
      memberName: "Leo Lipshutz",
      memberImage: "/member2.jpg",
    },
    {
      memberRank: "Secretary",
      memberName: "Nolan Dokidis",
      memberImage: "/member3.jpg",
    },
    {
      memberRank: "Treasurer",
      memberName: "Jaylon Dias",
      memberImage: "/member4.jpg",
    },
  ];

  return (
    <div>
      <main>
        <PublicHeader />
        <PublicAbout />
        <PublicEvents evBoard={evBoard} />
        <PublicExecutives executives={exBoard} />
        <PublicGallery galleryPics={pictures} />
        <PublicContact />
      </main>
    </div>
  );
};

export default WelcomePage;
