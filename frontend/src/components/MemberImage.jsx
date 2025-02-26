import { useAuthStore } from "@/store/authStore";

const MemberImage = ()=>{
    const {user} = useAuthStore();
    
    return(
      
      <img className="w-24 rounded-full border-4 border-primary-red " src={user?.profileImage ? (user.profileImage):(`https://avatars.githubusercontent.com/u/35440139?v=4`)} />
        
    )
}
export default MemberImage;