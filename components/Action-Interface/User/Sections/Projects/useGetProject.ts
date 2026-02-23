import { useQuery } from "@tanstack/react-query"
import { getAllProjectsService, getProjectCategoryService } from "./apiProjectService"






export const useGetProjects = () => {
    const {data, isLoading, error} = useQuery({
        queryKey: ["projects"],
        queryFn: getAllProjectsService,
    }); 

    return {data, isLoading, error}
}





export const useGetProjectCategory = () => {
    const {data, isLoading, error} = useQuery({
        queryKey: ["categories"],
        queryFn: getProjectCategoryService,
    }); 

    return {data, isLoading, error}
}