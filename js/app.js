let auth0client = null;
const fetchAuthConfig = () => fetch("auth_config.json");

const configureClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();

    auth0Client = await auth0.createAuth0Client({
        domain: config.domain,
        clientId: config.clientId
    });
    console.log("auth0 configured! ");
};

window.onload = async () => {
    await configureClient()
        .catch((e) => {
            console.log(e);
        });
    // NEW - update the UI state
    updateUI();
    const isAuthenticated = await auth0Client.isAuthenticated()
        .catch((err) => { console.log(err); });

    if (isAuthenticated) {
        // show the gated content
        return;
    }
    // NEW - check for the code and state parameters
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {

        // Process the login state
        await auth0Client.handleRedirectCallback();

        updateUI();

        // Use replaceState to redirect the user away and remove the querystring parameters
        window.history.replaceState({}, document.title, "/");
    }

};

const updateUI = async () => {
    const isAuthenticated = await auth0Client.isAuthenticated();
    const userProfile = await auth0Client.getUser();
    const profileElement = document.getElementById("profile");

    document.getElementById("btn-logout").disabled = !isAuthenticated;
    document.getElementById("btn-login").disabled = isAuthenticated;

    // NEW - add logic to show/hide gated content after authentication
    if (isAuthenticated) {

        profileElement.style.display = "block";
        profileElement.innerHTML = `
       <p>Welcome ${userProfile.nickname}!</p>
       `;
        document.getElementById("gated-content").classList.remove("hidden");


    } else {

        profileElement.style.display = "none";
    }
};

const login = async () => {
    await auth0Client.loginWithRedirect({
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    });
};

const logout = () => {
    auth0Client.logout({
        logoutParams: {
            returnTo: window.location.origin
        }
    });
};