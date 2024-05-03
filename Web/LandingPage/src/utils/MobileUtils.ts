export class MobileUtils {
    public static CheckIsMobile(): boolean {
        const userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const screenSize = window.innerWidth <= 768;
        const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0
            || (navigator.maxTouchPoints > 0);

        return userAgent || screenSize || touchSupport;
    }
    public static EnableTouchAction = (isEnabled: boolean) => {
        document.body.style.touchAction = isEnabled ? "auto" : "none";
        document.body.style.userSelect = isEnabled ? "auto" : "none";
        document.body.style.pointerEvents = (!isEnabled ? "auto" : "none");
    }
    public static ResetTouchAction = () => {
        document.body.style.touchAction = "auto";
        document.body.style.userSelect = "auto";
        document.body.style.pointerEvents = "auto";
    }
}