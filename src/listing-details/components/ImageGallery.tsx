
import { CarDetail } from "@/types";

interface CarDetailProps{
  carDetail:CarDetail | null
}



const ImageGallery:React.FC<CarDetailProps> = ({carDetail}) => {
  return (
    <div>
        <img src={carDetail?.images[0].imageUrl} className="w-full h-[500px] object-cover rounded-xl" />
    </div>
  )
}

export default ImageGallery