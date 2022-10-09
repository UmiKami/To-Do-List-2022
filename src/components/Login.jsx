import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FirebaseAuthService from "../FirebaseAuthService";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import SignUp from "./SignUp";
import ResetPassword from "./ResetPassword";

import "../styles/Login.css";

const Login = ({ show, onHide }) => {
    const dispatch = useDispatch();

    // checks if there is a existing user logged in
    const [user, setUser] = useState(null);

    // checks the user name of existing user
    const currentUsername = useSelector(
        (state) => state.auth.userInfo.username
    );

    // checks wether the user wants to log in or sign up or reset password
    const [hasAccount, setHasAccount] = useState(true);
    const [resetPassword, showResetView] = useState(false);
    const [emailSent, setEmailSent] = useState(false)

    // control input
    const [username, setUsername] = useState("");
    const [email, setUserEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        FirebaseAuthService.subscribeToAuthChanges(setUser);

        // if there is a valid user logged in, we change the state to logged in
        if (user) {
            dispatch(authActions.setIsLoggedIn(true));
            dispatch(
                authActions.setUserInfo({
                    email: user.email,
                    verified: user.emailVerified,
                    username: user.displayName,
                    profilePic: user.photoURL,
                })
            );

            FirebaseAuthService.editUserInfo(
                currentUsername,
                "https://www.stepstherapy.com.au/wp-content/uploads/2018/10/Yazmin-profile-picture-square.jpg"
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, currentUsername, hasAccount, resetPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!hasAccount) {
            try {
                await FirebaseAuthService.registerUser(
                    email,
                    password,
                    username
                );
                setUsername("");
                setUserEmail("");
                setPassword("");
            } catch (err) {
                alert(err.message);
            }
        } else {
            try {
                await FirebaseAuthService.loginUser(email, password);
                setUserEmail("");
                setPassword("");
            } catch (err) {
                alert(err.message);
            }
        }
    };

    const handleSendResetPasswordEmail = async (e) => {
        e.preventDefault()

        if (!email) {
            alert("Missing username!");
            return;
        }

        try {
            await FirebaseAuthService.sendPasswordResetEmail(email);
            setEmailSent(true)
            setUserEmail("")
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {hasAccount && !resetPassword ? "Login" : resetPassword ? "Reset your password" : "Sign Up"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {hasAccount && !resetPassword ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                required
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <section className="d-flex justify-content-between mt-1">
                                <Form.Check
                                    type="checkbox"
                                    label="Remember me"
                                />
                                <Form.Text
                                    className="text-primary custom-link"
                                    onClick={() => showResetView(true)}
                                >
                                    Forgot password
                                </Form.Text>
                            </section>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <h6 className="d-inline ms-2">
                            Don't have an account?{" "}
                            <span
                                className="text-primary custom-link"
                                onClick={() => setHasAccount(false)}
                            >
                                Create an account
                            </span>{" "}
                        </h6>
                    </Form>
                ) : hasAccount && resetPassword ? (
                    <ResetPassword
                        handleSendReset={handleSendResetPasswordEmail}
                        setUserEmail={setUserEmail}
                        email={email}
                        emailSent={emailSent}
                        showResetView={showResetView}
                    />
                ) : (
                    <SignUp
                        setUsername={setUsername}
                        setUserEmail={setUserEmail}
                        setPassword={setPassword}
                        username={username}
                        email={email}
                        password={password}
                        setHasAccount={setHasAccount}
                        handleSubmit={handleSubmit}
                    />
                )}
            </Modal.Body>
        </Modal>
    );
};

export default Login;
