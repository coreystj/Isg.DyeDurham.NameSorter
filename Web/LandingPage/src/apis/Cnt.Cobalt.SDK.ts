export namespace Cobalt { 
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
    public BaseMVCUrl: string = '/';
    public AccessToken: string;
    public Avatar: AvatarController;
    public Event: EventController;
    public Group: GroupController;
    public Model: ModelController;
    public RelAvatarGroup: RelAvatarGroupController;
    public RelAvatarTransaction: RelAvatarTransactionController;
    public RelModelGroup: RelModelGroupController;
    public RelModelTransaction: RelModelTransactionController;
    public RelModelWorldUser: RelModelWorldUserController;
    public RelWorldGroup: RelWorldGroupController;
    public RelWorldTransaction: RelWorldTransactionController;
    public UserSetting: UserSettingController;
    public World: WorldController;


    constructor(accessToken: string = undefined, baseUrl: string = undefined) {
        if(baseUrl != undefined){
            this.BaseMVCUrl = baseUrl;
        }
        this.AccessToken = accessToken;
        this.Avatar = new AvatarController(this);
        this.Event = new EventController(this);
        this.Group = new GroupController(this);
        this.Model = new ModelController(this);
        this.RelAvatarGroup = new RelAvatarGroupController(this);
        this.RelAvatarTransaction = new RelAvatarTransactionController(this);
        this.RelModelGroup = new RelModelGroupController(this);
        this.RelModelTransaction = new RelModelTransactionController(this);
        this.RelModelWorldUser = new RelModelWorldUserController(this);
        this.RelWorldGroup = new RelWorldGroupController(this);
        this.RelWorldTransaction = new RelWorldTransactionController(this);
        this.UserSetting = new UserSettingController(this);
        this.World = new WorldController(this);

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



export class AvatarController {

    public Api: ClientAPI;

    constructor(clientAPI: ClientAPI) {
        this.Api = clientAPI;
    }

    Update(avatarDTO: AvatarDTO, 
        onSuccess: OnSuccessDelegate<AvatarDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecutePostRequestAsync<AvatarDTO, AvatarDTO>(
            "Avatar", "Update", avatarDTO,  (response: Response<AvatarDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Create(avatarDTO: AvatarDTO, 
        onSuccess: OnSuccessDelegate<AvatarDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecutePostRequestAsync<AvatarDTO, AvatarDTO>(
            "Avatar", "Create", avatarDTO,  (response: Response<AvatarDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    CheckOwnsAvatar(modelId: string, 
        onSuccess: OnSuccessDelegate<boolean>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<boolean>(
            "Avatar", "CheckOwnsAvatar" + "/" + modelId, (response: Response<boolean>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Purchase(modelId: string, 
        onSuccess: OnSuccessDelegate<boolean>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<boolean>(
            "Avatar", "Purchase" + "/" + modelId, (response: Response<boolean>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Read(avatarId: string, 
        onSuccess: OnSuccessDelegate<AvatarDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<AvatarDTO>(
            "Avatar", "Read" + "/" + avatarId, (response: Response<AvatarDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    GetMainByUserId(userId: string, 
        onSuccess: OnSuccessDelegate<AvatarDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<AvatarDTO>(
            "Avatar", "GetMainByUserId" + "/" + userId, (response: Response<AvatarDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Delete(avatarId: string, 
        onSuccess: OnSuccessDelegate<AvatarDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<AvatarDTO>(
            "Avatar", "Delete" + "/" + avatarId, (response: Response<AvatarDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadByNewlyCreated(pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<AvatarDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<AvatarDTO[]>(
            "Avatar", "ReadByNewlyCreated" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<AvatarDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadByLastModified(pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<AvatarDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<AvatarDTO[]>(
            "Avatar", "ReadByLastModified" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<AvatarDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadByFriends(pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<AvatarDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<AvatarDTO[]>(
            "Avatar", "ReadByFriends" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<AvatarDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadByHotness(pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<AvatarDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<AvatarDTO[]>(
            "Avatar", "ReadByHotness" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<AvatarDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadByMyAvatars(pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<AvatarDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<AvatarDTO[]>(
            "Avatar", "ReadByMyAvatars" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<AvatarDTO[]>) => {
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




export class CircleController {

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




export class EventController {

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



export class GroupController {

    public Api: ClientAPI;

    constructor(clientAPI: ClientAPI) {
        this.Api = clientAPI;
    }

    Update(groupDTO: GroupDTO, 
        onSuccess: OnSuccessDelegate<GroupDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecutePostRequestAsync<GroupDTO, GroupDTO>(
            "Group", "Update", groupDTO,  (response: Response<GroupDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Create(groupDTO: GroupDTO, 
        onSuccess: OnSuccessDelegate<GroupDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecutePostRequestAsync<GroupDTO, GroupDTO>(
            "Group", "Create", groupDTO,  (response: Response<GroupDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Read(groupId: string, 
        onSuccess: OnSuccessDelegate<GroupDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<GroupDTO>(
            "Group", "Read" + "/" + groupId, (response: Response<GroupDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    WorldExists(groupId: string, worldId: string, 
        onSuccess: OnSuccessDelegate<RelWorldGroupDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<RelWorldGroupDTO>(
            "Group", "WorldExists" + "/" + groupId + "/" + worldId, (response: Response<RelWorldGroupDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    AvatarExists(groupId: string, avatarId: string, 
        onSuccess: OnSuccessDelegate<RelAvatarGroupDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<RelAvatarGroupDTO>(
            "Group", "AvatarExists" + "/" + groupId + "/" + avatarId, (response: Response<RelAvatarGroupDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ModelExists(groupId: string, modelId: string, 
        onSuccess: OnSuccessDelegate<RelModelGroupDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<RelModelGroupDTO>(
            "Group", "ModelExists" + "/" + groupId + "/" + modelId, (response: Response<RelModelGroupDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    GetOrCreateMyFavorites(type: GroupType, 
        onSuccess: OnSuccessDelegate<GroupDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<GroupDTO>(
            "Group", "GetOrCreateMyFavorites" + "/" + type, (response: Response<GroupDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    AddAvatar(groupId: string, avatarId: string, 
        onSuccess: OnSuccessDelegate<RelAvatarGroupDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<RelAvatarGroupDTO>(
            "Group", "AddAvatar" + "/" + groupId + "/" + avatarId, (response: Response<RelAvatarGroupDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    RemoveAvatar(groupId: string, avatarId: string, 
        onSuccess: OnSuccessDelegate<RelAvatarGroupDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<RelAvatarGroupDTO>(
            "Group", "RemoveAvatar" + "/" + groupId + "/" + avatarId, (response: Response<RelAvatarGroupDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadAvatars(groupId: string, pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<AvatarDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<AvatarDTO[]>(
            "Group", "ReadAvatars" + "/" + groupId + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<AvatarDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadWorlds(groupId: string, pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<WorldDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<WorldDTO[]>(
            "Group", "ReadWorlds" + "/" + groupId + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<WorldDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadItems(groupId: string, pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<ModelDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<ModelDTO[]>(
            "Group", "ReadItems" + "/" + groupId + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<ModelDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    AddWorld(groupId: string, worldId: string, 
        onSuccess: OnSuccessDelegate<RelWorldGroupDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<RelWorldGroupDTO>(
            "Group", "AddWorld" + "/" + groupId + "/" + worldId, (response: Response<RelWorldGroupDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    RemoveWorld(groupId: string, worldId: string, 
        onSuccess: OnSuccessDelegate<RelWorldGroupDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<RelWorldGroupDTO>(
            "Group", "RemoveWorld" + "/" + groupId + "/" + worldId, (response: Response<RelWorldGroupDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    AddModel(groupId: string, modelId: string, 
        onSuccess: OnSuccessDelegate<RelModelGroupDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<RelModelGroupDTO>(
            "Group", "AddModel" + "/" + groupId + "/" + modelId, (response: Response<RelModelGroupDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    RemoveModel(groupId: string, modelId: string, 
        onSuccess: OnSuccessDelegate<RelModelGroupDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<RelModelGroupDTO>(
            "Group", "RemoveModel" + "/" + groupId + "/" + modelId, (response: Response<RelModelGroupDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    GetMyGroupsByType(type: GroupType, 
        onSuccess: OnSuccessDelegate<GroupDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<GroupDTO[]>(
            "Group", "GetMyGroupsByType" + "/" + type, (response: Response<GroupDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Delete(groupId: string, 
        onSuccess: OnSuccessDelegate<GroupDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<GroupDTO>(
            "Group", "Delete" + "/" + groupId, (response: Response<GroupDTO>) => {
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



export class ModelController {

    public Api: ClientAPI;

    constructor(clientAPI: ClientAPI) {
        this.Api = clientAPI;
    }

    Update(modelDTO: ModelDTO, 
        onSuccess: OnSuccessDelegate<ModelDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecutePostRequestAsync<ModelDTO, ModelDTO>(
            "Model", "Update", modelDTO,  (response: Response<ModelDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Create(modelDTO: ModelDTO, 
        onSuccess: OnSuccessDelegate<ModelDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecutePostRequestAsync<ModelDTO, ModelDTO>(
            "Model", "Create", modelDTO,  (response: Response<ModelDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    CheckOwnsModel(modelId: string, 
        onSuccess: OnSuccessDelegate<boolean>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<boolean>(
            "Model", "CheckOwnsModel" + "/" + modelId, (response: Response<boolean>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Purchase(modelId: string, 
        onSuccess: OnSuccessDelegate<boolean>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<boolean>(
            "Model", "Purchase" + "/" + modelId, (response: Response<boolean>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Read(modelId: string, 
        onSuccess: OnSuccessDelegate<ModelDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<ModelDTO>(
            "Model", "Read" + "/" + modelId, (response: Response<ModelDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Delete(modelId: string, 
        onSuccess: OnSuccessDelegate<ModelDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<ModelDTO>(
            "Model", "Delete" + "/" + modelId, (response: Response<ModelDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadByNewlyCreated(pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<ModelDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<ModelDTO[]>(
            "Model", "ReadByNewlyCreated" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<ModelDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadByLastModified(pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<ModelDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<ModelDTO[]>(
            "Model", "ReadByLastModified" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<ModelDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadByFriends(pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<ModelDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<ModelDTO[]>(
            "Model", "ReadByFriends" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<ModelDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadByHotness(pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<ModelDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<ModelDTO[]>(
            "Model", "ReadByHotness" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<ModelDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadByMyModels(pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<ModelDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<ModelDTO[]>(
            "Model", "ReadByMyModels" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<ModelDTO[]>) => {
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



export class PostContentController {

    public Api: ClientAPI;

    constructor(clientAPI: ClientAPI) {
        this.Api = clientAPI;
    }

    CreateMany(postContents: PostContentDTO[], 
        onSuccess: OnSuccessDelegate<PostContentDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecutePostRequestAsync<PostContentDTO[], PostContentDTO[]>(
            "PostContent", "CreateMany", postContents,  (response: Response<PostContentDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadByPostId(postId: string, 
        onSuccess: OnSuccessDelegate<PostContentDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<PostContentDTO[]>(
            "PostContent", "ReadByPostId" + "/" + postId, (response: Response<PostContentDTO[]>) => {
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



export class PostController {

    public Api: ClientAPI;

    constructor(clientAPI: ClientAPI) {
        this.Api = clientAPI;
    }

    Create(post: PostDTO, 
        onSuccess: OnSuccessDelegate<PostDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecutePostRequestAsync<PostDTO, PostDTO>(
            "Post", "Create", post,  (response: Response<PostDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadFeed(pageNumber: number, 
        onSuccess: OnSuccessDelegate<PostViewDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<PostViewDTO[]>(
            "Post", "ReadFeed" + "/" + pageNumber, (response: Response<PostViewDTO[]>) => {
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




export class RelAvatarGroupController {

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




export class RelAvatarTransactionController {

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




export class RelCircleUserController {

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




export class RelModelGroupController {

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




export class RelModelTransactionController {

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




export class RelModelWorldUserController {

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



export class RelUserUserController {

    public Api: ClientAPI;

    constructor(clientAPI: ClientAPI) {
        this.Api = clientAPI;
    }

    RequestNetwork(otherUserId: string, networkType: UserNetworkType, 
        onSuccess: OnSuccessDelegate<RelUserUserDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<RelUserUserDTO>(
            "RelUserUser", "RequestNetwork" + "/" + otherUserId + "/" + networkType, (response: Response<RelUserUserDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    RemoveNetwork(otherUserId: string, 
        onSuccess: OnSuccessDelegate<RelUserUserDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<RelUserUserDTO>(
            "RelUserUser", "RemoveNetwork" + "/" + otherUserId, (response: Response<RelUserUserDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    GetNetworkByOtherUserId(otherUserId: string, 
        onSuccess: OnSuccessDelegate<RelUserUserDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<RelUserUserDTO>(
            "RelUserUser", "GetNetworkByOtherUserId" + "/" + otherUserId, (response: Response<RelUserUserDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    GetNetwork(
        onSuccess: OnSuccessDelegate<RelUserUserDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<RelUserUserDTO[]>(
            "RelUserUser", "GetNetwork", (response: Response<RelUserUserDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    AcceptNetwork(otherUserId: string, 
        onSuccess: OnSuccessDelegate<RelUserUserDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<RelUserUserDTO>(
            "RelUserUser", "AcceptNetwork" + "/" + otherUserId, (response: Response<RelUserUserDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    CancelNetworkRequest(otherUserId: string, 
        onSuccess: OnSuccessDelegate<RelUserUserDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<RelUserUserDTO>(
            "RelUserUser", "CancelNetworkRequest" + "/" + otherUserId, (response: Response<RelUserUserDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    DeclineNetwork(otherUserId: string, 
        onSuccess: OnSuccessDelegate<RelUserUserDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<RelUserUserDTO>(
            "RelUserUser", "DeclineNetwork" + "/" + otherUserId, (response: Response<RelUserUserDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    GetMyRequests(
        onSuccess: OnSuccessDelegate<ConnectionViewDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<ConnectionViewDTO[]>(
            "RelUserUser", "GetMyRequests", (response: Response<ConnectionViewDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    GetPending(
        onSuccess: OnSuccessDelegate<ConnectionViewDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<ConnectionViewDTO[]>(
            "RelUserUser", "GetPending", (response: Response<ConnectionViewDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    GetMyConnections(
        onSuccess: OnSuccessDelegate<ConnectionViewDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<ConnectionViewDTO[]>(
            "RelUserUser", "GetMyConnections", (response: Response<ConnectionViewDTO[]>) => {
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




export class RelWorldGroupController {

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




export class RelWorldTransactionController {

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



export class UserController {

    public Api: ClientAPI;

    constructor(clientAPI: ClientAPI) {
        this.Api = clientAPI;
    }

    Search(searchName: string, 
        onSuccess: OnSuccessDelegate<GateKeeperUserDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<GateKeeperUserDTO[]>(
            "User", "Search" + "/" + searchName, (response: Response<GateKeeperUserDTO[]>) => {
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



export class UserSettingController {

    public Api: ClientAPI;

    constructor(clientAPI: ClientAPI) {
        this.Api = clientAPI;
    }

    UpsertMySettings(userSettingDTO: UserSettingDTO, 
        onSuccess: OnSuccessDelegate<UserSettingDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecutePostRequestAsync<UserSettingDTO, UserSettingDTO>(
            "UserSetting", "UpsertMySettings", userSettingDTO,  (response: Response<UserSettingDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    GetOrCreateByUserId(userId: string, 
        onSuccess: OnSuccessDelegate<UserSettingDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<UserSettingDTO>(
            "UserSetting", "GetOrCreateByUserId" + "/" + userId, (response: Response<UserSettingDTO>) => {
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



export class WorldController {

    public Api: ClientAPI;

    constructor(clientAPI: ClientAPI) {
        this.Api = clientAPI;
    }

    UpdateModel(relModelWorldUserDTO: RelModelWorldUserDTO, 
        onSuccess: OnSuccessDelegate<RelModelWorldUserDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecutePostRequestAsync<RelModelWorldUserDTO, RelModelWorldUserDTO>(
            "World", "UpdateModel", relModelWorldUserDTO,  (response: Response<RelModelWorldUserDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    AddModel(modelPlacementRequestDTO: ModelPlacementRequestDTO, 
        onSuccess: OnSuccessDelegate<RelModelWorldUserDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecutePostRequestAsync<RelModelWorldUserDTO, ModelPlacementRequestDTO>(
            "World", "AddModel", modelPlacementRequestDTO,  (response: Response<RelModelWorldUserDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Update(worldDTO: WorldDTO, 
        onSuccess: OnSuccessDelegate<WorldDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecutePostRequestAsync<WorldDTO, WorldDTO>(
            "World", "Update", worldDTO,  (response: Response<WorldDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Create(worldDTO: WorldDTO, 
        onSuccess: OnSuccessDelegate<WorldDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecutePostRequestAsync<WorldDTO, WorldDTO>(
            "World", "Create", worldDTO,  (response: Response<WorldDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    GetModelsByWorldAndByUserId(worldId: string, userId: string, 
        onSuccess: OnSuccessDelegate<ModelViewDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<ModelViewDTO[]>(
            "World", "GetModelsByWorldAndByUserId" + "/" + worldId + "/" + userId, (response: Response<ModelViewDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    RemoveModel(relModelWorldUserId: string, 
        onSuccess: OnSuccessDelegate<RelModelWorldUserDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<RelModelWorldUserDTO>(
            "World", "RemoveModel" + "/" + relModelWorldUserId, (response: Response<RelModelWorldUserDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    CheckOwnsWorld(modelId: string, 
        onSuccess: OnSuccessDelegate<boolean>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<boolean>(
            "World", "CheckOwnsWorld" + "/" + modelId, (response: Response<boolean>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Purchase(modelId: string, 
        onSuccess: OnSuccessDelegate<boolean>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<boolean>(
            "World", "Purchase" + "/" + modelId, (response: Response<boolean>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Read(worldId: string, 
        onSuccess: OnSuccessDelegate<WorldDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<WorldDTO>(
            "World", "Read" + "/" + worldId, (response: Response<WorldDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    GetMainByUserId(userId: string, 
        onSuccess: OnSuccessDelegate<WorldDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<WorldDTO>(
            "World", "GetMainByUserId" + "/" + userId, (response: Response<WorldDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    Delete(worldId: string, 
        onSuccess: OnSuccessDelegate<WorldDTO>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<WorldDTO>(
            "World", "Delete" + "/" + worldId, (response: Response<WorldDTO>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadByNewlyCreated(pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<WorldDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<WorldDTO[]>(
            "World", "ReadByNewlyCreated" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<WorldDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadByLastModified(pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<WorldDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<WorldDTO[]>(
            "World", "ReadByLastModified" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<WorldDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadByFriends(pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<WorldDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<WorldDTO[]>(
            "World", "ReadByFriends" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<WorldDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadByHotness(pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<WorldDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<WorldDTO[]>(
            "World", "ReadByHotness" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<WorldDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadByMyWorlds(pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<WorldDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<WorldDTO[]>(
            "World", "ReadByMyWorlds" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<WorldDTO[]>) => {
                if (response.IsError) {
                    onFailed(new Exception(response.Message, "", response.Status));
                }
                else { onSuccess(response.Model); }
            }, onFailed, loadingElement, loadingTemplate);
    }

    ReadByEvents(pageNumber: number, pageSize: number, searchName: string, 
        onSuccess: OnSuccessDelegate<WorldDTO[]>, onFailed: OnFailedDelegate,
        loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
        this.Api.ExecuteGetRequestAsync<WorldDTO[]>(
            "World", "ReadByEvents" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<WorldDTO[]>) => {
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


export enum GroupType {
    World = 0,
    Avatar = 1,
    Item = 2,

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


export enum PostContentType {
    Text = 0,
    Image = 1,
    Video = 2,

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


export enum UserNetworkType {
    None = 0,
    Acquaintance = 1,
    Friend = 2,
    Relationship = 3,
    Married = 4,

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



export class AvatarDTO {
    public Id: string;
    public Name: string;
    public Description: string;
    public DateCreated: Date;
    public DateModified: Date;
    public AuthorId: string;
    public Downloads: number;
    public Cost: number;
    public WindowsFileUrl: string;
    public AndroidFileUrl: string;
    public BannerUrl: string;

    constructor(databaseId: string, name: string, description: string, dateCreated: Date, dateModified: Date, authorId: string, downloads: number, cost: number, windowsFileUrl: string, androidFileUrl: string, bannerUrl: string)
    {
        this.Id = databaseId;
        this.Name = name
        this.Description = description
        this.DateCreated = dateCreated
        this.DateModified = dateModified
        this.AuthorId = authorId
        this.Downloads = downloads
        this.Cost = cost
        this.WindowsFileUrl = windowsFileUrl
        this.AndroidFileUrl = androidFileUrl
        this.BannerUrl = bannerUrl

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



export class CircleDTO {
    public Id: string;
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


export class ConnectionViewDTO {
    public Id: string;
    public CurrentUserId: string;
    public UserA: GateKeeperUserDTO;
    public UserB: GateKeeperUserDTO;
    public NetworkType: UserNetworkType;
    public UserARequestNetworkType: UserNetworkType;
    public UserBRequestNetworkType: UserNetworkType;

    constructor(databaseId: string, currentUserId: string, userA: GateKeeperUserDTO, userB: GateKeeperUserDTO, networkType: UserNetworkType, userARequestNetworkType: UserNetworkType, userBRequestNetworkType: UserNetworkType)
    {
        this.Id = databaseId;
        this.CurrentUserId = currentUserId
        this.UserA = userA
        this.UserB = userB
        this.NetworkType = networkType
        this.UserARequestNetworkType = userARequestNetworkType
        this.UserBRequestNetworkType = userBRequestNetworkType

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



export class EventDTO {
    public Id: string;
    public Name: string;
    public Description: string;
    public DateCreated: Date;
    public AuthorId: string;
    public WorldId: string;

    constructor(databaseId: string, name: string, description: string, dateCreated: Date, authorId: string, worldId: string)
    {
        this.Id = databaseId;
        this.Name = name
        this.Description = description
        this.DateCreated = dateCreated
        this.AuthorId = authorId
        this.WorldId = worldId

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



export class GateKeeperUserDTO {
    public Id: string;
    public UserName: string;
    public UserId: string;

    constructor(databaseId: string, userName: string, userId: string)
    {
        this.Id = databaseId;
        this.UserName = userName
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


export class GroupDTO {
    public Id: string;
    public Name: string;
    public Description: string;
    public Type: GroupType;
    public UserId: string;
    public IconIndex: number;

    constructor(databaseId: string, name: string, description: string, type: GroupType, userId: string, iconIndex: number)
    {
        this.Id = databaseId;
        this.Name = name
        this.Description = description
        this.Type = type
        this.UserId = userId
        this.IconIndex = iconIndex

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



export class ModelDTO {
    public Id: string;
    public Name: string;
    public Description: string;
    public DateCreated: Date;
    public DateModified: Date;
    public AuthorId: string;
    public Downloads: number;
    public Cost: number;
    public WindowsFileUrl: string;
    public AndroidFileUrl: string;
    public BannerUrl: string;

    constructor(databaseId: string, name: string, description: string, dateCreated: Date, dateModified: Date, authorId: string, downloads: number, cost: number, windowsFileUrl: string, androidFileUrl: string, bannerUrl: string)
    {
        this.Id = databaseId;
        this.Name = name
        this.Description = description
        this.DateCreated = dateCreated
        this.DateModified = dateModified
        this.AuthorId = authorId
        this.Downloads = downloads
        this.Cost = cost
        this.WindowsFileUrl = windowsFileUrl
        this.AndroidFileUrl = androidFileUrl
        this.BannerUrl = bannerUrl

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


export class ModelPlacementRequestDTO {
    public Id: string;
    public WorldId: string;
    public ModelId: string;
    public Transform: TransposerDTO;

    constructor(databaseId: string, worldId: string, modelId: string, transform: TransposerDTO)
    {
        this.Id = databaseId;
        this.WorldId = worldId
        this.ModelId = modelId
        this.Transform = transform

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


export class ModelViewDTO {
    public Id: string;
    public Model: ModelDTO;
    public RelModelWorldUser: RelModelWorldUserDTO;

    constructor(databaseId: string, model: ModelDTO, relModelWorldUser: RelModelWorldUserDTO)
    {
        this.Id = databaseId;
        this.Model = model
        this.RelModelWorldUser = relModelWorldUser

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


export class PostContentDTO {
    public Id: string;
    public PostId: string;
    public Type: PostContentType;
    public Content: string;

    constructor(databaseId: string, postId: string, type: PostContentType, content: string)
    {
        this.Id = databaseId;
        this.PostId = postId
        this.Type = type
        this.Content = content

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



export class PostDTO {
    public Id: string;
    public Content: string;
    public CreatedDate: Date;
    public UserId: string;

    constructor(databaseId: string, content: string, createdDate: Date, userId: string)
    {
        this.Id = databaseId;
        this.Content = content
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


export class PostViewDTO {
    public Id: string;
    public UserName: string;
    public UserId: string;
    public Post: PostDTO;
    public Content: PostContentDTO[];

    constructor(databaseId: string, userName: string, userId: string, post: PostDTO, content: PostContentDTO[])
    {
        this.Id = databaseId;
        this.UserName = userName
        this.UserId = userId
        this.Post = post
        this.Content = content

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



export class QuaternionDTO {
    public Id: string;
    public W: number;
    public X: number;
    public Y: number;
    public Z: number;

    constructor(databaseId: string, w: number, x: number, y: number, z: number)
    {
        this.Id = databaseId;
        this.W = w
        this.X = x
        this.Y = y
        this.Z = z

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



export class RelAvatarGroupDTO {
    public Id: string;
    public AvatarId: string;
    public GroupId: string;

    constructor(databaseId: string, avatarId: string, groupId: string)
    {
        this.Id = databaseId;
        this.AvatarId = avatarId
        this.GroupId = groupId

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



export class RelAvatarTransactionDTO {
    public Id: string;
    public AvatarId: string;
    public TransactionId: string;
    public UserId: string;

    constructor(databaseId: string, avatarId: string, transactionId: string, userId: string)
    {
        this.Id = databaseId;
        this.AvatarId = avatarId
        this.TransactionId = transactionId
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



export class RelCircleUserDTO {
    public Id: string;
    public CircleId: string;
    public UserId: string;

    constructor(databaseId: string, circleId: string, userId: string)
    {
        this.Id = databaseId;
        this.CircleId = circleId
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



export class RelModelGroupDTO {
    public Id: string;
    public ModelId: string;
    public GroupId: string;

    constructor(databaseId: string, modelId: string, groupId: string)
    {
        this.Id = databaseId;
        this.ModelId = modelId
        this.GroupId = groupId

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



export class RelModelTransactionDTO {
    public Id: string;
    public ModelId: string;
    public TransactionId: string;
    public UserId: string;

    constructor(databaseId: string, modelId: string, transactionId: string, userId: string)
    {
        this.Id = databaseId;
        this.ModelId = modelId
        this.TransactionId = transactionId
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



export class RelModelWorldUserDTO {
    public Id: string;
    public ModelId: string;
    public WorldId: string;
    public UserId: string;
    public RawTransposer: string;

    constructor(databaseId: string, modelId: string, worldId: string, userId: string, rawTransposer: string)
    {
        this.Id = databaseId;
        this.ModelId = modelId
        this.WorldId = worldId
        this.UserId = userId
        this.RawTransposer = rawTransposer

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


export class RelUserUserDTO {
    public Id: string;
    public UserAId: string;
    public UserBId: string;
    public NetworkType: UserNetworkType;
    public UserARequestNetworkType: UserNetworkType;
    public UserBRequestNetworkType: UserNetworkType;

    constructor(databaseId: string, userAId: string, userBId: string, networkType: UserNetworkType, userARequestNetworkType: UserNetworkType, userBRequestNetworkType: UserNetworkType)
    {
        this.Id = databaseId;
        this.UserAId = userAId
        this.UserBId = userBId
        this.NetworkType = networkType
        this.UserARequestNetworkType = userARequestNetworkType
        this.UserBRequestNetworkType = userBRequestNetworkType

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



export class RelWorldGroupDTO {
    public Id: string;
    public WorldId: string;
    public GroupId: string;

    constructor(databaseId: string, worldId: string, groupId: string)
    {
        this.Id = databaseId;
        this.WorldId = worldId
        this.GroupId = groupId

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



export class RelWorldTransactionDTO {
    public Id: string;
    public WorldId: string;
    public TransactionId: string;
    public UserId: string;

    constructor(databaseId: string, worldId: string, transactionId: string, userId: string)
    {
        this.Id = databaseId;
        this.WorldId = worldId
        this.TransactionId = transactionId
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


export class TransposerDTO {
    public Id: string;
    public Origin: Vector3DTO;
    public Scale: Vector3DTO;
    public Rotation: QuaternionDTO;

    constructor(databaseId: string, origin: Vector3DTO, scale: Vector3DTO, rotation: QuaternionDTO)
    {
        this.Id = databaseId;
        this.Origin = origin
        this.Scale = scale
        this.Rotation = rotation

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



export class UserSettingDTO {
    public Id: string;
    public UserId: string;
    public MainWorldId: string;
    public MainAvatarId: string;
    public Description: string;
    public BannerUrl: string;

    constructor(databaseId: string, userId: string, mainWorldId: string, mainAvatarId: string, description: string, bannerUrl: string)
    {
        this.Id = databaseId;
        this.UserId = userId
        this.MainWorldId = mainWorldId
        this.MainAvatarId = mainAvatarId
        this.Description = description
        this.BannerUrl = bannerUrl

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



export class Vector3DTO {
    public Id: string;
    public X: number;
    public Y: number;
    public Z: number;

    constructor(databaseId: string, x: number, y: number, z: number)
    {
        this.Id = databaseId;
        this.X = x
        this.Y = y
        this.Z = z

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



export class WorldDTO {
    public Id: string;
    public Name: string;
    public Description: string;
    public DateCreated: Date;
    public DateModified: Date;
    public AuthorId: string;
    public Downloads: number;
    public Cost: number;
    public WindowsFileUrl: string;
    public AndroidFileUrl: string;
    public BannerUrl: string;

    constructor(databaseId: string, name: string, description: string, dateCreated: Date, dateModified: Date, authorId: string, downloads: number, cost: number, windowsFileUrl: string, androidFileUrl: string, bannerUrl: string)
    {
        this.Id = databaseId;
        this.Name = name
        this.Description = description
        this.DateCreated = dateCreated
        this.DateModified = dateModified
        this.AuthorId = authorId
        this.Downloads = downloads
        this.Cost = cost
        this.WindowsFileUrl = windowsFileUrl
        this.AndroidFileUrl = androidFileUrl
        this.BannerUrl = bannerUrl

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
