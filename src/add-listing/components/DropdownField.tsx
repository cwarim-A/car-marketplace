import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Item,CarInfo } from "@/types";


// interface CarInfo {
//     [key: string]: string 
//   }

interface DropdownFieldProps {
    item: Item;
    handleInputChange:(name:string,value:string)=>void;
    carInfo: CarInfo | null;
  }


const DropdownField:React.FC<DropdownFieldProps> = ({item,handleInputChange,carInfo}) => {
    return (
        <div>
            <Select onValueChange={(value)=>handleInputChange(item.name,value)} required={item.required} defaultValue={carInfo?.[item?.name] ?? ""}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={carInfo?.[item?.name]? carInfo?.[item?.name]:item.label} />
                </SelectTrigger>
                <SelectContent>
                    
                   {item.options?.map((option,index)=>(
                      <SelectItem key={index} value={option}>{option}</SelectItem>
                   ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default DropdownField