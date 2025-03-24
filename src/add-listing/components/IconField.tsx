import {JSX} from "react"
import { FaCalendarAlt,
         FaCar, 
         FaCarSide,
         FaCheckCircle,
         FaCircle,
         FaClipboardList, 
         FaCogs, 
         FaDollarSign, 
         FaDoorClosed, 
         FaFileAlt, 
         FaGasPump, 
         FaIdCard, 
         FaIndustry, 
         FaMoneyBillAlt, 
         FaPalette, 
         FaRoad, 
         FaTachometerAlt,
         FaTag, 
         FaTags, 
         FaWrench }
          from "react-icons/fa"

const iconMap: Record<string, JSX.Element> = {
    FaClipboardList: <FaClipboardList />,
    FaTag: <FaTag />,
    FaDollarSign: <FaDollarSign />,
    FaMoneyBillAlt: <FaMoneyBillAlt />,
    FaCar: <FaCar />,
    FaCheckCircle: <FaCheckCircle />,
    FaIndustry: <FaIndustry />,
    FaCarSide: <FaCarSide />,
    FaCalendarAlt: <FaCalendarAlt />,
    FaRoad: <FaRoad />,
    FaCogs: <FaCogs />,
    FaGasPump: <FaGasPump />,
    FaTachometerAlt: <FaTachometerAlt/>,
    FaWrench: <FaWrench/>,
    FaCircle: <FaCircle/>,
    FaPalette: <FaPalette/>,
    FaDoorClosed: <FaDoorClosed/>,
    FaIdCard: <FaIdCard/>,
    FaTags: <FaTags/>,
    FaFileAlt: <FaFileAlt/>
} 

interface IconFieldProps {
    icon: keyof typeof iconMap; // Ensures the icon is a valid key in `iconMap`
  }


const IconField: React.FC<IconFieldProps> = ({icon}) => {
    return (
        <div className="text-primary bg-blue-100 p-1.5 rounded-full">{iconMap[icon]}</div>
    )
}

export default IconField