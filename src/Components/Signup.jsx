import { async } from '@firebase/util';
import React, { useState } from 'react'
import {
    Form,
    Button,
    Row,
    Col,
    Alert,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../Context/UserAuthContext';

const Signup = () => {

    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [error, setError] = useState("");
    const { signUp } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signUp(email, password);
            navigate( "/login" )
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <div className='p-5 m-5 box'>
                <h1 className="mb-3 text-center"> Sign UP </h1>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Row className="justify-content-md-center">
                    <Col xs lg="6">
                        <Form onSubmit={ handleSubmit }>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e) => SetEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => SetPassword(e.target.value)} />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="Submit">
                                    Sign up
                                </Button>
                            </div>
                        </Form>
                        <div className='my-4 text-center'>
                            Already have an account? <Link to="/login">Log In</Link>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Signup
