export namespace InterCom {

    export class RoomInstanceController {

        private _currentClient: Client;

        constructor(currentClient: Client) {
            this._currentClient = currentClient;
        }
        /** Adds a listener to the SendToRoomInstance event */
        public AddSendToRoomInstanceListener(e: (modelDTO: DataDTO) => void) {
            this._onSendToRoomInstance.push(e);
        }

        public RemoveSendToRoomInstanceListener(e: (modelDTO: DataDTO) => void) {
            this._onSendToRoomInstance = this._onSendToRoomInstance.filter(listener => listener !== e);
        }

        public FireSendToRoomInstanceListeners(modelDTO: DataDTO) {
            this._onSendToRoomInstance.forEach(x => {
                x(modelDTO);
            });
        }

        private _onSendToRoomInstance: ((modelDTO: DataDTO) => void)[] = [];

        SendToRoomInstance(webSocketAccessToken: string, modelDTO: DataDTO) {
            this._currentClient.Send(webSocketAccessToken,
                this.constructor.name, "SendToRoomInstance", modelDTO);
        }
        /** Adds a listener to the SendToUsers event */
        public AddSendToUsersListener(e: (modelDTO: UserDataDTO) => void) {
            this._onSendToUsers.push(e);
        }

        public RemoveSendToUsersListener(e: (modelDTO: UserDataDTO) => void) {
            this._onSendToUsers = this._onSendToUsers.filter(listener => listener !== e);
        }

        public FireSendToUsersListeners(modelDTO: UserDataDTO) {
            this._onSendToUsers.forEach(x => {
                x(modelDTO);
            });
        }

        private _onSendToUsers: ((modelDTO: UserDataDTO) => void)[] = [];

        SendToUsers(webSocketAccessToken: string, modelDTO: UserDataDTO) {
            this._currentClient.Send(webSocketAccessToken,
                this.constructor.name, "SendToUsers", modelDTO);
        }


        //
        /** Adds a listener to the SendToUsers event */
        public AddUpdateUserSettingListener(e: (modelDTO: UpdateUserSettingDTO) => void) {
            this._onUpdateUserSetting.push(e);
        }

        public RemoveUpdateUserSettingListener(e: (modelDTO: UpdateUserSettingDTO) => void) {
            this._onUpdateUserSetting = this._onUpdateUserSetting.filter(listener => listener !== e);
        }

        public FireUpdateUserSettingListeners(modelDTO: UpdateUserSettingDTO) {
            this._onUpdateUserSetting.forEach(x => {
                x(modelDTO);
            });
        }

        private _onUpdateUserSetting: ((modelDTO: UpdateUserSettingDTO) => void)[] = [];

        UpdateUserSetting(webSocketAccessToken: string, modelDTO: UpdateUserSettingDTO) {
            this._currentClient.Send(webSocketAccessToken,
                this.constructor.name, "SendToUsers", modelDTO);
        }

        
        //
        /** Adds a listener to the SendToUsers event */
        public AddInvokeMethodListener(e: (modelDTO: string) => void) {
            this._onInvokeMethod.push(e);
        }

        public RemoveInvokeMethodListener(e: (modelDTO: string) => void) {
            this._onInvokeMethod = this._onInvokeMethod.filter(listener => listener !== e);
        }

        public FireInvokeMethodListeners(modelDTO: string) {
            this._onInvokeMethod.forEach(x => {
                x(modelDTO);
            });
        }

        private _onInvokeMethod: ((modelDTO: string) => void)[] = [];

        InvokeMethod(webSocketAccessToken: string, modelDTO: string) {
            this._currentClient.Send(webSocketAccessToken,
                this.constructor.name, "SendToUsers", modelDTO);
        }
    }

    export class UserStatusResponseDTO {
        public UserSettings: InterCom.UserSettingDTO[];
    
        constructor(userSettings: InterCom.UserSettingDTO[])
        {
            this.UserSettings = userSettings;
    
        }
    }

    export class InterComUserDTO {
        public RoomInstanceId: string;
        public Name: string;
    
