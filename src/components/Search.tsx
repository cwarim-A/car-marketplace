import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Data from "@/shared/Data";
import {  useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router";






const Search = () => {

      const [cars,setCars] = useState<string | undefined>(undefined)
      const [make,setMake] = useState<string | undefined>(undefined)
    //   const [price,setPrice] = useState<string | undefined>(undefined)

    


    return (
        <div className="p-2 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center w-[60%]">
            <Select onValueChange={(value)=>setCars(value)}>
                <SelectTrigger className=" outline-none md:border-none w-full shadow-none text-lg" >
                    <SelectValue placeholder="Cars" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Used">Used</SelectItem>
                    <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
                </SelectContent>
            </Select>
            <Separator orientation="vertical" className="hidden md:block" />
            <Select onValueChange={(value)=>setMake(value)}>
                <SelectTrigger className=" outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Car Makes" />
                </SelectTrigger>
                <SelectContent>
                    {Data.CarMakes.map((maker,index)=>(
                        <SelectItem key={index} value={maker.name}>{maker.name}</SelectItem>
                    ))}   
                </SelectContent>
            </Select>
            <Separator orientation="vertical" className="hidden md:block" />
            {/* <Select onValueChange={(value)=>setPrice(value)}>
                <SelectTrigger className=" outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent>
                {Data.Pricing.map((price,index)=>(
                        <SelectItem key={index} value={price.amount.toString()}>{price.amount}</SelectItem>
                    ))} 
                </SelectContent>
            </Select> */}
            <Link to={`/search?cars=${cars}&make=${make}`}>
               <CiSearch className="text-[50px] bg-primary rounded-full p-3 text-white hover:scale-105 transition-all cursor-pointer" />
            </Link>
        </div>
    )
}

export default Search