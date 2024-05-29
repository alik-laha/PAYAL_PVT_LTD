import { useMutation } from "react-query";

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

const UseMutationData = (url: string, method: string, type: string) => {
    const {
        data,
        error,
        isLoading,
    } = useMutation(type, () => FetchData(url, method));

    return { data, error, isLoading }
}

export default UseMutationData;