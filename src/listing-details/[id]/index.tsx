import Header from "@/components/Header"
import DetailHeader from "../components/DetailHeader"
import { useParams } from "react-router"
import { db } from "../../../configs"
import { CarImages, CarListing } from "../../../configs/schema"
import { eq } from "drizzle-orm"
import { useEffect, useState } from "react"
import Service from "@/shared/Service"
import ImageGallery from "../components/ImageGallery"
import Description from "../components/Description"
import Features from "../components/Features"
import Pricing from "../components/Pricing"
import CarSpecification from "../components/Specification"
import OwnersDetail from "../components/OwnersDetail"
import Footer from "@/components/Footer."
import FinancialCalculator from "../components/FinancialCalculator"
import MostSearchedCar from "@/components/MostSearchedCar"
import {  FinalResultItem, ResponseItem,CarDetail } from "@/types"








const ListingDetail:React.FC = () => {
    const {id} = useParams()
    const[carDetail,setCarDetail] = useState<CarDetail | null>(null)

    useEffect(()=>{
        GetCarDetail()
    },[])
    
    const GetCarDetail = async()=>{
        const result:ResponseItem[] = await db.select()
        .from(CarListing).innerJoin(CarImages,eq(CarListing.id,CarImages.carListingId))
        .where(eq(CarListing.id,Number(id)))

        const resp: FinalResultItem[] = Service.FormatResult(result)
        setCarDetail(resp[0])
    }
  return (
    <div>
        <Header/>

        <div className="p-10 md:px-20">
            {/* Header Detail Component */}
            <DetailHeader carDetail={carDetail}/>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5">
                {/* left */}
                <div className="md:col-span-2 ">
                        {/* Image Gallery */}
                        <ImageGallery carDetail={carDetail}/>
                        {/* Description */}
                        <Description carDetail={carDetail}/>
                        {/* FeaturesList */}
                        <Features features={carDetail?.features}/>
                        {/* Financial calculator */}
                        <FinancialCalculator />
                </div>
                {/* Right */}
                <div className="">
                        {/* Pricing */}
                        <Pricing carDetail={carDetail}/>
                        {/* Car Specification */}
                        <CarSpecification carDetail={carDetail}/>
                        {/* Owner's Detail */}
                        <OwnersDetail carDetail={carDetail}/>
                </div>
            </div>
            <MostSearchedCar/>
        </div>
        <Footer/>
    </div>
  )
}

export default ListingDetail