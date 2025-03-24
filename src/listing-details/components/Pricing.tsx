import { Button } from "@/components/ui/button"
import { CarDetail } from "@/types";
import { MdOutlineLocalOffer } from "react-icons/md";




interface CarDetailProps{
    carDetail:CarDetail | null;
}





const Pricing:React.FC<CarDetailProps> = ({ carDetail }) => {
    return (
        <>
        {carDetail ? <div className="p-10 rounded-xl border shadow-md">
            <h2>Our Price</h2>
            <h2 className="font-bold text-4xl">${carDetail?.sellingPrice}</h2>

            <Button className="w-full mt-7" size="lg"><MdOutlineLocalOffer className="text-lg mr-2" />
                Make an Offer Price</Button>
        </div>: <div className="w-full h-[200px] rounded-xl bg-slate-200 animate-pulse">
            </div>}
        </>
    )
}

export default Pricing