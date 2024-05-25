import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function UserRegistration() {

    const jwtToken = process.env.REACT_APP_JWT_TOKEN;
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
    });

    const handleChange = (event) => {
        setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: new Headers({
                "Authorization": jwtToken,
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                ...userDetails,
                isActive: true
            }),
        };

        console.log(requestOptions);

        fetch("https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/users", requestOptions)
            .then(response => response.text())
            .then(result => {
                navigate('/');
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                User Registration
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={userDetails.email}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="firstName"
                    label="First Name"
                    id="firstName"
                    autoComplete="given-name"
                    value={userDetails.firstName}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    id="lastName"
                    autoComplete="family-name"
                    value={userDetails.lastName}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={userDetails.password}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </Button>
            </Box>
        </Container>
    );
}

export default UserRegistration;
