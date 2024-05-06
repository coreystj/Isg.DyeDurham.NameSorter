export class WindowUtils{

    public static ScrollDownOneViewport = () => {
        // Get the viewport height
        const viewportHeight = window.innerHeight;
        // Calculate the next full viewport position below the current scroll position
        const nextPosition = Math.floor((window.scrollY + viewportHeight) / viewportHeight) * viewportHeight;
        // Scroll to the calculated position
        window.scrollTo({
            top: nextPosition,
            behavior: 'smooth'
        });
    };

    public static ScrollUpOneViewport = () => {
        // Get the viewport height
        const viewportHeight = window.innerHeight;
        // Calculate the nearest full viewport position above the current scroll position
        const nextPosition = Math.ceil((window.scrollY - viewportHeight) / viewportHeight) * viewportHeight;
        // Scroll to the calculated position
        window.scrollTo({
            top: nextPosition,
            behavior: 'smooth'
        });
    };


}