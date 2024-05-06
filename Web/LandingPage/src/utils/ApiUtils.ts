
import { TokenUtils } from "./TokenUtils";
import { CircleUp } from "../apis/Cnt.CircleUp.SDK";
import { CyberCache } from "../apis/Cnt.CyberCache.SDK";
import { GateKeeper } from "../apis/Cnt.GateKeeper.SDK";
import { Cobalt } from "../apis/Cnt.Cobalt.SDK";

export class ApiUtils{
    public static EmptyId : string = "00000000-0000-0000-0000-000000000000";

    public static GetCircleUpApi(): CircleUp.ClientAPI{
        return new CircleUp.ClientAPI(TokenUtils.Get(), "https://6vsu9886ze.execute-api.us-east-2.amazonaws.com/Prod/api/");
        //return new CircleUp.ClientAPI(TokenUtils.Get(), "https://localhost:7299/api/");
    }

    public static GetCyberCacheApi() : CyberCache.ClientAPI{
        return new CyberCache.ClientAPI(TokenUtils.Get());
    }

    public static GetGateKeeperApi() : GateKeeper.ClientAPI{
        return new GateKeeper.ClientAPI(TokenUtils.Get());
    }

    public static GetCobaltApi() : Cobalt.ClientAPI{
        return new Cobalt.ClientAPI(TokenUtils.Get(), "https://puxap069ie.execute-api.us-east-2.amazonaws.com/Prod/api/");
    }
}