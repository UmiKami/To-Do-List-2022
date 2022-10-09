import { Form, Button } from "react-bootstrap";

const SignUp = ({
    setUsername,
    setUserEmail,
    setPassword,
    username,
    email,
    password,
    setHasAccount,
    handleSubmit
}) => {
    return (
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
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

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
                </span>
            </h6>
        </Form>
    );
};

export default SignUp;
