'use client';

import Alert from "@/components/ui/alert/Alert";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function AlertPlayer() {
    const { successAlert } = useSelector((state: RootState) => state.alert);
    
    return (
        <>
            {successAlert && <Alert variant="success" title={successAlert}/>}
        </>
    )
}
