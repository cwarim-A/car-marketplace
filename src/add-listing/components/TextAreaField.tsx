import { Textarea } from "@/components/ui/textarea"
import { Item,CarInfo } from "@/types";





interface TextProps {
  item: Item
  handleInputChange:(name:string,value:string)=>void;
  carInfo: CarInfo | null ;
}

const TextArea:React.FC<TextProps> = ({item,handleInputChange,carInfo}) => {
  return (
    <div>
        <Textarea 
        onChange={(e)=>handleInputChange(item.name,e.target.value)} 
        required={item.required}
        defaultValue={carInfo?.[item.name] ?? ""}
         />
    </div>
  )
}

export default TextArea