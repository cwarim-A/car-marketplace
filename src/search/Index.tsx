import Header from "@/components/Header"
import { db } from "../../configs";
import { useSearchParams } from "react-router"
import { CarImages, CarListing } from "../../configs/schema";
import { and, eq } from "drizzle-orm";
import Service from "@/shared/Service";
import { useEffect, useState } from "react";
import Search from "@/components/Search";
import CarItem from "@/components/CarItem";
import { FinalResultItem } from "@/types";


const SearchByOptions = () => {
    const [searchParams] = useSearchParams()
    const [carList, setCarList] = useState<FinalResultItem[]>([])




    const condition = searchParams.get("cars");
    const make = searchParams.get("make");
    const price = searchParams.get("price");
    console.log( price)

    useEffect(() => {
        GetCarList()
    }, [condition, make, price])

    const GetCarList = async () => {
        let filters = [];

        if (condition) filters.push(eq(CarListing.condition, condition));
        if (make) filters.push(eq(CarListing.make, make));
        if (price) filters.push(eq(CarListing.sellingPrice, price));

        let query = await db
            .select()
            .from(CarListing)
            .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))


        if (filters.length > 0) {
            query = await db
                .select()
                .from(CarListing)
                .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
                .where(and(...filters));
           
        }

        const result = await query;


        const resp: FinalResultItem[] = Service.FormatResult(result)
        console.log(resp)
        setCarList(resp)
    }


    return (
        <div>
            <Header />

            <div className="p-16 bg-black flex justify-center">
                <Search />
            </div>
            <div className="p-10 md:px-20">
                <h2 className="font-bold text-4xl ">Search Results</h2>

                {/* List of carList */}
                <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-5 mt-7">
                    {carList.length > 0 ? carList.map((item, index) => (
                        <div key={index}>
                            <CarItem car={item} />
                        </div>
                    )) :
                        [1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                            <div key={index} className="h-[320px] rounded-xl bg-slate-200 animate-pulse">

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchByOptions