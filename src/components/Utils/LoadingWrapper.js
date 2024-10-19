import { Skeleton } from "@mui/material";
import React from "react";

const LoadingWrapper = ({isLoading, error, children}) => {
    if(isLoading) {
        return <Skeleton animation="wave" />
    }

    if(error) {
        // TODO: error handler
        console.log(error)
    }

    return children;
}

export default LoadingWrapper;