export namespace GateKeeper { 
    //                        _               _____                           _           _            
    //             /\        | |             / ____|                         | |         | |           
    //            /  \  _   _| |_ ___ ______| |  __  ___ _ __   ___ _ __ __ _| |_ ___  __| |           
    //           / /\ \| | | | __/ _ \______| | |_ |/ _ \ '_ \ / _ \ '__/ _` | __/ _ \/ _` |           
    //          / ____ \ |_| | || (_) |     | |__| |  __/ | | |  __/ | | (_| | ||  __/ (_| |           
    //         /_/    \_\__,_|\__\___/       \_____|\___|_| |_|\___|_|  \__,_|\__\___|\__,_|           
    //  _   _   _____   ____    _   _  ____ _______   __  __  ____  _____ _____ ________     __  _   _ 
    // | | | | |  __ \ / __ \  | \ | |/ __ \__   __| |  \/  |/ __ \|  __ \_   _|  ____\ \   / / | | | |
    // | | | | | |  | | |  | | |  \| | |  | | | |    | \  / | |  | | |  | || | | |__   \ \_/ /  | | | |
    // | | | | | |  | | |  | | | . ` | |  | | | |    | |\/| | |  | | |  | || | |  __|   \   /   | | | |
    // |_| |_| | |__| | |__| | | |\  | |__| | | |    | |  | | |__| | |__| || |_| |       | |    |_| |_|
    // (_) (_) |_____/ \____/  |_| \_|\____/  |_|    |_|  |_|\____/|_____/_____|_|       |_|    (_) (_)                                                                                     
    
    
    
    export class ClientAPI {
        public BaseMVCUrl: string = 'https://zkmkb3axja.execute-api.us-east-2.amazonaws.com/Prod/api/';
        public BaseLoginUrl: string = 'https://azyb2nde53.execute-api.us-east-2.amazonaws.com/Prod/';
        public AccessToken: string;
        public Account: AccountController;
        public Home: HomeController;
        public Token: TokenController;
        public User: UserController;
    
    
        constructor(accessToken: string = undefined, baseUrl: string = undefined) {
            if(baseUrl != undefined){
                this.BaseMVCUrl = baseUrl;
            }
            this.AccessToken = accessToken;
            this.Account = new AccountController(this);
            this.Home = new HomeController(this);
            this.Token = new TokenController(this);
            this.User = new UserController(this);
    
        }
                
        async ExecuteGetRequestAsync<T>(controllerName: string,
            methodName: string, onSuccess: OnSuccessDelegate<Response<T>>, onFailed: OnFailedDelegate,
            element: HTMLElement = undefined, template: string = undefined) {
            var loadingClass = this.InvokeLoading(element, template);
    
            try {
                const response = await fetch(this.BaseMVCUrl + controllerName + '/' + methodName, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${this.AccessToken}`
                    },
                });
                await this.HandleRequest<Response<T>>(response, onSuccess, onFailed, loadingClass);
            } catch (error) {
                onFailed(error);
            }
        }
    
        async ExecutePostRequestAsync<T, W>(controllerName: string,
            methodName: string, dataDTO: W, onSuccess: OnSuccessDelegate<Response<T>>, onFailed: OnFailedDelegate,
            element: HTMLElement = undefined, template: string = undefined) {
            var loadingClass = this.InvokeLoading(element, template);
    
            try {
                const response = await fetch(this.BaseMVCUrl + controllerName + '/' + methodName, {
                    method: 'POST',
                    body: JSON.stringify(dataDTO),
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Authorization': `Bearer ${this.AccessToken}`
                    },
                });
        
                await this.HandleRequest<Response<T>>(response, onSuccess, onFailed, loadingClass);
            } catch (error) {
                onFailed(error);
            }
        }
    
        async HandleRequest<T>(response: any, onSuccess: OnSuccessDelegate<T>, 
            onFailed: OnFailedDelegate, loadingClass: Loading = null) {
            try {
                if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`);
                }
    
                var rawJson = await response.json();
                const result = (rawJson) as T;
                if (loadingClass != null) {
                    loadingClass.Stop();
                }
                onSuccess(result);
            } catch (error) {
                if (loadingClass != null) {
                    loadingClass.Stop();
                }
                if (error instanceof Error) {
                    onFailed(new Exception(error.message, "",
                        HttpStatusCode.InternalServerError));
                } else {
                    onFailed(new Exception("An unexpected error occurred", "",
                        HttpStatusCode.InternalServerError));
                }
            }
        }
    
