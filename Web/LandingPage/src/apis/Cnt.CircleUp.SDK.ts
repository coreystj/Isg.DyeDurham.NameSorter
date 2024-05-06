export namespace CircleUp { 
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
        public Circle: CircleController;
        public Comment: CommentController;
        public Like: LikeController;
        public PostContent: PostContentController;
        public Post: PostController;
        public RelCircleUser: RelCircleUserController;
        public RelUserUser: RelUserUserController;
        public User: UserController;
    
    
        constructor(accessToken: string = undefined, baseUrl: string = undefined) {
            if(baseUrl != undefined){
                this.BaseMVCUrl = baseUrl;
            }
            this.AccessToken = accessToken;
            this.Circle = new CircleController(this);
            this.Comment = new CommentController(this);
            this.Like = new LikeController(this);
            this.PostContent = new PostContentController(this);
            this.Post = new PostController(this);
            this.RelCircleUser = new RelCircleUserController(this);
            this.RelUserUser = new RelUserUserController(this);
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
    
    
    
    export class CircleController {
    
        public Api: ClientAPI;
    
        constructor(clientAPI: ClientAPI) {
            this.Api = clientAPI;
        }
    
        Update(circleDTO: CircleDTO, 
            onSuccess: OnSuccessDelegate<CircleDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecutePostRequestAsync<CircleDTO, CircleDTO>(
                "Circle", "Update", circleDTO,  (response: Response<CircleDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        Create(circleDTO: CircleDTO, 
            onSuccess: OnSuccessDelegate<CircleDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecutePostRequestAsync<CircleDTO, CircleDTO>(
                "Circle", "Create", circleDTO,  (response: Response<CircleDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        Read(circleId: string, 
            onSuccess: OnSuccessDelegate<CircleDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<CircleDTO>(
                "Circle", "Read" + "/" + circleId, (response: Response<CircleDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        GetOrCreateMyFavorites(
            onSuccess: OnSuccessDelegate<CircleDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<CircleDTO>(
                "Circle", "GetOrCreateMyFavorites", (response: Response<CircleDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        ReadUsers(circleId: string, pageNumber: number, pageSize: number, searchName: string, 
            onSuccess: OnSuccessDelegate<GateKeeperUserDTO[]>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<GateKeeperUserDTO[]>(
                "Circle", "ReadUsers" + "/" + circleId + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<GateKeeperUserDTO[]>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        AddUser(circleId: string, userId: string, 
            onSuccess: OnSuccessDelegate<RelCircleUserDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<RelCircleUserDTO>(
                "Circle", "AddUser" + "/" + circleId + "/" + userId, (response: Response<RelCircleUserDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        RemoveUser(circleId: string, userId: string, 
            onSuccess: OnSuccessDelegate<RelCircleUserDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<RelCircleUserDTO>(
                "Circle", "RemoveUser" + "/" + circleId + "/" + userId, (response: Response<RelCircleUserDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        GetMyCircles(
            onSuccess: OnSuccessDelegate<CircleDTO[]>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<CircleDTO[]>(
                "Circle", "GetMyCircles", (response: Response<CircleDTO[]>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        Delete(circleId: string, 
            onSuccess: OnSuccessDelegate<CircleDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<CircleDTO>(
                "Circle", "Delete" + "/" + circleId, (response: Response<CircleDTO>) => {
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
    
    
    
    export class CommentController {
    
        public Api: ClientAPI;
    
        constructor(clientAPI: ClientAPI) {
            this.Api = clientAPI;
        }
    
        Update(comment: CommentDTO, 
            onSuccess: OnSuccessDelegate<CommentDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecutePostRequestAsync<CommentDTO, CommentDTO>(
                "Comment", "Update", comment,  (response: Response<CommentDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        Create(comment: CommentDTO, 
            onSuccess: OnSuccessDelegate<CommentDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecutePostRequestAsync<CommentDTO, CommentDTO>(
                "Comment", "Create", comment,  (response: Response<CommentDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        ReadByPostId(postId: string, pageNumber: number, 
            onSuccess: OnSuccessDelegate<CommentDTO[]>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<CommentDTO[]>(
                "Comment", "ReadByPostId" + "/" + postId + "/" + pageNumber, (response: Response<CommentDTO[]>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        Delete(id: string, 
            onSuccess: OnSuccessDelegate<CommentDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<CommentDTO>(
                "Comment", "Delete" + "/" + id, (response: Response<CommentDTO>) => {
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
    
    
    
    export class LikeController {
    
        public Api: ClientAPI;
    
        constructor(clientAPI: ClientAPI) {
            this.Api = clientAPI;
        }
    
        Create(like: LikeDTO, 
            onSuccess: OnSuccessDelegate<LikeDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecutePostRequestAsync<LikeDTO, LikeDTO>(
                "Like", "Create", like,  (response: Response<LikeDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        GetByPostId(postId: string, 
            onSuccess: OnSuccessDelegate<LikeDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<LikeDTO>(
                "Like", "GetByPostId" + "/" + postId, (response: Response<LikeDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        Delete(postId: string, 
            onSuccess: OnSuccessDelegate<LikeDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<LikeDTO>(
                "Like", "Delete" + "/" + postId, (response: Response<LikeDTO>) => {
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
    
        ReadFeedByUserId(userId: string, pageNumber: number, 
            onSuccess: OnSuccessDelegate<PostViewDTO[]>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<PostViewDTO[]>(
                "Post", "ReadFeedByUserId" + "/" + userId + "/" + pageNumber, (response: Response<PostViewDTO[]>) => {
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
    
        ReadFeedByType(pageNumber: number, rawPostContentType: number, 
            onSuccess: OnSuccessDelegate<PostViewDTO[]>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<PostViewDTO[]>(
                "Post", "ReadFeedByType" + "/" + pageNumber + "/" + rawPostContentType, (response: Response<PostViewDTO[]>) => {
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
    
    
    
    export class RelUserUserController {
    
        public Api: ClientAPI;
    
        constructor(clientAPI: ClientAPI) {
            this.Api = clientAPI;
        }
    
        RequestNetwork(otherUserId: string, rawNetworkType: number, 
            onSuccess: OnSuccessDelegate<UserRelationshipDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<UserRelationshipDTO>(
                "RelUserUser", "RequestNetwork" + "/" + otherUserId + "/" + rawNetworkType, (response: Response<UserRelationshipDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        RemoveNetwork(otherUserId: string, 
            onSuccess: OnSuccessDelegate<UserRelationshipDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<UserRelationshipDTO>(
                "RelUserUser", "RemoveNetwork" + "/" + otherUserId, (response: Response<UserRelationshipDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        GetNetworkByOtherUserId(otherUserId: string, 
            onSuccess: OnSuccessDelegate<UserRelationshipDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<UserRelationshipDTO>(
                "RelUserUser", "GetNetworkByOtherUserId" + "/" + otherUserId, (response: Response<UserRelationshipDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        GetNetwork(pageNumber: number, pageSize: number, searchName: string, 
            onSuccess: OnSuccessDelegate<UserRelationshipDTO[]>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<UserRelationshipDTO[]>(
                "RelUserUser", "GetNetwork" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<UserRelationshipDTO[]>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        AcceptNetwork(otherUserId: string, 
            onSuccess: OnSuccessDelegate<UserRelationshipDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<UserRelationshipDTO>(
                "RelUserUser", "AcceptNetwork" + "/" + otherUserId, (response: Response<UserRelationshipDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        CancelNetworkRequest(otherUserId: string, 
            onSuccess: OnSuccessDelegate<UserRelationshipDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<UserRelationshipDTO>(
                "RelUserUser", "CancelNetworkRequest" + "/" + otherUserId, (response: Response<UserRelationshipDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        DeclineNetwork(otherUserId: string, 
            onSuccess: OnSuccessDelegate<UserRelationshipDTO>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<UserRelationshipDTO>(
                "RelUserUser", "DeclineNetwork" + "/" + otherUserId, (response: Response<UserRelationshipDTO>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        GetMyRequests(pageNumber: number, pageSize: number, searchName: string, 
            onSuccess: OnSuccessDelegate<ConnectionViewDTO[]>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<ConnectionViewDTO[]>(
                "RelUserUser", "GetMyRequests" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<ConnectionViewDTO[]>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        GetPending(pageNumber: number, pageSize: number, searchName: string, 
            onSuccess: OnSuccessDelegate<ConnectionViewDTO[]>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<ConnectionViewDTO[]>(
                "RelUserUser", "GetPending" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<ConnectionViewDTO[]>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        GetConnectionCount(userId: string, 
            onSuccess: OnSuccessDelegate<number>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<number>(
                "RelUserUser", "GetConnectionCount" + "/" + userId, (response: Response<number>) => {
                    if (response.IsError) {
                        onFailed(new Exception(response.Message, "", response.Status));
                    }
                    else { onSuccess(response.Model); }
                }, onFailed, loadingElement, loadingTemplate);
        }
    
        GetMyConnections(pageNumber: number, pageSize: number, searchName: string, 
            onSuccess: OnSuccessDelegate<ConnectionViewDTO[]>, onFailed: OnFailedDelegate,
            loadingElement: HTMLElement = undefined, loadingTemplate: string = undefined): void {
            this.Api.ExecuteGetRequestAsync<ConnectionViewDTO[]>(
                "RelUserUser", "GetMyConnections" + "/" + pageNumber + "/" + pageSize + "/" + searchName, (response: Response<ConnectionViewDTO[]>) => {
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
    
    
    export enum PostContentType {
        None = 0,
        Text = 1,
        Image = 2,
        Video = 3,
        Animation = 4,
    
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
        Family = 5,
        Guardian = 6,
        Follower = 7,
    
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
        public IconIndex: number;
    
        constructor(databaseId: string, name: string, createdDate: Date, userId: string, iconIndex: number)
        {
            this.Id = databaseId;
            this.Name = name
            this.CreatedDate = createdDate
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
    
    
    
    export class CommentDTO {
        public Id: string;
        public Content: string;
        public CreatedDate: Date;
        public UserId: string;
        public PostId: string;
    
        constructor(databaseId: string, content: string, createdDate: Date, userId: string, postId: string)
        {
            this.Id = databaseId;
            this.Content = content
            this.CreatedDate = createdDate
            this.UserId = userId
            this.PostId = postId
    
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
        public User: GateKeeperUserDTO;
        public NetworkType: UserNetworkType;
        public UserRequestNetworkType: UserNetworkType;
    
        constructor(databaseId: string, currentUserId: string, user: GateKeeperUserDTO, networkType: UserNetworkType, userRequestNetworkType: UserNetworkType)
        {
            this.Id = databaseId;
            this.CurrentUserId = currentUserId
            this.User = user
            this.NetworkType = networkType
            this.UserRequestNetworkType = userRequestNetworkType
    
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
    
    
    
    export class LikeDTO {
        public Id: string;
        public CreatedDate: Date;
        public UserId: string;
        public PostId: string;
    
        constructor(databaseId: string, createdDate: Date, userId: string, postId: string)
        {
            this.Id = databaseId;
            this.CreatedDate = createdDate
            this.UserId = userId
            this.PostId = postId
    
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
        public Likes: number;
        public CreatedDate: Date;
        public UserId: string;
    
        constructor(databaseId: string, content: string, likes: number, createdDate: Date, userId: string)
        {
            this.Id = databaseId;
            this.Content = content
            this.Likes = likes
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
    
    
    export class UserRelationshipDTO {
        public Id: string;
        public Model: RelUserUserDTO;
        public UserId: string;
        public CurrentNetworkType: UserNetworkType;
        public RequestNetworkType: UserNetworkType;
    
        constructor(databaseId: string, model: RelUserUserDTO, userId: string, currentNetworkType: UserNetworkType, requestNetworkType: UserNetworkType)
        {
            this.Id = databaseId;
            this.Model = model
            this.UserId = userId
            this.CurrentNetworkType = currentNetworkType
            this.RequestNetworkType = requestNetworkType
    
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
    