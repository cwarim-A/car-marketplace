import { Button } from "@/components/ui/button"
import Service from "@/shared/Service"
import { CarDetail } from "@/types";
import { useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router"




interface CarDetailProps{
    carDetail:CarDetail | null;
}

const OwnersDetail:React.FC<CarDetailProps> = ({ carDetail }) => {
  const { user } = useUser()
  
  const navigation = useNavigate()

  const OnMessageOwnerButtonClick = async () => {
    const userId = user?.primaryEmailAddress?.emailAddress.split("@")[0];
    const ownerUserId = carDetail?.createdBy.split("@")[0]
    //  Create Current User Id
    try {
      if(!user){
        throw new Error("No User Available....")
      }
      if (!userId) {
        throw new Error("Invalid user email address. Unable to create SendBird user.");
      }
     await Service.CreateSendBirdUser(
        userId,
        user?.fullName?? "Unknown User",
        user?.imageUrl,
      )
    } catch (error) {
      console.log(error)
    }
    // Create Owners User Id
      try {
        if (!ownerUserId) {
          throw new Error("Invalid owner email address. Unable to create SendBird user.");
        }
         await Service.CreateSendBirdUser(
          ownerUserId,
          carDetail?.userName,
          carDetail?.userImageUrl ?? "",
        )
      } catch (error) {
        
      }
    //Create Channel
    try {
      if (!userId || !ownerUserId) {
        throw new Error("User IDs are missing.");
      }
      const response = await Service.CreateSendBirdChannel(
        [userId,ownerUserId],carDetail?.listingTitle
      )
      console.log("SendBird Channel Created:", response.data);
      navigation("/profile") 
    } catch (error) {
      
    }
  }

 
  return (
    <div className="p-10 border rounded-xl shadow-md mt-7">
      <h2 className="font-medium text-2xl mb-3">Owner/Dealer Details</h2>
      <img src={carDetail?.userImageUrl ?? ""} className="w-[70px] h-[70px] rounded-full" />
      <h2 className="mt-2 font-bold text-xl">{carDetail?.userName}</h2>
      <h2 className="mt-2 text-gray-500">{carDetail?.createdBy}</h2>

      <Button
        className="w-full mt-6"
        onClick={OnMessageOwnerButtonClick}
      >Message Owner </Button>
    </div>
  )
}

export default OwnersDetail 