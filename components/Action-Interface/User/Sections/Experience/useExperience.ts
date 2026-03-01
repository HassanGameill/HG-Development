import { useQuery } from "@tanstack/react-query"
import { TExperience } from "@/types/experienceType"
import { getExperienceService } from "./apiExperienceService"




export const useGetExperience = () => {
    const {data, isLoading, error} = useQuery<TExperience[]>({
        queryKey: ["experience"],
        queryFn: getExperienceService
    })

    return {data, isLoading, error}
}