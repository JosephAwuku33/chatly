import { FC, CSSProperties } from "react";
import {  PacmanLoader } from "react-spinners";

interface LoaderProps {
    loading: boolean;
    color?: string;
    size?: number;
    override: CSSProperties
}

const PacManLoader: FC<LoaderProps> = ({ loading, color, override}) => {
    return (
        <>
            <PacmanLoader color={color} loading={loading} cssOverride={override}/>
        </>
    )
}

export default PacManLoader;