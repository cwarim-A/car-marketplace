import { FaCheck } from "react-icons/fa";




interface FeatureProps {
    powerSteering: boolean;
  stabilityControl: boolean;
  tractionControl: boolean;
  brakeAssist: boolean;
  antiLockBraking: boolean;
  airConditioner:boolean;
  leatherSeats:boolean;
  touchScreenDisplay:boolean;
  childSafetyLocks:boolean;
  rainSensingWiper:boolean;
  bluetooth:boolean;
  digitalOdometer:boolean;
  panoramicRoof:boolean;
  driverAirBag:boolean;
  rearSpoiler:boolean;
  androidAuto:boolean;
  homeLink:boolean;
  heater:boolean;
  tachometer:boolean;
  powerDoorLocks:boolean;
  fogLightFronts:boolean;
  windowsElectric:boolean;
  appleCarplay:boolean;
  comfortConvenience:boolean;
  appleCarPlay:boolean;
}
interface FeaturesProps {
    features:FeatureProps | null | undefined;
}

const Features:React.FC<FeaturesProps> = ({features}) => {

    const safeFeatures = features && typeof features === "object" ? features : {};


  return (
    
        <div className="p-10  rounded-xl border shadow-md my-7">
            <h2 className="font-medium text-2xl">Features</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-4 gap-7">
                {Object.entries(safeFeatures).map(([key,_value],index)=>(
                    <div key={index} className="flex gap-2 items-center">
                        <FaCheck className="text-lg p-1 rounded-full bg-blue-100 text-primary" />
                       <h2>{key}</h2>
                    </div>
                ))}
            </div>

        </div>
    
  )
}

export default Features