        constructor(roomInstanceId: string, name: string)
        {
            this.RoomInstanceId = roomInstanceId;
            this.Name = name;
    
        }
    }
    export class DataDTO {
        public RoomInstanceId: string;
        public Data: string;
        public OtherUserId: string;
        public OtherUserName: string;

        constructor(roomInstanceId: string, data: string, otherUserId: string, otherUserName: string) {
            this.RoomInstanceId = roomInstanceId;
            this.Data = data;
            this.OtherUserId = otherUserId;
            this.OtherUserName = otherUserName;

        }
    }


    export class UserDataDTO {
        public Data: string;
        public UserIds: string[];
        public OtherUserId: string;
        public OtherUserName: string;

        constructor(data: string, userIds: string[], otherUserId: string, otherUserName: string) {
            this.Data = data;
            this.UserIds = userIds;
            this.OtherUserId = otherUserId;
            this.OtherUserName = otherUserName;

        }
    }

    export class UpdateUserSettingDTO {
        public Model: InterCom.UserSettingDTO;
    
        constructor(model: InterCom.UserSettingDTO)
        {
            this.Model = model;
    
        }
    }

    export interface IWebSocketElement {
        OnMessageReceived(message: InterCom.WebSocketClientMessageDTO): void;
    }
    export namespace InterCom {
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
            public AccessToken: string | undefined;
            public RelRoomInstanceWebSocketConnection: RelRoomInstanceWebSocketConnectionController;
            public RoomInstance: RoomInstanceController;
            public UserSetting: UserSettingController;
            public WebSocketConnection: WebSocketConnectionController;


