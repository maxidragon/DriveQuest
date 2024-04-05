import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const calculateTotalPages = (
    totalItems: number,
    itemsPerPage: number
) => {
    return Math.ceil(totalItems / itemsPerPage);
};

export const getAssetType = (assetName: string) => {
    const videoExtensions = [
        "mp4",
        "webm",
        "ogg",
        "wav",
        "avi",
        "mov",
        "flv",
        "wmv",
    ];
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "svg"];
    if (videoExtensions.some((extension) => assetName.includes(extension))) {
        return "video";
    }
    if (imageExtensions.some((extension) => assetName.includes(extension))) {
        return "image";
    }
    return "other";
};

export const formatSeconds = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds}`;
};
