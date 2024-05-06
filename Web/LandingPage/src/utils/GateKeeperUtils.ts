import { GateKeeper } from "../apis/Cnt.GateKeeper.SDK";
import { ApiUtils } from "./ApiUtils";

export class GateKeeperUtils{
    public static Register = () => {
        GateKeeperUtils.RedirectToGateKeeper(ApiUtils.GetGateKeeperApi(), "Register");
    }

    public static Login = () => {
        GateKeeperUtils.RedirectToGateKeeper(ApiUtils.GetGateKeeperApi(), "Login");
    }

    public static RedirectToGateKeeper = (api: GateKeeper.ClientAPI, functionName: string) => {

        let basePath = window.location.pathname;
        // Check if the pathname is root ('/') and adjust accordingly
        if (basePath === '/') {
            basePath = '/index.html';
        }
        
        const currentBaseUrl = `${window.location.protocol}//${window.location.host}${basePath}`;

        const url: string = GateKeeperUtils.GenerateGateKeeperUrl(
            api,
            functionName,
            currentBaseUrl,
            "https://cobalt-mvc-develop.s3.us-east-2.amazonaws.com/wwwroot/images/banners/lgbtq%2B-friendly.webp",
            "#212529",
            "#343a40",
            "https://cobalt-mvc-develop.s3.us-east-2.amazonaws.com/wwwroot/images/icons/adaptive-icon-dark.png",
            "Bridging Realities in the Cross-Platform Metaverse.",
            "Uniting Users Across Social Media Platforms for a Shared Virtual Experience.",
            "Cobalt Metaverse"
        );
        window.location.href = url;
    }
    public static GenerateGateKeeperUrl(api: GateKeeper.ClientAPI, functionName: string, returnUrl: string, gateKeeperBackgroundImage: string, gateKeeperBackgroundColor: string, gateKeeperFormColor: string, gateKeeperLogo: string, gateKeeperSubDescription: string, gateKeeperDescription: string, gateKeeperTitle: string) {
        const baseUrl = api.BaseLoginUrl + "Account/" + functionName;
        const returnUrlParam = "ReturnUrl=" + encodeURIComponent(returnUrl);
        const gateKeeperBackgroundImageParam = "GateKeeperBackgroundImage=" + encodeURIComponent(gateKeeperBackgroundImage);
        const gateKeeperBackgroundColorParam = "GateKeeperBackgroundColor=" + encodeURIComponent(gateKeeperBackgroundColor);
        const gateKeeperFormColorParam = "GateKeeperFormColor=" + encodeURIComponent(gateKeeperFormColor);
        const gateKeeperLogoParam = "GateKeeperLogo=" + encodeURIComponent(gateKeeperLogo);
        const gateKeeperSubDescriptionParam = "GateKeeperSubDescription=" + encodeURIComponent(gateKeeperSubDescription);
        const gateKeeperDescriptionParam = "GateKeeperDescription=" + encodeURIComponent(gateKeeperDescription);
        const gateKeeperTitleParam = "GateKeeperTitle=" + encodeURIComponent(gateKeeperTitle);

        const queryParams = [returnUrlParam, gateKeeperBackgroundImageParam, gateKeeperBackgroundColorParam, gateKeeperFormColorParam, gateKeeperLogoParam, gateKeeperSubDescriptionParam, gateKeeperDescriptionParam, gateKeeperTitleParam];

        const fullUrl = baseUrl + "?" + queryParams.join("&");

        return fullUrl;
    }
}