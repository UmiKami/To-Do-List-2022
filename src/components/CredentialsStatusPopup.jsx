import React from "react";
import { Snackbar, Alert } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

const CredentialsErrorPopup = ({ show }) => {
    const [showStatus, setShowStatus] = useState(false);
    const dispatch = useDispatch()
    const authStatusCode = useSelector(state => state.auth.authStatusCode)

    useEffect(() => {
        console.log(authStatusCode);
        if (authStatusCode > 0) {
            setShowStatus(true)
        } else {
            setShowStatus(false)
        }

        if (!show) {
            setTimeout(() => {
                setShowStatus(false)
                dispatch(authActions.setAuthStatusCode(null))
            }, 2000)
        }

    }, [authStatusCode, show])

    const handleClose = (e) => {
        if (e && e.type === "click") {
            // prevents from closing on click away
            return;
        }

        dispatch(authActions.setAuthStatusCode(null))
        setShowStatus(false)
    }

    return (
        <Snackbar
            open={showStatus}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            autoHideDuration={6000}
        >
            {authStatusCode && <Alert severity={authStatusCode >= 400 ? "error" : authStatusCode >= 200 && authStatusCode < 300 && "success"} variant="filled" sx={{ width: '100%' }}>
                {authStatusCode === 400 && "Account does not exist."}
                {authStatusCode === 401 && "Wrong password! Try Again."}
                {authStatusCode === 409 && "Account disabled. Come back later or reset your password." }
                {authStatusCode === 200 && "Login successful!"}
                {authStatusCode === 209 && "Log out successful!"}
            </Alert>}
        </Snackbar>
    );
}

export default CredentialsErrorPopup