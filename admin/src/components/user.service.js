
export const userService = {
    login,
    logout
};

function login(username, password) {
    const user = {
        username: username,
        password: password
    };
    if (username === "admin" && password === "admin456852")
    {
        localStorage.setItem('user', JSON.stringify(user));
        console.log(localStorage)
        return true;
    }
    else
        return false;
}

function logout() {
    // remove user from local storage to log user out
}