import { Input } from "@/components/ui/input"
import { Item,CarInfo } from "@/types";





interface ItemProps {
    item: Item;
    handleInputChange:(name:string,value:string)=>void;
    carInfo: CarInfo | null;
  }

const InputField:React.FC<ItemProps> = ({item,handleInputChange,carInfo}) => {
  return (
    <div>
        <Input
         type={item?.fieldType}
         name={item?.name}
         required={item?.required}
         defaultValue={carInfo?.[item.name] ?? ""}
         onChange={(e)=>handleInputChange(item.name,e.target.value)} 
          />
    </div>
  )
}

export default InputField