        private InvokeLoading(element: HTMLElement, template: string): Loading {
            var loadingClass = null;
            if (element != undefined) {
                loadingClass = new Loading(element, template);
            }
    
            return loadingClass;
        }
    }
    //                        _               _____                           _           _            
    //             /\        | |             / ____|                         | |         | |           
    //            /  \  _   _| |_ ___ ______| |  __  ___ _ __   ___ _ __ __ _| |_ ___  __| |           
    //           / /\ \| | | | __/ _ \______| | |_ |/ _ \ '_ \ / _ \ '__/ _` | __/ _ \/ _` |           
    //          / ____ \ |_| | || (_) |     | |__| |  __/ | | |  __/ | | (_| | ||  __/ (_| |           
    //         /_/    \_\__,_|\__\___/       \_____|\___|_| |_|\___|_|  \__,_|\__\___|\__,_|           
    //  _   _   _____   ____    _   _  ____ _______   __  __  ____  _____ _____ ________     __  _   _ 
    // | | | | |  __ \ / __ \  | \ | |/ __ \__   __| |  \/  |/ __ \|  __ \_   _|  ____\ \   / / | | | |
    // | | | | | |  | | |  | | |  \| | |  | | | |    | \  / | |  | | |  | || | | |__   \ \_/ /  | | | |
    // | | | | | |  | | |  | | | . ` | |  | | | |    | |\/| | |  | | |  | || | |  __|   \   /   | | | |
    // |_| |_| | |__| | |__| | | |\  | |__| | | |    | |  | | |__| | |__| || |_| |       | |    |_| |_|
    // (_) (_) |_____/ \____/  |_| \_|\____/  |_|    |_|  |_|\____/|_____/_____|_|       |_|    (_) (_)                                                                                     
    
    
    
    export class AccountController {
    
        public Api: ClientAPI;
    
        constructor(clientAPI: ClientAPI) {
            this.Api = clientAPI;
        }
    
        Login(loginDTO: LoginDTO, 
            onSuccess: OnSuccessDelegate<AccessTokenDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecutePostRequestAsync<AccessTokenDTO, LoginDTO>(
                "Account", "Login", loginDTO,  (response: Response<AccessTokenDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        RetrieveAccessToken(model: LoginDTO, 
            onSuccess: OnSuccessDelegate<AccessTokenDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecutePostRequestAsync<AccessTokenDTO, LoginDTO>(
                "Account", "RetrieveAccessToken", model,  (response: Response<AccessTokenDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
    }
    //                        _               _____                           _           _            
    //             /\        | |             / ____|                         | |         | |           
    //            /  \  _   _| |_ ___ ______| |  __  ___ _ __   ___ _ __ __ _| |_ ___  __| |           
    //           / /\ \| | | | __/ _ \______| | |_ |/ _ \ '_ \ / _ \ '__/ _` | __/ _ \/ _` |           
    //          / ____ \ |_| | || (_) |     | |__| |  __/ | | |  __/ | | (_| | ||  __/ (_| |           
    //         /_/    \_\__,_|\__\___/       \_____|\___|_| |_|\___|_|  \__,_|\__\___|\__,_|           
    //  _   _   _____   ____    _   _  ____ _______   __  __  ____  _____ _____ ________     __  _   _ 
    // | | | | |  __ \ / __ \  | \ | |/ __ \__   __| |  \/  |/ __ \|  __ \_   _|  ____\ \   / / | | | |
    // | | | | | |  | | |  | | |  \| | |  | | | |    | \  / | |  | | |  | || | | |__   \ \_/ /  | | | |
    // | | | | | |  | | |  | | | . ` | |  | | | |    | |\/| | |  | | |  | || | |  __|   \   /   | | | |
    // |_| |_| | |__| | |__| | | |\  | |__| | | |    | |  | | |__| | |__| || |_| |       | |    |_| |_|
    // (_) (_) |_____/ \____/  |_| \_|\____/  |_|    |_|  |_|\____/|_____/_____|_|       |_|    (_) (_)                                                                                     
    
    
    
    
    export class HomeController {
    
        public Api: ClientAPI;
    
        constructor(clientAPI: ClientAPI) {
            this.Api = clientAPI;
        }
    
    }
    //                        _               _____                           _           _            
    //             /\        | |             / ____|                         | |         | |           
    //            /  \  _   _| |_ ___ ______| |  __  ___ _ __   ___ _ __ __ _| |_ ___  __| |           
    //           / /\ \| | | | __/ _ \______| | |_ |/ _ \ '_ \ / _ \ '__/ _` | __/ _ \/ _` |           
    //          / ____ \ |_| | || (_) |     | |__| |  __/ | | |  __/ | | (_| | ||  __/ (_| |           
    //         /_/    \_\__,_|\__\___/       \_____|\___|_| |_|\___|_|  \__,_|\__\___|\__,_|           
    //  _   _   _____   ____    _   _  ____ _______   __  __  ____  _____ _____ ________     __  _   _ 
    // | | | | |  __ \ / __ \  | \ | |/ __ \__   __| |  \/  |/ __ \|  __ \_   _|  ____\ \   / / | | | |
    // | | | | | |  | | |  | | |  \| | |  | | | |    | \  / | |  | | |  | || | | |__   \ \_/ /  | | | |
    // | | | | | |  | | |  | | | . ` | |  | | | |    | |\/| | |  | | |  | || | |  __|   \   /   | | | |
    // |_| |_| | |__| | |__| | | |\  | |__| | | |    | |  | | |__| | |__| || |_| |       | |    |_| |_|
    // (_) (_) |_____/ \____/  |_| \_|\____/  |_|    |_|  |_|\____/|_____/_____|_|       |_|    (_) (_)                                                                                     
    
    
    
    export class TokenController {
    
        public Api: ClientAPI;
    
        constructor(clientAPI: ClientAPI) {
            this.Api = clientAPI;
        }
    
        Validate(accessToken: AccessTokenDTO, 
            onSuccess: OnSuccessDelegate<AccessTokenDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecutePostRequestAsync<AccessTokenDTO, AccessTokenDTO>(
                "Token", "Validate", accessToken,  (response: Response<AccessTokenDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        Refresh(
            onSuccess: OnSuccessDelegate<AccessTokenDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<AccessTokenDTO>(
                "Token", "Refresh", (response: Response<AccessTokenDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
    }
    //                        _               _____                           _           _            
    //             /\        | |             / ____|                         | |         | |           
    //            /  \  _   _| |_ ___ ______| |  __  ___ _ __   ___ _ __ __ _| |_ ___  __| |           
    //           / /\ \| | | | __/ _ \______| | |_ |/ _ \ '_ \ / _ \ '__/ _` | __/ _ \/ _` |           
    //          / ____ \ |_| | || (_) |     | |__| |  __/ | | |  __/ | | (_| | ||  __/ (_| |           
    //         /_/    \_\__,_|\__\___/       \_____|\___|_| |_|\___|_|  \__,_|\__\___|\__,_|           
    //  _   _   _____   ____    _   _  ____ _______   __  __  ____  _____ _____ ________     __  _   _ 
    // | | | | |  __ \ / __ \  | \ | |/ __ \__   __| |  \/  |/ __ \|  __ \_   _|  ____\ \   / / | | | |
    // | | | | | |  | | |  | | |  \| | |  | | | |    | \  / | |  | | |  | || | | |__   \ \_/ /  | | | |
    // | | | | | |  | | |  | | | . ` | |  | | | |    | |\/| | |  | | |  | || | |  __|   \   /   | | | |
    // |_| |_| | |__| | |__| | | |\  | |__| | | |    | |  | | |__| | |__| || |_| |       | |    |_| |_|
    // (_) (_) |_____/ \____/  |_| \_|\____/  |_|    |_|  |_|\____/|_____/_____|_|       |_|    (_) (_)                                                                                     
    
    
    
    export class UserController {
    
        public Api: ClientAPI;
    
        constructor(clientAPI: ClientAPI) {
            this.Api = clientAPI;
        }
    
        ReadByIdentityId(requestUser: UserDTO, 
            onSuccess: OnSuccessDelegate<UserDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecutePostRequestAsync<UserDTO, UserDTO>(
                "User", "ReadByIdentityId", requestUser,  (response: Response<UserDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        ReadByEmail(user: UserDTO, 
            onSuccess: OnSuccessDelegate<UserDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecutePostRequestAsync<UserDTO, UserDTO>(
                "User", "ReadByEmail", user,  (response: Response<UserDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        ReadByUsername(user: UserDTO, 
            onSuccess: OnSuccessDelegate<UserDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecutePostRequestAsync<UserDTO, UserDTO>(
                "User", "ReadByUsername", user,  (response: Response<UserDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        Login(login: LoginDTO, 
            onSuccess: OnSuccessDelegate<AccessTokenDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecutePostRequestAsync<AccessTokenDTO, LoginDTO>(
                "User", "Login", login,  (response: Response<AccessTokenDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        CreateToken(bodyUserDTO: UserDTO, 
            onSuccess: OnSuccessDelegate<AccessTokenDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecutePostRequestAsync<AccessTokenDTO, UserDTO>(
                "User", "CreateToken", bodyUserDTO,  (response: Response<AccessTokenDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        SubmitLogin(model: FormResponseDTO, 
            onSuccess: OnSuccessDelegate<FormResponseDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecutePostRequestAsync<FormResponseDTO, FormResponseDTO>(
                "User", "SubmitLogin", model,  (response: Response<FormResponseDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        ReadById(userId: string, 
            onSuccess: OnSuccessDelegate<UserDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<UserDTO>(
                "User", "ReadById" + "/" + userId, (response: Response<UserDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        ReadMe(
            onSuccess: OnSuccessDelegate<UserDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<UserDTO>(
                "User", "ReadMe", (response: Response<UserDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        Search(name: string, 
            onSuccess: OnSuccessDelegate<UserDTO[]>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<UserDTO[]>(
                "User", "Search" + "/" + name, (response: Response<UserDTO[]>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        ReadCount(
            onSuccess: OnSuccessDelegate<number>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<number>(
                "User", "ReadCount", (response: Response<number>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
    }
    //                        _               _____                           _           _            
    //             /\        | |             / ____|                         | |         | |           
    //            /  \  _   _| |_ ___ ______| |  __  ___ _ __   ___ _ __ __ _| |_ ___  __| |           
    //           / /\ \| | | | __/ _ \______| | |_ |/ _ \ '_ \ / _ \ '__/ _` | __/ _ \/ _` |           
    //          / ____ \ |_| | || (_) |     | |__| |  __/ | | |  __/ | | (_| | ||  __/ (_| |           
    //         /_/    \_\__,_|\__\___/       \_____|\___|_| |_|\___|_|  \__,_|\__\___|\__,_|           
    //  _   _   _____   ____    _   _  ____ _______   __  __  ____  _____ _____ ________     __  _   _ 
    // | | | | |  __ \ / __ \  | \ | |/ __ \__   __| |  \/  |/ __ \|  __ \_   _|  ____\ \   / / | | | |
    // | | | | | |  | | |  | | |  \| | |  | | | |    | \  / | |  | | |  | || | | |__   \ \_/ /  | | | |
    // | | | | | |  | | |  | | | . ` | |  | | | |    | |\/| | |  | | |  | || | |  __|   \   /   | | | |
    // |_| |_| | |__| | |__| | | |\  | |__| | | |    | |  | | |__| | |__| || |_| |       | |    |_| |_|
    // (_) (_) |_____/ \____/  |_| \_|\____/  |_|    |_|  |_|\____/|_____/_____|_|       |_|    (_) (_)                                                                                     
    
    
    export enum EnvironmentType {
        localhost = 0,
        develop = 1,
        testing = 2,
        releasecandidate = 3,
        release = 4,
    
    }
    //                        _               _____                           _           _            
    //             /\        | |             / ____|                         | |         | |           
    //            /  \  _   _| |_ ___ ______| |  __  ___ _ __   ___ _ __ __ _| |_ ___  __| |           
    //           / /\ \| | | | __/ _ \______| | |_ |/ _ \ '_ \ / _ \ '__/ _` | __/ _ \/ _` |           
    //          / ____ \ |_| | || (_) |     | |__| |  __/ | | |  __/ | | (_| | ||  __/ (_| |           
    //         /_/    \_\__,_|\__\___/       \_____|\___|_| |_|\___|_|  \__,_|\__\___|\__,_|           
    //  _   _   _____   ____    _   _  ____ _______   __  __  ____  _____ _____ ________     __  _   _ 
    // | | | | |  __ \ / __ \  | \ | |/ __ \__   __| |  \/  |/ __ \|  __ \_   _|  ____\ \   / / | | | |
    // | | | | | |  | | |  | | |  \| | |  | | | |    | \  / | |  | | |  | || | | |__   \ \_/ /  | | | |
    // | | | | | |  | | |  | | | . ` | |  | | | |    | |\/| | |  | | |  | || | |  __|   \   /   | | | |
    // |_| |_| | |__| | |__| | | |\  | |__| | | |    | |  | | |__| | |__| || |_| |       | |    |_| |_|
    // (_) (_) |_____/ \____/  |_| \_|\____/  |_|    |_|  |_|\____/|_____/_____|_|       |_|    (_) (_)                                                                                     
    
    
    export enum ErrorType {
        None = 0,
        InternalError = 1,
        InvalidAccessToken = 2,
    
    }
    
    export enum HttpStatusCode {
        Continue = 100,
        SwitchingProtocols = 101,
        OK = 200,
        Created = 201,
        Accepted = 202,
        NonAuthoritativeInformation = 203,
        NoContent = 204,
        ResetContent = 205,
        PartialContent = 206,
        Ambiguous = 300,
        MultipleChoices = 300,
        Moved = 301,
        MovedPermanently = 301,
        Found = 302,
        Redirect = 302,
        RedirectMethod = 303,
        SeeOther = 303,
        NotModified = 304,
        UseProxy = 305,
        Unused = 306,
        RedirectKeepVerb = 307,
        TemporaryRedirect = 307,
        BadRequest = 400,
        Unauthorized = 401,
        PaymentRequired = 402,
        Forbidden = 403,
        NotFound = 404,
        MethodNotAllowed = 405,
        NotAcceptable = 406,
        ProxyAuthenticationRequired = 407,
        RequestTimeout = 408,
        Conflict = 409,
        Gone = 410,
        LengthRequired = 411,
        PreconditionFailed = 412,
        RequestEntityTooLarge = 413,
        RequestUriTooLong = 414,
        UnsupportedMediaType = 415,
        RequestedRangeNotSatisfiable = 416,
        ExpectationFailed = 417,
        UpgradeRequired = 426,
        InternalServerError = 500,
        NotImplemented = 501,
        BadGateway = 502,
        ServiceUnavailable = 503,
        GatewayTimeout = 504,
        HttpVersionNotSupported = 505
    }
    //                        _               _____                           _           _            
    //             /\        | |             / ____|                         | |         | |           
    //            /  \  _   _| |_ ___ ______| |  __  ___ _ __   ___ _ __ __ _| |_ ___  __| |           
    //           / /\ \| | | | __/ _ \______| | |_ |/ _ \ '_ \ / _ \ '__/ _` | __/ _ \/ _` |           
    //          / ____ \ |_| | || (_) |     | |__| |  __/ | | |  __/ | | (_| | ||  __/ (_| |           
    //         /_/    \_\__,_|\__\___/       \_____|\___|_| |_|\___|_|  \__,_|\__\___|\__,_|           
    //  _   _   _____   ____    _   _  ____ _______   __  __  ____  _____ _____ ________     __  _   _ 
    // | | | | |  __ \ / __ \  | \ | |/ __ \__   __| |  \/  |/ __ \|  __ \_   _|  ____\ \   / / | | | |
    // | | | | | |  | | |  | | |  \| | |  | | | |    | \  / | |  | | |  | || | | |__   \ \_/ /  | | | |
    // | | | | | |  | | |  | | | . ` | |  | | | |    | |\/| | |  | | |  | || | |  __|   \   /   | | | |
    // |_| |_| | |__| | |__| | | |\  | |__| | | |    | |  | | |__| | |__| || |_| |       | |    |_| |_|
    // (_) (_) |_____/ \____/  |_| \_|\____/  |_|    |_|  |_|\____/|_____/_____|_|       |_|    (_) (_)                                                                                     
    
    
    export enum LoadType {
        Live = 0,
        Dead = 1,
    
    }
    //                        _               _____                           _           _            
    //             /\        | |             / ____|                         | |         | |           
    //            /  \  _   _| |_ ___ ______| |  __  ___ _ __   ___ _ __ __ _| |_ ___  __| |           
    //           / /\ \| | | | __/ _ \______| | |_ |/ _ \ '_ \ / _ \ '__/ _` | __/ _ \/ _` |           
    //          / ____ \ |_| | || (_) |     | |__| |  __/ | | |  __/ | | (_| | ||  __/ (_| |           
    //         /_/    \_\__,_|\__\___/       \_____|\___|_| |_|\___|_|  \__,_|\__\___|\__,_|           
    //  _   _   _____   ____    _   _  ____ _______   __  __  ____  _____ _____ ________     __  _   _ 
    // | | | | |  __ \ / __ \  | \ | |/ __ \__   __| |  \/  |/ __ \|  __ \_   _|  ____\ \   / / | | | |
    // | | | | | |  | | |  | | |  \| | |  | | | |    | \  / | |  | | |  | || | | |__   \ \_/ /  | | | |
    // | | | | | |  | | |  | | | . ` | |  | | | |    | |\/| | |  | | |  | || | |  __|   \   /   | | | |
    // |_| |_| | |__| | |__| | | |\  | |__| | | |    | |  | | |__| | |__| || |_| |       | |    |_| |_|
    // (_) (_) |_____/ \____/  |_| \_|\____/  |_|    |_|  |_|\____/|_____/_____|_|       |_|    (_) (_)                                                                                     
    
    
    export enum UserStatusType {
        None = 0,
        Active = 1,
        Pending = 2,
    
    }
    //                        _               _____                           _           _            
    //             /\        | |             / ____|                         | |         | |           
    //            /  \  _   _| |_ ___ ______| |  __  ___ _ __   ___ _ __ __ _| |_ ___  __| |           
    //           / /\ \| | | | __/ _ \______| | |_ |/ _ \ '_ \ / _ \ '__/ _` | __/ _ \/ _` |           
    //          / ____ \ |_| | || (_) |     | |__| |  __/ | | |  __/ | | (_| | ||  __/ (_| |           
    //         /_/    \_\__,_|\__\___/       \_____|\___|_| |_|\___|_|  \__,_|\__\___|\__,_|           
    //  _   _   _____   ____    _   _  ____ _______   __  __  ____  _____ _____ ________     __  _   _ 
    // | | | | |  __ \ / __ \  | \ | |/ __ \__   __| |  \/  |/ __ \|  __ \_   _|  ____\ \   / / | | | |
    // | | | | | |  | | |  | | |  \| | |  | | | |    | \  / | |  | | |  | || | | |__   \ \_/ /  | | | |
    // | | | | | |  | | |  | | | . ` | |  | | | |    | |\/| | |  | | |  | || | |  __|   \   /   | | | |
    // |_| |_| | |__| | |__| | | |\  | |__| | | |    | |  | | |__| | |__| || |_| |       | |    |_| |_|
    // (_) (_) |_____/ \____/  |_| \_|\____/  |_|    |_|  |_|\____/|_____/_____|_|       |_|    (_) (_)                                                                                     
    
    
    
    export class AccessTokenDTO {
        public Id: string;
        public Token: string;
        public IsValid: boolean;
    
        constructor(databaseId: string, token: string, isValid: boolean)
        {
            this.Id = databaseId;
            this.Token = token
            this.IsValid = isValid
    
        }
    }
    export class BaseDTO {
        public Id: string;
    
        constructor(id: string) {
            this.Id = id;
        }
    }
    //                        _               _____                           _           _            
    //             /\        | |             / ____|                         | |         | |           
    //            /  \  _   _| |_ ___ ______| |  __  ___ _ __   ___ _ __ __ _| |_ ___  __| |           
    //           / /\ \| | | | __/ _ \______| | |_ |/ _ \ '_ \ / _ \ '__/ _` | __/ _ \/ _` |           
    //          / ____ \ |_| | || (_) |     | |__| |  __/ | | |  __/ | | (_| | ||  __/ (_| |           
    //         /_/    \_\__,_|\__\___/       \_____|\___|_| |_|\___|_|  \__,_|\__\___|\__,_|           
    //  _   _   _____   ____    _   _  ____ _______   __  __  ____  _____ _____ ________     __  _   _ 
    // | | | | |  __ \ / __ \  | \ | |/ __ \__   __| |  \/  |/ __ \|  __ \_   _|  ____\ \   / / | | | |
    // | | | | | |  | | |  | | |  \| | |  | | | |    | \  / | |  | | |  | || | | |__   \ \_/ /  | | | |
    // | | | | | |  | | |  | | | . ` | |  | | | |    | |\/| | |  | | |  | || | |  __|   \   /   | | | |
    // |_| |_| | |__| | |__| | | |\  | |__| | | |    | |  | | |__| | |__| || |_| |       | |    |_| |_|
    // (_) (_) |_____/ \____/  |_| \_|\____/  |_|    |_|  |_|\____/|_____/_____|_|       |_|    (_) (_)                                                                                     
    
    
    
    export class EFMigrationsHistoryDTO {
        public Id: string;
        public MigrationId: string;
        public ProductVersion: string;
    
        constructor(databaseId: string, migrationId: string, productVersion: string)
        {
            this.Id = databaseId;
            this.MigrationId = migrationId
            this.ProductVersion = productVersion
    
        }
    }
    //                        _               _____                           _           _            
    //             /\        | |             / ____|                         | |         | |           
    //            /  \  _   _| |_ ___ ______| |  __  ___ _ __   ___ _ __ __ _| |_ ___  __| |           
    //           / /\ \| | | | __/ _ \______| | |_ |/ _ \ '_ \ / _ \ '__/ _` | __/ _ \/ _` |           
    //          / ____ \ |_| | || (_) |     | |__| |  __/ | | |  __/ | | (_| | ||  __/ (_| |           
    //         /_/    \_\__,_|\__\___/       \_____|\___|_| |_|\___|_|  \__,_|\__\___|\__,_|           
    //  _   _   _____   ____    _   _  ____ _______   __  __  ____  _____ _____ ________     __  _   _ 
    // | | | | |  __ \ / __ \  | \ | |/ __ \__   __| |  \/  |/ __ \|  __ \_   _|  ____\ \   / / | | | |
    // | | | | | |  | | |  | | |  \| | |  | | | |    | \  / | |  | | |  | || | | |__   \ \_/ /  | | | |
    // | | | | | |  | | |  | | | . ` | |  | | | |    | |\/| | |  | | |  | || | |  __|   \   /   | | | |
    // |_| |_| | |__| | |__| | | |\  | |__| | | |    | |  | | |__| | |__| || |_| |       | |    |_| |_|
    // (_) (_) |_____/ \____/  |_| \_|\____/  |_|    |_|  |_|\____/|_____/_____|_|       |_|    (_) (_)                                                                                     
    
    
    
    export class ExceptionDTO {
        public Id: string;
        public LogId: string;
        public ExceptionType: string;
        public Message: string;
        public StackTrace: string;
        public Properties: string;
    
        constructor(databaseId: string, logId: string, exceptionType: string, message: string, stackTrace: string, properties: string)
        {
            this.Id = databaseId;
            this.LogId = logId
            this.ExceptionType = exceptionType
            this.Message = message
            this.StackTrace = stackTrace
            this.Properties = properties
    
        }
    }
    //                        _               _____                           _           _            
    //             /\        | |             / ____|                         | |         | |           
    //            /  \  _   _| |_ ___ ______| |  __  ___ _ __   ___ _ __ __ _| |_ ___  __| |           
    //           / /\ \| | | | __/ _ \______| | |_ |/ _ \ '_ \ / _ \ '__/ _` | __/ _ \/ _` |           
    //          / ____ \ |_| | || (_) |     | |__| |  __/ | | |  __/ | | (_| | ||  __/ (_| |           
    //         /_/    \_\__,_|\__\___/       \_____|\___|_| |_|\___|_|  \__,_|\__\___|\__,_|           
    //  _   _   _____   ____    _   _  ____ _______   __  __  ____  _____ _____ ________     __  _   _ 
    // | | | | |  __ \ / __ \  | \ | |/ __ \__   __| |  \/  |/ __ \|  __ \_   _|  ____\ \   / / | | | |
    // | | | | | |  | | |  | | |  \| | |  | | | |    | \  / | |  | | |  | || | | |__   \ \_/ /  | | | |
    // | | | | | |  | | |  | | | . ` | |  | | | |    | |\/| | |  | | |  | || | |  __|   \   /   | | | |
    // |_| |_| | |__| | |__| | | |\  | |__| | | |    | |  | | |__| | |__| || |_| |       | |    |_| |_|
    // (_) (_) |_____/ \____/  |_| \_|\____/  |_|    |_|  |_|\____/|_____/_____|_|       |_|    (_) (_)                                                                                     
    
    
    
    export class FormElementDTO {
        public Id: string;
        public ElementId: string;
        public Value: string;
        public Response: string;
        public IsError: boolean;
    
        constructor(databaseId: string, elementId: string, value: string, response: string, isError: boolean)
        {
            this.Id = databaseId;
            this.ElementId = elementId
            this.Value = value
            this.Response = response
            this.IsError = isError
    
        }
    }
    //                        _               _____                           _           _            
    //             /\        | |             / ____|                         | |         | |           
    //            /  \  _   _| |_ ___ ______| |  __  ___ _ __   ___ _ __ __ _| |_ ___  __| |           
    //           / /\ \| | | | __/ _ \______| | |_ |/ _ \ '_ \ / _ \ '__/ _` | __/ _ \/ _` |           
    //          / ____ \ |_| | || (_) |     | |__| |  __/ | | |  __/ | | (_| | ||  __/ (_| |           
    //         /_/    \_\__,_|\__\___/       \_____|\___|_| |_|\___|_|  \__,_|\__\___|\__,_|           
    //  _   _   _____   ____    _   _  ____ _______   __  __  ____  _____ _____ ________     __  _   _ 
    // | | | | |  __ \ / __ \  | \ | |/ __ \__   __| |  \/  |/ __ \|  __ \_   _|  ____\ \   / / | | | |
    // | | | | | |  | | |  | | |  \| | |  | | | |    | \  / | |  | | |  | || | | |__   \ \_/ /  | | | |
    // | | | | | |  | | |  | | | . ` | |  | | | |    | |\/| | |  | | |  | || | |  __|   \   /   | | | |
    // |_| |_| | |__| | |__| | | |\  | |__| | | |    | |  | | |__| | |__| || |_| |       | |    |_| |_|
    // (_) (_) |_____/ \____/  |_| \_|\____/  |_|    |_|  |_|\____/|_____/_____|_|       |_|    (_) (_)                                                                                     
    
    
    export class FormResponseDTO {
        public Id: string;
        public RedirectUrl: string;
        public Elements: FormElementDTO[];
        public Message: string;
        public IsError: boolean;
    
        constructor(databaseId: string, redirectUrl: string, elements: FormElementDTO[], message: string, isError: boolean)
        {
            this.Id = databaseId;
            this.RedirectUrl = redirectUrl
            this.Elements = elements
            this.Message = message
            this.IsError = isError
    
        }
    }
    //                        _               _____                           _           _            
    //             /\        | |             / ____|                         | |         | |           
    //            /  \  _   _| |_ ___ ______| |  __  ___ _ __   ___ _ __ __ _| |_ ___  __| |           
    //           / /\ \| | | | __/ _ \______| | |_ |/ _ \ '_ \ / _ \ '__/ _` | __/ _ \/ _` |           
    //          / ____ \ |_| | || (_) |     | |__| |  __/ | | |  __/ | | (_| | ||  __/ (_| |           
    //         /_/    \_\__,_|\__\___/       \_____|\___|_| |_|\___|_|  \__,_|\__\___|\__,_|           
    //  _   _   _____   ____    _   _  ____ _______   __  __  ____  _____ _____ ________     __  _   _ 
    // | | | | |  __ \ / __ \  | \ | |/ __ \__   __| |  \/  |/ __ \|  __ \_   _|  ____\ \   / / | | | |
    // | | | | | |  | | |  | | |  \| | |  | | | |    | \  / | |  | | |  | || | | |__   \ \_/ /  | | | |
    // | | | | | |  | | |  | | | . ` | |  | | | |    | |\/| | |  | | |  | || | |  __|   \   /   | | | |
    // |_| |_| | |__| | |__| | | |\  | |__| | | |    | |  | | |__| | |__| || |_| |       | |    |_| |_|
    // (_) (_) |_____/ \____/  |_| \_|\____/  |_|    |_|  |_|\____/|_____/_____|_|       |_|    (_) (_)                                                                                     
    
    
    
    export class JsonConverterDTO {
        public Id: string;
    
        constructor(databaseId: string)
        {
            this.Id = databaseId;
    
        }
    }
    //                        _               _____                           _           _            
    //             /\        | |             / ____|                         | |         | |           
    //            /  \  _   _| |_ ___ ______| |  __  ___ _ __   ___ _ __ __ _| |_ ___  __| |           
    //           / /\ \| | | | __/ _ \______| | |_ |/ _ \ '_ \ / _ \ '__/ _` | __/ _ \/ _` |           
    //          / ____ \ |_| | || (_) |     | |__| |  __/ | | |  __/ | | (_| | ||  __/ (_| |           
    //         /_/    \_\__,_|\__\___/       \_____|\___|_| |_|\___|_|  \__,_|\__\___|\__,_|           
    //  _   _   _____   ____    _   _  ____ _______   __  __  ____  _____ _____ ________     __  _   _ 
    // | | | | |  __ \ / __ \  | \ | |/ __ \__   __| |  \/  |/ __ \|  __ \_   _|  ____\ \   / / | | | |
    // | | | | | |  | | |  | | |  \| | |  | | | |    | \  / | |  | | |  | || | | |__   \ \_/ /  | | | |
    // | | | | | |  | | |  | | | . ` | |  | | | |    | |\/| | |  | | |  | || | |  __|   \   /   | | | |
    // |_| |_| | |__| | |__| | | |\  | |__| | | |    | |  | | |__| | |__| || |_| |       | |    |_| |_|
    // (_) (_) |_____/ \____/  |_| \_|\____/  |_|    |_|  |_|\____/|_____/_____|_|       |_|    (_) (_)                                                                                     
    
    
    
    export class LoginDTO {
        public Id: string;
        public Username: string;
        public Password: string;
    
        constructor(databaseId: string, username: string, password: string)
        {
            this.Id = databaseId;
            this.Username = username
            this.Password = password
    
        }
    }
    //                        _               _____                           _           _            
    //             /\        | |             / ____|                         | |         | |           
    //            /  \  _   _| |_ ___ ______| |  __  ___ _ __   ___ _ __ __ _| |_ ___  __| |           
    //           / /\ \| | | | __/ _ \______| | |_ |/ _ \ '_ \ / _ \ '__/ _` | __/ _ \/ _` |           
    //          / ____ \ |_| | || (_) |     | |__| |  __/ | | |  __/ | | (_| | ||  __/ (_| |           
    //         /_/    \_\__,_|\__\___/       \_____|\___|_| |_|\___|_|  \__,_|\__\___|\__,_|           
    //  _   _   _____   ____    _   _  ____ _______   __  __  ____  _____ _____ ________     __  _   _ 
    // | | | | |  __ \ / __ \  | \ | |/ __ \__   __| |  \/  |/ __ \|  __ \_   _|  ____\ \   / / | | | |
    // | | | | | |  | | |  | | |  \| | |  | | | |    | \  / | |  | | |  | || | | |__   \ \_/ /  | | | |
    // | | | | | |  | | |  | | | . ` | |  | | | |    | |\/| | |  | | |  | || | |  __|   \   /   | | | |
    // |_| |_| | |__| | |__| | | |\  | |__| | | |    | |  | | |__| | |__| || |_| |       | |    |_| |_|
    // (_) (_) |_____/ \____/  |_| \_|\____/  |_|    |_|  |_|\____/|_____/_____|_|       |_|    (_) (_)                                                                                     
    
    
    export class UserDTO {
        public Id: string;
        public Status: UserStatusType;
        public Name: string;
        public Email: string;
        public IdentityName: string;
        public IdentityId: string;
    
        constructor(databaseId: string, status: UserStatusType, name: string, email: string, identityName: string, identityId: string)
        {
            this.Id = databaseId;
            this.Status = status
            this.Name = name
            this.Email = email
            this.IdentityName = identityName
            this.IdentityId = identityId
    
        }
    }
    
    export interface OnFailedDelegate {
        (response: Exception): void;
    }
    export interface OnSuccessDelegate<T> {
        (response: T): void;
    }
    
    export class Exception {
        public Stacktrace: string;
        public Message: string;
        public StatusCode: HttpStatusCode;
    
        constructor(message: string, stacktrace: string, statusCode : HttpStatusCode) {
            this.Stacktrace = stacktrace;
            this.Message = message;
            this.StatusCode = statusCode;
        }
    }
    /*
     * Summary: Safely Handles loading an element.
     * 
     * Date: 01/03/2023
     * Author: Corey St-Jacques
     * Company: Cobalt Metaverse
     * 
     */
    
    /** Safely Handles loading an element. */
    export class Loading {
        /** The current spinner template. */
        public static SpinnerTemplate: string = '<i class="mdi mdi-spin mdi-loading"></i>';
    
        /** The current DOM element to be loaded. */
        public DOMElement: HTMLElement;
        public DOMOriginalElement: HTMLElement;
    
        /** The temporary loading DOM element used to be displayed. */
        public DOMLoadingElement: HTMLElement;
    
        /** Constructor with parameters. Using the DOM element to be replaced, and the template loading. */
        constructor(element: HTMLElement, template: string = undefined) {
            this.DOMOriginalElement = element;
    
            if (element.tagName === 'BUTTON' || element.tagName === 'A') {
                this.DOMOriginalElement.setAttribute("disabled", "");
                element = element.firstChild as HTMLElement;
            }
    
            template = (template == undefined) ?
                Loading.SpinnerTemplate : template;
            this.DOMElement = element;
            this.DOMElement.hidden = true;
    
            const xmlDoc = (new DOMParser()).parseFromString(template, 'text/html');
    
            this.DOMLoadingElement = xmlDoc.getElementsByTagName("body")[0].firstElementChild as HTMLElement;
    
            this.DOMElement.parentElement.insertBefore(this.DOMLoadingElement, this.DOMElement);
    
        }
    
        /** Safely stops the loading process. */
        public Stop() {
            this.DOMLoadingElement.remove();
            this.DOMElement.hidden = false;
            this.DOMOriginalElement.removeAttribute("disabled");
        }
    }
    
    export class Response<T> {
        public Model: T;
        public IsError: boolean;
        public Status: HttpStatusCode;
        public Message: string;
        public ExecutionTime: number;
    
        constructor(model: T, isError: boolean,
            status: HttpStatusCode, message: string,
            executionTime: number) {
    
            this.Model = model;
            this.IsError = isError;
            this.Status = status;
            this.Message = message;
            this.ExecutionTime = executionTime;
        }
    }
    } 
    