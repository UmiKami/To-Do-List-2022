import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/Login.css";
import FirebaseAuthService from "../FirebaseAuthService";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const Login = ({ show, onHide }) => {
    const dispatch = useDispatch();
    // checks if there is a existing user logged in
    const [user, setUser] = useState({});

    // checks wether the user wants to log in or sign up
    const [hasAccount, setHasAccount] = useState(true);

    // control input
    const [username, setUsername] = useState("");
    const [email, setUserEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        //
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
    
        }
    }, [user, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!hasAccount) {
            try {
                await FirebaseAuthService.registerUser(email, password, username);
                setUsername("");
                setUserEmail("");
                setPassword("");
            } catch (err) {
                alert(err.message);
            }
        } else {
            try {
                await FirebaseAuthService.loginUser(email, password);
                setUsername("");
                setPassword("");
            } catch (err) {
                alert(err.message);
            }
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
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    {hasAccount ? (
                        <>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                            <h6 className="d-inline ms-2">
                                Don't have an account?{" "}
                                <span
                                    className="text-primary signUpLink"
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
                                    className="text-primary signUpLink"
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
