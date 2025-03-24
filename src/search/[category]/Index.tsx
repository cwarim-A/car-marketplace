import Header from "@/components/Header"
import Search from "@/components/Search"
import { db } from "../../../configs/index"
import { useParams } from "react-router"
import { CarImages, CarListing } from "../../../configs/schema"
import { eq } from "drizzle-orm"
import { useEffect, useState } from "react"
import Service from "@/shared/Service"
import CarItem from "@/components/CarItem"
import { FinalResultItem } from "@/types"


const SearchByCategory = () => {

    const { category } = useParams()
    const [carList, setCarList] = useState<FinalResultItem[]>([])

    useEffect(() => {
        GetCarList()
    }, [])

    const GetCarList = async () => {
        if (!category) {
            console.error("Category is undefined");
            return; // Prevent query execution if category is undefined
        }
        const result = await db
            .select().from(CarListing)
            .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
            .where(eq(CarListing.category, category))
        const resp: FinalResultItem[] = Service.FormatResult(result)
        setCarList(resp)
    }

    return (
        <div>
            <Header />

            <div className="p-16 bg-black flex justify-center">
                <Search />
            </div>
            <div className="p-10 md:px-20">
                <h2 className="font-bold text-4xl ">{category}</h2>

                {/* List of carList */}
                <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-5 mt-7">
                    {carList.length > 0 ? carList.map((item, index) => (
                        <div key={index}>
                            <CarItem car={item} />
                        </div>
                    )) : 
                    [1,2,3,4,5,6,7,8].map((Item,index)=>(
                        <div key={index} className="h-[320px] rounded-xl bg-slate-200 animate-pulse">

                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchByCategory