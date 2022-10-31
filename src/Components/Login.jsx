import React, { useState } from 'react'
import {
    Form,
    Button,
    Row,
    Col,
    Alert,
} from 'react-bootstrap';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../Context/UserAuthContext';

const Login = () => {

    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn,googlesignIn,user } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            navigate("/profile");
        } catch (err) {
            setError(err.message);
        }
    };
    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googlesignIn();   
            console.log( user )
            navigate( "/profile" );
        } catch( err ) {
            setError(err.message);
        }
    }

    return (
        <>
            <div className='p-5 m-5 box'>
                <h1 className="mb-3 text-center">
                   Log In
                </h1>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Row className="justify-content-md-center">
                    <Col xs lg="6">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e) => SetEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => SetPassword(e.target.value)} />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit">
                                    LogIn
                                </Button>
                            </div>
                        </Form>
                        <div className="my-3 text-center">
                            OR
                            <br /><br />
                            <div>
                                <GoogleButton className="g-btn" type="dark" onClick={ handleGoogleSignIn } />
                            </div>
                        </div>
                        <div className='my-4 text-center'>
                            Don't have an account? <Link to="/signup">Sign In</Link>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Login