            constructor(accessToken: string | undefined = undefined, baseUrl: string | undefined = undefined) {
                if (baseUrl != undefined) {
                    this.BaseMVCUrl = baseUrl;
                }
                this.AccessToken = accessToken;
                this.RelRoomInstanceWebSocketConnection = new RelRoomInstanceWebSocketConnectionController(this);
                this.RoomInstance = new RoomInstanceController(this);
                this.UserSetting = new UserSettingController(this);
                this.WebSocketConnection = new WebSocketConnectionController(this);

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




        export class RelRoomInstanceWebSocketConnectionController {

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



        export class RoomInstanceController {

            public Api: ClientAPI;

            constructor(clientAPI: ClientAPI) {
                this.Api = clientAPI;
            }

            ReadByUserId(userId: string,
                onSuccess: OnSuccessDelegate<RoomInstanceDTO[]>, onFailed: OnFailedDelegate,
                loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
                this.Api.ExecuteGetRequestAsync<RoomInstanceDTO[]>(
                    "RoomInstance", "ReadByUserId" + "/" + userId, (response: Response<RoomInstanceDTO[]>) => {
                        if (response.IsError) {
                            onFailed(new Exception(response.Message, "", response.Status));
                        }
                        else { onSuccess(response.Model); }
                    }, onFailed, loadingElement, loadingTemplate);
            }

            ReadViewPageByUniqueId(uniqueId: string, pageNumber: number, pageSize: number,
                onSuccess: OnSuccessDelegate<RoomInstanceViewDTO[]>, onFailed: OnFailedDelegate,
                loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
                this.Api.ExecuteGetRequestAsync<RoomInstanceViewDTO[]>(
                    "RoomInstance", "ReadViewPageByUniqueId" + "/" + uniqueId + "/" + pageNumber + "/" + pageSize, (response: Response<RoomInstanceViewDTO[]>) => {
                        if (response.IsError) {
                            onFailed(new Exception(response.Message, "", response.Status));
                        }
                        else { onSuccess(response.Model); }
                    }, onFailed, loadingElement, loadingTemplate);
            }

            ReadUserCountByUniqueId(uniqueId: string,
                onSuccess: OnSuccessDelegate<UniqueViewDTO>, onFailed: OnFailedDelegate,
                loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
                this.Api.ExecuteGetRequestAsync<UniqueViewDTO>(
                    "RoomInstance", "ReadUserCountByUniqueId" + "/" + uniqueId, (response: Response<UniqueViewDTO>) => {
                        if (response.IsError) {
                            onFailed(new Exception(response.Message, "", response.Status));
                        }
                        else { onSuccess(response.Model); }
                    }, onFailed, loadingElement, loadingTemplate);
            }

            Read(roomInstanceId: string,
                onSuccess: OnSuccessDelegate<RoomInstanceViewDTO>, onFailed: OnFailedDelegate,
                loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
                this.Api.ExecuteGetRequestAsync<RoomInstanceViewDTO>(
                    "RoomInstance", "Read" + "/" + roomInstanceId, (response: Response<RoomInstanceViewDTO>) => {
                        if (response.IsError) {
                            onFailed(new Exception(response.Message, "", response.Status));
                        }
                        else { onSuccess(response.Model); }
                    }, onFailed, loadingElement, loadingTemplate);
            }

            ReadConnectionsById(roomInstanceId: string,
                onSuccess: OnSuccessDelegate<WebSocketConnectionDTO[]>, onFailed: OnFailedDelegate,
                loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
                this.Api.ExecuteGetRequestAsync<WebSocketConnectionDTO[]>(
                    "RoomInstance", "ReadConnectionsById" + "/" + roomInstanceId, (response: Response<WebSocketConnectionDTO[]>) => {
                        if (response.IsError) {
                            onFailed(new Exception(response.Message, "", response.Status));
                        }
                        else { onSuccess(response.Model); }
                    }, onFailed, loadingElement, loadingTemplate);
            }

            ReadByConnectionId(connectionId: string,
                onSuccess: OnSuccessDelegate<RoomInstanceDTO[]>, onFailed: OnFailedDelegate,
                loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
                this.Api.ExecuteGetRequestAsync<RoomInstanceDTO[]>(
                    "RoomInstance", "ReadByConnectionId" + "/" + connectionId, (response: Response<RoomInstanceDTO[]>) => {
                        if (response.IsError) {
                            onFailed(new Exception(response.Message, "", response.Status));
                        }
                        else { onSuccess(response.Model); }
                    }, onFailed, loadingElement, loadingTemplate);
            }

            Join(roomInstanceId: string, connectionId: string,
                onSuccess: OnSuccessDelegate<RoomInstanceDTO>, onFailed: OnFailedDelegate,
                loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
                this.Api.ExecuteGetRequestAsync<RoomInstanceDTO>(
                    "RoomInstance", "Join" + "/" + roomInstanceId + "/" + connectionId, (response: Response<RoomInstanceDTO>) => {
                        if (response.IsError) {
                            onFailed(new Exception(response.Message, "", response.Status));
                        }
                        else { onSuccess(response.Model); }
                    }, onFailed, loadingElement, loadingTemplate);
            }

            Leave(roomInstanceId: string,
                onSuccess: OnSuccessDelegate<RoomInstanceDTO>, onFailed: OnFailedDelegate,
                loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
                this.Api.ExecuteGetRequestAsync<RoomInstanceDTO>(
                    "RoomInstance", "Leave" + "/" + roomInstanceId, (response: Response<RoomInstanceDTO>) => {
                        if (response.IsError) {
                            onFailed(new Exception(response.Message, "", response.Status));
                        }
                        else { onSuccess(response.Model); }
                    }, onFailed, loadingElement, loadingTemplate);
            }

            Create(uniqueId: string, maxUsers: number,
                onSuccess: OnSuccessDelegate<RoomInstanceDTO>, onFailed: OnFailedDelegate,
                loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
                this.Api.ExecuteGetRequestAsync<RoomInstanceDTO>(
                    "RoomInstance", "Create" + "/" + uniqueId + "/" + maxUsers, (response: Response<RoomInstanceDTO>) => {
                        if (response.IsError) {
                            onFailed(new Exception(response.Message, "", response.Status));
                        }
                        else { onSuccess(response.Model); }
                    }, onFailed, loadingElement, loadingTemplate);
            }

            Remove(roomInstanceId: string,
                onSuccess: OnSuccessDelegate<RoomInstanceDTO>, onFailed: OnFailedDelegate,
                loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
                this.Api.ExecuteGetRequestAsync<RoomInstanceDTO>(
                    "RoomInstance", "Remove" + "/" + roomInstanceId, (response: Response<RoomInstanceDTO>) => {
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

            Set(userSettingDTO: UserSettingDTO,
                onSuccess: OnSuccessDelegate<UserSettingDTO>, onFailed: OnFailedDelegate,
                loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
                this.Api.ExecutePostRequestAsync<UserSettingDTO, UserSettingDTO>(
                    "UserSetting", "Set", userSettingDTO, (response: Response<UserSettingDTO>) => {
                        if (response.IsError) {
                            onFailed(new Exception(response.Message, "", response.Status));
                        }
                        else { onSuccess(response.Model); }
                    }, onFailed, loadingElement, loadingTemplate);
            }

            GetOrCreate(userId: string,
                onSuccess: OnSuccessDelegate<UserSettingDTO>, onFailed: OnFailedDelegate,
                loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
                this.Api.ExecuteGetRequestAsync<UserSettingDTO>(
                    "UserSetting", "GetOrCreate" + "/" + userId, (response: Response<UserSettingDTO>) => {
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



        export class WebSocketConnectionController {

            public Api: ClientAPI;

            constructor(clientAPI: ClientAPI) {
                this.Api = clientAPI;
            }

            Create(WebSocketConnection: WebSocketConnectionDTO,
                onSuccess: OnSuccessDelegate<WebSocketConnectionDTO>, onFailed: OnFailedDelegate,
                loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
                this.Api.ExecutePostRequestAsync<WebSocketConnectionDTO, WebSocketConnectionDTO>(
                    "WebSocketConnection", "Create", WebSocketConnection, (response: Response<WebSocketConnectionDTO>) => {
                        if (response.IsError) {
                            onFailed(new Exception(response.Message, "", response.Status));
                        }
                        else { onSuccess(response.Model); }
                    }, onFailed, loadingElement, loadingTemplate);
            }

            SendMessage(webSocketClientMessageDTO: WebSocketClientRequestDTO,
                onSuccess: OnSuccessDelegate<WebSocketClientRequestDTO>, onFailed: OnFailedDelegate,
                loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
                this.Api.ExecutePostRequestAsync<WebSocketClientRequestDTO, WebSocketClientRequestDTO>(
                    "WebSocketConnection", "SendMessage", webSocketClientMessageDTO, (response: Response<WebSocketClientRequestDTO>) => {
                        if (response.IsError) {
                            onFailed(new Exception(response.Message, "", response.Status));
                        }
                        else { onSuccess(response.Model); }
                    }, onFailed, loadingElement, loadingTemplate);
            }

            Remove(connectionId: string,
                onSuccess: OnSuccessDelegate<string>, onFailed: OnFailedDelegate,
                loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
                this.Api.ExecuteGetRequestAsync<string>(
                    "WebSocketConnection", "Remove" + "/" + connectionId, (response: Response<string>) => {
                        if (response.IsError) {
                            onFailed(new Exception(response.Message, "", response.Status));
                        }
                        else { onSuccess(response.Model); }
                    }, onFailed, loadingElement, loadingTemplate);
            }

            ReadConnections(userId: string,
                onSuccess: OnSuccessDelegate<WebSocketConnectionDTO[]>, onFailed: OnFailedDelegate,
                loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
                this.Api.ExecuteGetRequestAsync<WebSocketConnectionDTO[]>(
                    "WebSocketConnection", "ReadConnections" + "/" + userId, (response: Response<WebSocketConnectionDTO[]>) => {
                        if (response.IsError) {
                            onFailed(new Exception(response.Message, "", response.Status));
                        }
                        else { onSuccess(response.Model); }
                    }, onFailed, loadingElement, loadingTemplate);
            }

            ReadUserIdByConnectionId(connectionId: string,
                onSuccess: OnSuccessDelegate<string>, onFailed: OnFailedDelegate,
                loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
                this.Api.ExecuteGetRequestAsync<string>(
                    "WebSocketConnection", "ReadUserIdByConnectionId" + "/" + connectionId, (response: Response<string>) => {
                        if (response.IsError) {
                            onFailed(new Exception(response.Message, "", response.Status));
                        }
                        else { onSuccess(response.Model); }
                    }, onFailed, loadingElement, loadingTemplate);
            }

            Clear(
                onSuccess: OnSuccessDelegate<string>, onFailed: OnFailedDelegate,
                loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
                this.Api.ExecuteGetRequestAsync<string>(
                    "WebSocketConnection", "Clear", (response: Response<string>) => {
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


        export enum UserStatusType {
            Offline = 0,
            Online = 1,
            Away = 2,
            DoNotDisturb = 3,

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

            constructor(databaseId: string, migrationId: string, productVersion: string) {
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

            constructor(databaseId: string, logId: string, exceptionType: string, message: string, stackTrace: string, properties: string) {
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
            public Id: string;

            constructor(databaseId: string) {
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



        export class RelRoomInstanceWebSocketConnectionDTO {
            public Id: string;
            public RoomInstanceId: string;
            public WebSocketConnectionId: string;

            constructor(databaseId: string, roomInstanceId: string, webSocketConnectionId: string) {
                this.Id = databaseId;
                this.RoomInstanceId = roomInstanceId
                this.WebSocketConnectionId = webSocketConnectionId

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



        export class RoomInstanceDTO {
            public Id: string;
            public HostUserId: string;
            public UniqueId: string;
            public Data: string;
            public MaxUsers: number;

            constructor(databaseId: string, hostUserId: string, uniqueId: string, data: string, maxUsers: number) {
                this.Id = databaseId;
                this.HostUserId = hostUserId
                this.UniqueId = uniqueId
                this.Data = data
                this.MaxUsers = maxUsers

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


        export class RoomInstanceViewDTO {
            public Id: string;
            public RoomInstance: RoomInstanceDTO;
            public UsersInRoom: number;

            constructor(databaseId: string, roomInstance: RoomInstanceDTO, usersInRoom: number) {
                this.Id = databaseId;
                this.RoomInstance = roomInstance
                this.UsersInRoom = usersInRoom

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



        export class UniqueViewDTO {
            public Id: string;
            public UserCount: number;

            constructor(databaseId: string, userCount: number) {
                this.Id = databaseId;
                this.UserCount = userCount

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
            public Status: UserStatusType;
            public StatusDescription: string;
            public TimeZone: string;

            constructor(databaseId: string, userId: string, status: UserStatusType, statusDescription: string, timeZone: string) {
                this.Id = databaseId;
                this.UserId = userId
                this.Status = status
                this.StatusDescription = statusDescription
                this.TimeZone = timeZone

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


        export class WebSocketApiMessageDTO {
            public Id: string;
            public ApiKey: string;
            public UserId: string;
            public Model: WebSocketClientMessageDTO;

            constructor(databaseId: string, apiKey: string, userId: string, model: WebSocketClientMessageDTO) {
                this.Id = databaseId;
                this.ApiKey = apiKey
                this.UserId = userId
                this.Model = model

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



        export class WebSocketClientMessageDTO {
            public Id: string;
            public ControllerName: string;
            public MethodName: string;
            public Data: string;
            public Type: string;

            constructor(databaseId: string, controllerName: string, methodName: string, data: string, type: string) {
                this.Id = databaseId;
                this.ControllerName = controllerName
                this.MethodName = methodName
                this.Data = data
                this.Type = type

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



        export class WebSocketClientRequestDTO {
            public Id: string;
            public AccessToken: string;
            public Data: string;
            public Type: string;
            public ControllerName: string;
            public MethodName: string;

            constructor(databaseId: string, accessToken: string, data: string, type: string, controllerName: string, methodName: string) {
                this.Id = databaseId;
                this.AccessToken = accessToken
                this.Data = data
                this.Type = type
                this.ControllerName = controllerName
                this.MethodName = methodName

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



        export class WebSocketConnectionDTO {
            public Id: string;
            public UserId: string;
            public ConnectionId: string;

            constructor(databaseId: string, userId: string, connectionId: string) {
                this.Id = databaseId;
                this.UserId = userId
                this.ConnectionId = connectionId

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

            constructor(message: string, stacktrace: string, statusCode: HttpStatusCode) {
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
            constructor(element: HTMLElement, template: string) {

                template = (template == undefined) ?
                    Loading.SpinnerTemplate : template;
                this.DOMElement = element;
                this.DOMElement.hidden = true;

                const xmlDoc = (new DOMParser()).parseFromString(template, 'text/html');

                this.DOMLoadingElement = xmlDoc.getElementsByTagName("body")[0].firstElementChild as HTMLElement;

                if (this.DOMElement.parentElement != null) {
                    this.DOMElement.parentElement.insertBefore(this.DOMLoadingElement, this.DOMElement);
                }
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




    export class Client {
        public BaseWebSocketUrl: string = '/';

        private _webSocket: WebSocket;
        public IsConnected: boolean;

        public WebSocketElements: IWebSocketElement[];
        public RoomInstance: RoomInstanceController;


        constructor(baseWebSocketUrl: string = undefined) {
            if (baseWebSocketUrl != undefined) {
                this.BaseWebSocketUrl = baseWebSocketUrl;
            }

            this.WebSocketElements = new Array<IWebSocketElement>();
            this.Initialize();

            this.RoomInstance = new RoomInstanceController(this);

        }

        GetConnectionState() {
            return this._webSocket.readyState
        }

        Initialize() {
            var instance: Client = this;
            instance._webSocket = new WebSocket(instance.BaseWebSocketUrl);

            instance._webSocket.onclose = function (event: CloseEvent) {
                instance.IsConnected = false;
                instance.FireOnDisconnectedListeners();
                setTimeout(() => {
                    instance.Initialize();
                }, 2000);
            };

            instance._webSocket.onopen = function (event: Event) {
                instance.IsConnected = true;
                instance.FireOnConnectedListeners();
            };

            instance._webSocket.onmessage = function (event: MessageEvent<any>) {
                if (event.data != "Success") {
                    var messageDTO = JSON.parse(event.data) as InterCom.WebSocketClientMessageDTO;

                    var controllerName: string = messageDTO.ControllerName.replace("Controller", "");

                    var rawJavascript: string = "instance." + controllerName + ".Fire"
                        + messageDTO.MethodName + "Listeners(JSON.parse(messageDTO.Data))";

                    eval(rawJavascript);

                    for (var i = 0; i < instance.WebSocketElements.length; i++) {
                        instance.WebSocketElements[i].OnMessageReceived(messageDTO);
                    }
                }
            }
        }

        Send<T>(accessToken: string, controllerName: string, methodName: string, dto: T) {
            if (this._webSocket.readyState === WebSocket.OPEN) {
                this._webSocket.send(JSON.stringify(new InterCom.WebSocketClientRequestDTO("00000000-0000-0000-0000-000000000000",
                    accessToken, JSON.stringify(dto), dto.constructor.name, controllerName, methodName)));
            }
        }

        AddListener(webSocketElement: IWebSocketElement) {
            this.WebSocketElements.push(webSocketElement);
        }
        Stop() {
            this.IsConnected = false;
            this.FireOnDisconnectedListeners();
            this._webSocket.close();
        }

        /** Adds a listener to the SendToUsers event */
        public AddOnConnectedListener(e: () => void) {
            this._onConnected.push(e);
        }

        public RemoveOnConnectedListener(e: () => void) {
            this._onConnected = this._onConnected.filter(listener => listener !== e);
        }

        public FireOnConnectedListeners() {
            this._onConnected.forEach(x => {
                x();
            });
        }

        private _onConnected: (() => void)[] = [];

        /** Adds a listener to the SendToUsers event */
        public AddOnDisconnectedListener(e: () => void) {
            this._onDisconnected.push(e);
        }

        public RemoveOnDisconnectedListener(e: () => void) {
            this._onDisconnected = this._onDisconnected.filter(listener => listener !== e);
        }

        public FireOnDisconnectedListeners() {
            this._onDisconnected.forEach(x => {
                x();
            });
        }

        private _onDisconnected: (() => void)[] = [];
    }
} 
