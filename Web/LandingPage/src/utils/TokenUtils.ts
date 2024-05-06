export class TokenUtils{
    public static Get() : string | undefined{
        // Extract the AccessToken from the URL
        const url = new URL(window.location.href);
        const queryParams = url.searchParams;
        let accessToken: string | null = queryParams.get('AccessToken');

        if (accessToken) {
        // If token exists in the URL, remove it from the URL
        queryParams.delete('AccessToken');
        window.history.replaceState(null, '', url.toString());

        // Store the token in sessionStorage (simulating header storage)
        sessionStorage.setItem('AccessToken', accessToken);
        } else {
        // If the token is not in the URL, try getting it from sessionStorage
        accessToken = sessionStorage.getItem('AccessToken');
        }

        // Return the token or undefined if null
        return accessToken || undefined;
    }

    public static Logout(){
        // Create a URLSearchParams object based on the current URL
        const url = new URL(window.location.href);
        const queryParams = url.searchParams;

        // Check if the AccessToken is present in the URL
        if (queryParams.has('AccessToken')) {
        // Remove the AccessToken from the URL parameters
        queryParams.delete('AccessToken');

        // Update the URL without the AccessToken
        window.history.replaceState(null, '', url.pathname + '?' + queryParams.toString() + url.hash);
        }

        // Delete the token from sessionStorage
        sessionStorage.removeItem('AccessToken');

        // Optionally, reload the page to ensure all user data is cleared from the current session
        window.location.reload();
    }
}