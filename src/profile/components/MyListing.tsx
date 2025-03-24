import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/clerk-react"
import { db } from "../../../configs/index"
import { CarImages, CarListing } from "../../../configs/schema"
import { desc, eq } from "drizzle-orm"
import { useEffect, useState } from "react"
import { Link, } from "react-router"
import Service from "@/shared/Service"
import CarItem from "@/components/CarItem"
import { FaTrashAlt } from "react-icons/fa"
import ConfirmDialog from "@/add-listing/components/ConfirmDialog"
import {   FinalResultItem, ResponseItem } from "@/types"










const MyListing = () => {
    const { user } = useUser();
    const [carList, setCarList] = useState<FinalResultItem[]>([])



    useEffect(() => {
        user && GetCarUserListing()
    }, [user])


    const GetCarUserListing = async (): Promise<void> => {
        const userEmail = user?.primaryEmailAddress?.emailAddress
        if (!userEmail) {
            console.error("User email is undefined");
            return;
        }
        const result:ResponseItem[] = await db
            .select()
            .from(CarListing)
            .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
            .where(eq(CarListing.createdBy, userEmail))
            .orderBy(desc(CarListing.id));
            

        
        const resp: FinalResultItem[] = Service.FormatResult(result)
        console.log("resp", resp.length)
        setCarList(resp)
    }

    const handleDelete = async (carListingId: number) => {
        try {
            await db.delete(CarImages).where(eq(CarImages.carListingId, carListingId));
            await db.delete(CarListing).where(eq(CarListing.id, carListingId));
            setCarList((prev) => prev.filter((car) => car.id !== carListingId));
        } catch (error) {
            console.error("Error deleting listing:", error);
        }
    };







    return (
        <div className="mt-6">
            <div className="flex justify-between items-center" >
                <h2 className="font-bold text-4xl">My Listing</h2>
                <Link to={"/add-listing"}>
                    <Button>+ Add New Listing</Button>
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5">
                {carList?.map((item, index) => (
                    <div key={index}>
                        <CarItem car={item} />
                        <div className="p-2 bg-gray-50 rounded-lg flex justify-between gap-3 ">
                            <Link to={"/add-listing?mode=edit&id=" + item?.id} className="w-full">
                                <Button variant="outline" className="w-full">Edit</Button>
                            </Link>
                            <ConfirmDialog
                                title="Delete Listing?"
                                description="This will permanently remove the listing and its images."
                                onConfirm={() => handleDelete(item.id)}
                                triggerText={<FaTrashAlt />}
                                confirmText="Yes, Delete"
                                cancelText="Cancel"
                                variant="destructive"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyListing;