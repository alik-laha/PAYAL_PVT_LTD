import { useQuery } from "react-query";

const FetchData = async (url: string, method: string) => {
    try {
        const response = await fetch(url, {
            method: method,
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};

const UseQueryData = (url: string, method: string, type: string) => {
    const {
        data,
        error,
        isLoading,
    } = useQuery(type, () => FetchData(url, method), {
        staleTime: 15 * 60 * 1000,
        cacheTime: 40 * 60 * 1000,
    });

    return { data, error, isLoading }
}

export default UseQueryData;