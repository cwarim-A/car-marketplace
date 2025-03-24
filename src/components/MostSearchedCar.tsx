
import CarItem from "./CarItem"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { db } from "./../../configs"
import { CarImages, CarListing } from "../../configs/schema"

import { desc, eq } from "drizzle-orm"
import Service from "@/shared/Service"
import { useEffect, useState } from "react"
import { FinalResultItem, ResponseItem } from "@/types"







const MostSearchedCar = () => {
  const [carList, setCarList] = useState<FinalResultItem[]>([])


  useEffect(() => {
    GetPopularCarList()
  }, [])


  const GetPopularCarList = async () => {

    const result:ResponseItem[]  = await db.select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .orderBy(desc(CarListing.id))
      .limit(10);
    const resp:FinalResultItem[]= Service.FormatResult(result)
    setCarList(resp)
  }
  return (
    <div className="mx-18 md:mx-20 lg:mx-24"> 
      <h2 className="font-bold text-2xl text-center mt-16 mb-7 md:text-3xl">Most Searched Cars</h2>

      <Carousel>
        <CarouselContent>

          {carList.map((car, index) => (
            <CarouselItem key={index} className="basis-1/1 md:basis-1/2 lg:basis-1/4">
              <CarItem car={car} key={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>


    </div>
  )
}

export default MostSearchedCar