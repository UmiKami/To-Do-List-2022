import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const ResetPassword = ({
    handleSendReset,
    setUserEmail,
    email,
    emailSent,
    showResetView,
}) => {
    return (
        <>
            {!emailSent ? (
                <Form onSubmit={handleSendReset}>
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
                    <Button
                        variant="danger"
                        className="me-3"
                        onClick={() => showResetView(false)}
                    >
                        Back
                    </Button>
                    <Button variant="primary" type="submit">Send</Button>
                </Form>
            ) : (
                <>
                    <h5>Email has been sent! Check your inbox.</h5>
                    <p
                        className="text-primary custom-link"
                        onClick={() => showResetView(false)}
                    >
                        Go back to Login
                    </p>
                </>
            )}
        </>
    );
};

export default ResetPassword;
