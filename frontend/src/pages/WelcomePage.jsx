import PublicNavbar from "@/components/PublicNavbar";
import { Outlet } from "react-router-dom";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import PublicAbout from "@/components/PublicAbout";
import PublicContact from "@/components/PublicContact";
import PublicEvents from "@/components/PublicEvents";
import PublicGallery from "@/components/PublicGallery";
import PublicExecutives from "@/components/PublicExecutives";


const WelcomePage = () => {
  
  let pictures = [
    {photoName:"Photo1", photoSource:"/aboutpic.png"},
    {photoName:"Photo2", photoSource:"/aboutpic.png"},
    {photoName:"Photo3", photoSource:"/aboutpic.png"},
    {photoName:"Photo4", photoSource:"/aboutpic.png"}
  ]
  const evBoard = [
    {
      eventImage: "/headerphoto.jpg",
      eventName: "Main Event",
      eventDate: "November 19, 2024",
      eventDescription: "Lorem ipsum dolor sit amet consectetur. Congue enim eleifend quis scelerisque a. Mi sit lacinia id sed id ullamcorper.",
      isMain: true, // Mark the main event
    },
    {
      eventImage: "/headerphoto.jpg",
      eventName: "Event 1",
      eventDate: "November 19, 2024",
      eventDescription: "Fermentum vulputate mus at iaculis sociis vitae...",
    },
    {
      eventImage: "/headerphoto.jpg",
      eventName: "Event 2",
      eventDate: "December 1, 2024",
      eventDescription: "Vestibulum ante ipsum primis in faucibus orci...",
    },
    {
      eventImage: "/headerphoto.jpg",
      eventName: "Event 3",
      eventDate: "January 5, 2025",
      eventDescription: "Curabitur ac leo nunc. Vestibulum et mauris vel...",
    },
  ];

  const exBoard = [
    {
      memberRank: "President",
      memberName: "Alex Nguyen",
      memberImage: "/avatar-jessica.jpeg",
    },
    {
      memberRank: "Vice President",
      memberName: "Leo Lipshutz",
      memberImage: "/avatar-jessica.jpeg",
    },
    {
      memberRank: "Secretary",
      memberName: "Nolan Dokidis",
      memberImage: "/avatar-jessica.jpeg",
    },
    {
      memberRank: "Treasurer",
      memberName: "Jaylon Dias",
      memberImage: "/avatar-jessica.jpeg",
    },
  ];


  return (
    <div> 
      <PublicHeader />
      <PublicAbout />
      <PublicEvents evBoard={evBoard}/>
      <PublicExecutives executives ={exBoard}/>
      <PublicGallery galleryPics ={pictures} />
      <PublicContact />
    </div>
  );
};

export default WelcomePage;
