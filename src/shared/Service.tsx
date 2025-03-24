
import {  CarFeatures, FinalResultItem, ResponseItem, ResultItem } from "@/types";
import axios from "axios"














const SendBirdApplicationId = import.meta.env.VITE_SENDBIRD_APP_ID
const SendBirdApiToken = import.meta.env.VITE_SENDBIRD_API_TOKEN


const FormatResult = (resp: ResponseItem[]): FinalResultItem[]=>{
    const result: Record<string, ResultItem> = {};
    const finalResult: FinalResultItem[] = [];

    resp.forEach((item) => {
        const listingId = item.carListing?.id;
        if (listingId && !result[listingId]) {
            result[listingId] = {
                car: {
                    ...item.carListing!,
                    features: item.carListing?.features as CarFeatures
                }, // Use non-null assertion since we checked `listingId`
                images: []
            };
        }
        if (listingId && item.carImages) {
            result[listingId].images.push(item.carImages);
        }
    });



Object.values(result).forEach((item) => {
    finalResult.push({
        ...item.car,
        images: item.images
    });
});


    return finalResult;
};

const CreateSendBirdUser = (userId: string, nickName: string, profileUrl: string) => {
    try {
        return axios.post(`https://api-${SendBirdApplicationId}.sendbird.com/v3/users`, {
            user_id: userId,
            nickname: nickName,
            profile_url: profileUrl,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Api-Token": SendBirdApiToken
            },
        });

    } catch (error) {

    }
}

const CreateSendBirdChannel = (users: string[], title: string) => {
    return axios.post(`https://api-${SendBirdApplicationId}.sendbird.com/v3/group_channels
`, {
        user_ids: users,
        is_distinct: true,
        name: title
    },
        {
            headers: {
                "Content-Type": "application/json",
                "Api-Token": SendBirdApiToken
            },
        }
    )
}



export default {
    FormatResult,
    CreateSendBirdUser,
    CreateSendBirdChannel
};