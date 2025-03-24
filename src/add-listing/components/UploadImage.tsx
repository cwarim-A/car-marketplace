import { db } from "../../../configs/index";
import { CarImages } from "../../../configs/schema";
import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { eq } from "drizzle-orm";
import { CarInfo } from "@/types";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dm8jh1n7a/image/upload";
const UPLOAD_PRESET = "car-marketplace";




interface UploadImageProps {
    triggerUploadImages: number | null; // Assuming triggerUploadImages is a number or null
    setLoading: (loading: boolean) => void; // setLoading is a function that takes a boolean
    carInfo: CarInfo | null; // carInfo is a CarInfo object or null
}


const UploadImage:React.FC<UploadImageProps> = ({ triggerUploadImages, setLoading, carInfo }) => {
    const [selectedFileList, setSelectedFileList] = useState<File[]>([]);
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
    const [oldImages, setOldImages] = useState<any[]>([]);

    useEffect(() => {
        if (carInfo?.images) {
            setOldImages(Array.isArray(carInfo.images) ? carInfo.images : [carInfo.images]);
        }
    }, [carInfo]);

    useEffect(() => {
        if (triggerUploadImages) {
            console.log("Triggering image upload for carListingId:", triggerUploadImages);
            UploadImagesToServer();
        }
    }, [triggerUploadImages]);

    const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files?.length) return; // Exit if no files
        setSelectedFileList((prev) => [...prev, ...Array.from(files)]);
    };

    const onImageRemove = async (image: any, index: number) => {
        if (image instanceof File) {
            // Remove from selectedFileList
            const result = selectedFileList.filter((item) => item !== image);
            setSelectedFileList(result);
        } else {
            // Remove from oldImages and database
            try {
                await db.delete(CarImages).where(eq(CarImages.id, image.id));
                setOldImages((prev) => prev.filter((img) => img.id !== image.id));
            } catch (error) {
                console.error("Error deleting image from database:", error);
            }
        }
    };

    const UploadImagesToServer = async () => {
        setLoading(true);

        try {
            const uploadPromises = selectedFileList.map(async (file) => {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", UPLOAD_PRESET);

                const response = await fetch(CLOUDINARY_URL, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) throw new Error("Failed to upload image");

                const data = await response.json();
                return data.secure_url;
            });

            // Upload images in parallel and store URLs
            const uploadedImages = await Promise.all(uploadPromises);
            console.log("Uploaded images url", uploadedImages);
            setUploadedUrls(uploadedImages);

            // Save image URLs to the database
            
            if (uploadedImages.length > 0) {
                await db.insert(CarImages).values(
                    uploadedImages.map((url) => ({
                        imageUrl: url,
                        carListingId: triggerUploadImages ?? 0,
                    }))
                );
                console.log("Images uploaded to database successfully:");
            } else {
                return;
            }

            // Reset selected files after upload
            setLoading(false);
            setSelectedFileList([]);
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };

    return (
        <div>
            <h2 className="font-medium text-xl my-3">Upload Car images</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {oldImages.map((image, index) => (
                    <div key={index}>
                        <IoMdCloseCircle className="absolute m-2 text-lg text-white" onClick={() => onImageRemove(image, index)} />
                        <img src={image.imageUrl} className="w-full h-[130px] object-cover rounded-xl" />
                    </div>
                ))}
                {selectedFileList.map((image, index) => (
                    <div key={index}>
                        <IoMdCloseCircle className="absolute m-2 text-lg text-white" onClick={() => onImageRemove(image, index)} />
                        <img src={URL.createObjectURL(image)} className="w-full h-[130px] object-cover rounded-xl" />
                    </div>
                ))}
                <label htmlFor="upload-images">
                    <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer hover:shadow-md">
                        <h2 className="text-lg text-center text-primary">+</h2>
                    </div>
                </label>
                <input
                    type="file"
                    multiple={true}
                    id="upload-images"
                    onChange={onFileSelected}
                    className="opacity-0"
                />
            </div>
        </div>
    );
};

export default UploadImage;