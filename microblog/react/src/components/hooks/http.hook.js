import { useCallback } from "react";

export const useHttp = () => {
    const request = useCallback(async(url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        try {
            const response = await fetch(url, {method, body, headers})
            if(!response.ok) {
                const status = response.status;
                const errorData = await response.json();
                return { status, message: errorData.message };
            }

            const data = await response.json()
            return data;
            
        } catch (error) {
            throw error;
        }
    }, [])

    return {request};
}
