import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/Login.css";

const Login = ({ show, onHide }) => {
    const [hasAccount, setHasAccount] = useState(true);

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
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
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
