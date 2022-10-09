import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/Login.css";
import FirebaseAuthService from "../FirebaseAuthService";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

const Login = ({ show, onHide }) => {
    const dispatch = useDispatch();

    // checks if there is a existing user logged in
    const [user, setUser] = useState(null);

    // checks the user name of existing user
    const currentUsername = useSelector(
        (state) => state.auth.userInfo.username
    );

    // checks wether the user wants to log in or sign up
    const [hasAccount, setHasAccount] = useState(true);

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
    }, [user, currentUsername]);

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

    const handleSendResetPasswordEmail = async () => {
        if (!email) {
            alert("Missing username!");
            return;
        }

        try {
            await FirebaseAuthService.sendPasswordResetEmail(email);
            alert("Sent reset email");
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
                    {hasAccount ? "Login" : "Sign Up"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {!hasAccount && (
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                    )}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            required
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {hasAccount && (
                            <section className="d-flex justify-content-between mt-1">
                                <Form.Check
                                    type="checkbox"
                                    label="Remember me"
                                />
                                <Form.Text className="text-primary custom-link" onClick={handleSendResetPasswordEmail}>
                                    Forgot password
                                </Form.Text>
                            </section>
                        )}
                    </Form.Group>
                    {hasAccount ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <Button variant="warning" type="submit">
                                Sign Up
                            </Button>
                            <h6 className="d-inline ms-2">
                                Already have an account?{" "}
                                <span
                                    className="text-primary custom-link"
                                    onClick={() => setHasAccount(true)}
                                >
                                    Log in to your account
                                </span>{" "}
                            </h6>
                        </>
                    )}
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default Login;
