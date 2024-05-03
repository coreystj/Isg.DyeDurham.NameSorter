

export namespace CyberCache { 
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
    public BaseMVCUrl: string = 'https://sqqhh1hie7.execute-api.us-east-2.amazonaws.com/Prod/api/';
    public AccessToken: string | undefined;
    public Container: ContainerController;
    public Product: ProductController;


    constructor(accessToken: string | undefined) {
        this.AccessToken = accessToken;
        this.Container = new ContainerController(this);
        this.Product = new ProductController(this);

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



export class ContainerController {

    public Api: ClientAPI;

    constructor(clientAPI: ClientAPI) {
        this.Api = clientAPI;
    }

    Create(modelDTO: ContainerDTO, 
        onSuccess: OnSuccessDelegate<ContainerDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecutePostRequestAsync<ContainerDTO, ContainerDTO>(
            "Container", "Create", modelDTO,  (response: Response<ContainerDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Update(currentModel: ContainerDTO, 
        onSuccess: OnSuccessDelegate<ContainerDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecutePostRequestAsync<ContainerDTO, ContainerDTO>(
            "Container", "Update", currentModel,  (response: Response<ContainerDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadChildrenByContainerId(parentId: string, 
        onSuccess: OnSuccessDelegate<ContainerDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<ContainerDTO[]>(
            "Container", "ReadChildrenByContainerId" + "/" + parentId, (response: Response<ContainerDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadRootContainers(
        onSuccess: OnSuccessDelegate<ContainerDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<ContainerDTO[]>(
            "Container", "ReadRootContainers", (response: Response<ContainerDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Read(id: string, 
        onSuccess: OnSuccessDelegate<ContainerDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<ContainerDTO>(
            "Container", "Read" + "/" + id, (response: Response<ContainerDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Delete(id: string, 
        onSuccess: OnSuccessDelegate<ContainerDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<ContainerDTO>(
            "Container", "Delete" + "/" + id, (response: Response<ContainerDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    GetUploadCredentials(
        onSuccess: OnSuccessDelegate<AWSCredentialsDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<AWSCredentialsDTO>(
            "Container", "GetUploadCredentials", (response: Response<AWSCredentialsDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    GetMyStorageSpace(
        onSuccess: OnSuccessDelegate<StorageSpaceDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<StorageSpaceDTO>(
            "Container", "GetMyStorageSpace", (response: Response<StorageSpaceDTO>) => {
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



export class ProductController {

    public Api: ClientAPI;

    constructor(clientAPI: ClientAPI) {
        this.Api = clientAPI;
    }

    SetDefaultCreditCard(creditCardDTO: CreditCardDTO, 
        onSuccess: OnSuccessDelegate<CreditCardDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecutePostRequestAsync<CreditCardDTO, CreditCardDTO>(
            "Product", "SetDefaultCreditCard", creditCardDTO,  (response: Response<CreditCardDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    GetDefaultPaymentMethod(
        onSuccess: OnSuccessDelegate<PaymentMethodDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<PaymentMethodDTO>(
            "Product", "GetDefaultPaymentMethod", (response: Response<PaymentMethodDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    GetSubscription(
        onSuccess: OnSuccessDelegate<SubscriptionDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<SubscriptionDTO>(
            "Product", "GetSubscription", (response: Response<SubscriptionDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    CancelSubscription(
        onSuccess: OnSuccessDelegate<SubscriptionDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<SubscriptionDTO>(
            "Product", "CancelSubscription", (response: Response<SubscriptionDTO>) => {
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


export enum ContainerType {
    File = 0,
    Folder = 1,
    Root = 2,

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



export class AWSCredentialsDTO {
    public Id : string;
    public AccessKeyId: string;
    public SecretAccessKey: string;
    public SessionToken: string;
    public BucketName: string;
    public Region: string;

    constructor(databaseId: string, accessKeyId: string, secretAccessKey: string, sessionToken: string, bucketName: string, region: string)
    {
        this.Id = databaseId;
        this.AccessKeyId = accessKeyId
        this.SecretAccessKey = secretAccessKey
        this.SessionToken = sessionToken
        this.BucketName = bucketName
        this.Region = region

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


export class ContainerDTO {
    public Id : string;
    public ContainerType: ContainerType;
    public Name: string;
    public CreatedDate: Date;
    public FileSize: number;
    public UserId: string;
    public ParentContainerId: string;

    constructor(databaseId: string, containerType: ContainerType, name: string, createdDate: Date, fileSize: number, userId: string, parentContainerId: string)
    {
        this.Id = databaseId;
        this.ContainerType = containerType
        this.Name = name
        this.CreatedDate = createdDate
        this.FileSize = fileSize
        this.UserId = userId
        this.ParentContainerId = parentContainerId

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



export class CreditCardDTO {
    public Id : string;
    public Number: string;
    public Owner: string;
    public Year: number;
    public Month: number;
    public CVV: string;

    constructor(databaseId: string, number: string, owner: string, year: number, month: number, cVV: string)
    {
        this.Id = databaseId;
        this.Number = number
        this.Owner = owner
        this.Year = year
        this.Month = month
        this.CVV = cVV

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
    public Id : string;
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
    public Id : string;
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



export class JsonConverterDTO {
    public Id : string;

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



export class PaymentMethodDTO {
    public Id : string;
    public PaymentMethodId: string;

    constructor(databaseId: string, paymentMethodId: string)
    {
        this.Id = databaseId;
        this.PaymentMethodId = paymentMethodId

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



export class ProductDTO {
    public Id : string;
    public Name: string;
    public CreatedDate: Date;
    public UserId: string;

    constructor(databaseId: string, name: string, createdDate: Date, userId: string)
    {
        this.Id = databaseId;
        this.Name = name
        this.CreatedDate = createdDate
        this.UserId = userId

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



export class StorageSpaceDTO {
    public Id : string;
    public AvailableSpace: number;
    public SpaceUsed: number;

    constructor(databaseId: string, availableSpace: number, spaceUsed: number)
    {
        this.Id = databaseId;
        this.AvailableSpace = availableSpace
        this.SpaceUsed = spaceUsed

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



export class SubscriptionDTO {
    public Id : string;
    public SubscriptionId: string;
    public PriceId: string;

    constructor(databaseId: string, subscriptionId: string, priceId: string)
    {
        this.Id = databaseId;
        this.SubscriptionId = subscriptionId
        this.PriceId = priceId

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
 * Company: PCloud Innovations
 * 
 */

/** Safely Handles loading an element. */
export class Loading {
    /** The current spinner template. */
    public static SpinnerTemplate: string = '<i class="mdi mdi-spin mdi-loading"></i>';

    /** The current DOM element to be loaded. */
    public DOMElement: HTMLElement;

    /** The temporary loading DOM element used to be displayed. */
    public DOMLoadingElement: HTMLElement;

    /** Constructor with parameters. Using the DOM element to be replaced, and the template loading. */
    constructor(element: HTMLElement, template: string = undefined) {

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
