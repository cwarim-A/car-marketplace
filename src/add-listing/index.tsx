import Header from "@/components/Header"
import carDetails from "./../shared/carDetails.json"
import InputField from "./components/InputField"
import DropdownField from "./components/DropdownField"
import TextArea from "./components/TextAreaField"
import { Separator } from "@/components/ui/separator"
import features from "../shared/features.json"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { db } from "../../configs/index"
import { CarImages, CarListing } from "../../configs/schema"
import IconField from "./components/IconField"
import UploadImage from "./components/UploadImage"
import { BiLoaderAlt } from "react-icons/bi";
import { toast } from "sonner"
import { useNavigate, useSearchParams } from "react-router"
import { useUser } from "@clerk/clerk-react"
import moment from 'moment';
import { eq } from "drizzle-orm"
import Service from "@/shared/Service"
import { CarFeatures, FinalResultItem, ResponseItem,CarInfo as CarInfoProps } from "@/types"






const AddListing: React.FC = () => {
    const [formData, setFormData] = useState<FinalResultItem>()
    const [featuresData, setFeaturesData] = useState<CarFeatures | null>(null)
    const [triggerUploadImages, setTriggerUploadImages] = useState<number | null>(null)
    const [searchParams] = useSearchParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [carInfo, setCarInfo] = useState<CarInfoProps | null>(null)

    const navigate = useNavigate();
    const { user } = useUser();

    const mode = searchParams.get("mode");
    const recordId = searchParams.get("id");


    useEffect(() => {
        if (mode == "edit") {
            GetListingDetails()
        }
    }, [])

    const GetListingDetails = async () => {
        const result:ResponseItem[] = await db.select().from(CarListing).
            innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId)).
            where(eq(CarListing.id,Number(recordId)));
        const resp:FinalResultItem[] = Service.FormatResult(result)
        
        console.log(resp[0])
        setCarInfo(resp[0]);
        setFormData(resp[0]);
        setFeaturesData(resp[0].features)
    }


    // Used to capture user input from form
    const handleInputChange = (name: string, value: string | boolean) => {
        setFormData((prevData) => ({ ...prevData, [name]: value } as FinalResultItem));
        console.log(formData)
    }
    // Used to save selected Feature List
    const handleFeatureChange = (name: keyof CarFeatures, value:  boolean) => {
        setFeaturesData((prevData) => (
            {
                ...prevData,
                [name]: value ?? false
            } as CarFeatures
        ))
    }

    

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        toast("Please wait...");

        try {
            
            const insertData = {
                ...formData,
                features: featuresData,
                createdBy: user?.primaryEmailAddress?.emailAddress ?? "",
                userName:user?.fullName ?? "Devlanrey",
                userImageUrl:user?.imageUrl ?? "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ydDJDeUdOZmkwUDkwSkZFSVBFOTI1UjFPNngifQ?width=160",
                postedOn: moment().format("DD/MM/YYYY"),
                listingTitle: formData?.listingTitle as string,
                tagline: formData?.tagline as string,
                originalPrice: formData?.originalPrice as string,
                sellingPrice: formData?.sellingPrice as string,
                category: formData?.category as string,
                condition: formData?.condition as string,
                make: formData?.make as string,
                model: formData?.model as string,
                year: formData?.year as string,
                driveType: formData?.driveType as string,
                transmission: formData?.transmission as string,
                fuelType: formData?.fuelType as string,
                mileage: formData?.mileage as string,
                color: formData?.color as string,
                door: formData?.door as string,
                listingDescription: formData?.listingDescription as string,

            };


            
            let result;
            if (mode === "edit") {
                result = await db
                    .update(CarListing)
                    .set(insertData)
                    .where(eq(CarListing.id,Number(recordId)))
                    .returning({ id: CarListing.id });
            } else {
                result = await db
                    .insert(CarListing)
                    .values(insertData)
                    .returning({ id: CarListing.id });
            }

            if (result && result[0]?.id) {
                setTriggerUploadImages(result[0].id); // Set the carListingId for image upload
                console.log("CarListing ID:", result[0].id);
            }
        } catch (error) {
            console.error("Error saving car listing:", error);
            toast("Error saving car listing.");
            setLoading(false);
        }
    };




    return (
        <div>
            <Header />
            <div className="px-10 md:px-20 my-10">
                <h2 className="font-bold text-4xl">Add New Listing</h2>
                <form className="p-10 border rounded-xl mt-10">
                    {/* Car Details */}
                    <div>
                        <h2 className="font-medium text-xl mb-6">Car Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {carDetails.carDetails.map((item, index) => (
                                <div key={index}>
                                    <label className="text-sm flex gap-2 items-center mb-1" >
                                        <IconField icon={item?.icon} />
                                        {item?.label} {item?.required && <span className="text-red-500">*</span>}</label>
                                    {item?.fieldType == "number" || item?.fieldType == "text" ? (<InputField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />) :
                                        item?.fieldType == "textarea" ? <TextArea item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
                                            : item.fieldType == "dropdown" ? (<DropdownField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                    <Separator className="my-6" />
                    {/* Features List */}
                    <div>
                        <h2 className="font-medium text-xl my-6">Features</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3">
                            {features.features.map((item, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Checkbox 
                                    onCheckedChange={(value) => handleFeatureChange(item.name as keyof CarFeatures, Boolean(value))}
                                    checked={featuresData?.[item.name as keyof CarFeatures]} 
                                    /> <h2>{item.label}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Car Images */}
                    <Separator className="my-6" />
                    <UploadImage
                        setLoading={(v: boolean) => { setLoading(v); navigate("/profile"); }}
                        triggerUploadImages={triggerUploadImages}
                        carInfo={carInfo}
                    />
                    <div className="mt-10 flex justify-end">
                        <Button type="submit" disabled={loading} onClick={(e: React.MouseEvent<HTMLButtonElement>) => onSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}>
                            {!loading ? "Submit" : <BiLoaderAlt className="animate-spin text-lg" />}
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AddListing