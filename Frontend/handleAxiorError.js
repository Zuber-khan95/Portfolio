export const handleAxiosError=(error)=>{
    if(error.response)
    {
        console.error("Server Error:",error.response);
        return error.response;
    }
    else if(error.request)
    {
        console.error("Network Error:",error.request);
    return "Network Error";
    }
    else
    {
        console.error("Client Error",error.message);
        return "Unexpected error occured";
    }
};
