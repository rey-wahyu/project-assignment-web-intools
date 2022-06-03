export const responseArrayFormater = (response: any) => {
    return {
        data: [...response],
        meta: {
            total_data: response.length,
        },
    };
};