import * as React from "react";
import { useState } from "react";
import { useLogin, useNotify, Notification, defaultTheme } from "react-admin";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from "@material-ui/core";

const MyLoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useLogin();
    const notify = useNotify();
    const submit = (e) => {
        e.preventDefault();
        // will call authProvider.login({ email, password })
        login({ email, password }).catch(() =>
            notify("Invalid email or password")
        );
    };

    return (
        <ThemeProvider theme={createTheme(defaultTheme)}>
            <Container maxWidth="sm">
                <form onSubmit={submit}>
                    <Typography variant="h2">Admin Portal</Typography>
                    <TextField
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        value={email}
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        value={password}
                        label="password"
                        type="password"
                        name="password"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Login{" "}
                        </Button>
                    </Box>
                </form>
                <Notification />
            </Container>
        </ThemeProvider>
    );
};

export default MyLoginPage;
