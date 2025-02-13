import PublicNavbar from "@/components/PublicNavbar";
import { Outlet } from "react-router-dom";
import PublicFooter from "@/components/PublicFooter";


const PublicLayout = ({ children }) => {
  console.log("PublicLayout.jsx fired");

  

  return (
    <div>
      <PublicNavbar />
        <Outlet /> 
      <PublicFooter/>   
    </div>
  );
};

export default PublicLayout;
