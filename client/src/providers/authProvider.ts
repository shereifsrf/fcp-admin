import { getLocalStorage } from "../utils";

const mode = process.env.NODE_ENV;
const serverUrl = process.env.REACT_APP_SERVER_URL;
const localUrl = process.env.REACT_APP_LOCAL_URL;
// console.log("HERE##############: ", mode, serverUrl, localUrl);
let apiUrl = mode === "production" ? serverUrl : localUrl;
apiUrl += "/v1";

const AuthProvider = {
    // called when the user attempts to log in
    login: ({ email, password }: { email: string; password: string }) => {
        const request = new Request(`${apiUrl}/auth/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: new Headers({ "Content-Type": "application/json" }),
        });
        return fetch(request)
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((auth) => {
                localStorage.setItem("auth", JSON.stringify(auth));
            })
            .catch((e) => {
                throw new Error(e);
            });
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem("email");
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }: { status: number }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem("email");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem("auth")
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
    getIdentity: () => {
        try {
            const { id, name: fullName, email } = getLocalStorage("user");
            // console.log(id, fullName, email);
            return Promise.resolve({ id, fullName, email });
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
};
export default AuthProvider;
