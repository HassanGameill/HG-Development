import { useQuery } from "@tanstack/react-query"
import { getAllSkillsService } from "./apiSkillsService"
import { TSkills } from "@/types/skillsType"




export const useGetSkills = () => {
    const {data, isLoading, error} = useQuery<TSkills[]>({
        queryKey: ["skills"],
        queryFn: getAllSkillsService
    })

    return {data, isLoading, error}
}