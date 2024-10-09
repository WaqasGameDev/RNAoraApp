import { Alert } from 'react-native';
import { Client, Account, ID, Avatars, Databases, Query, Storage, ImageGravity } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.rncrashcourse',
    project: '66ffb072003bf412b45e',
    dababase: '66ffb401001c79f7dc63',
    usersCollection: '66ffb418002b610fff2c',
    videoCollection: '66ffb43a00193cd9a46e',
    storageId: '66ffb8e80001084c6415'
}

const {
    endpoint,
    platform,
    project,
    dababase,
    usersCollection,
    videoCollection,
    storageId
} = config

const client = new Client();

client
    .setEndpoint(endpoint)
    .setProject(project)
    .setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)
const storage = new Storage(client)

type CreateUserProps = {
    username: string
    email: string
    password: string
}

type ImagePickerAsset = {
    assetId?:string | null
    base64?:string | null
    duration?:number | null
    exif?:Record<string, any> | null
    filename?:string | null
    filesize?:number | null
    height?:number | null
    mimetype?:string | null
    type?:string | null
    uri?:string | null
    width?:number | null

}

type UploadFormProps = {
  title: string;
  video: ImagePickerAsset;
  thumbnail: ImagePickerAsset;
  prompt: string;
  userId:string
}


export const createUser = async ({ username, email, password }: CreateUserProps) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username)

        if (!newAccount) throw new Error

        const avatarUrl = avatars.getInitials(username)

        await signIn({ email: email, password: password });

        const newUser = await databases.createDocument(
            dababase,
            usersCollection,
            ID.unique(),
            {
                accountId: newAccount.$id,
                username: username,
                email: email,
                avatar: avatarUrl
            }
        )

        return newUser
    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

type SignInProps = {
    email: string
    password: string
}


export const signIn = async ({ email, password }: SignInProps) => {
    try {
        const newSession = await account.createEmailPasswordSession(email, password)
        return newSession;
    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) {
            throw Error
        }

        const currentUser = await databases.listDocuments(
            dababase,
            usersCollection,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) {
            throw Error
        }

        return currentUser.documents[0]

    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

export const getAllPosts = async () => {
    try {
        const posts = databases.listDocuments(
            dababase,
            videoCollection
        )

        return (await posts).documents
    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

export const getTrendingPosts = async () => {
    try {
        const posts = databases.listDocuments(
            dababase,
            videoCollection,
            [Query.orderDesc('$createdAt'), Query.limit(7)]
        )

        return (await posts).documents
    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

export const searchPosts = async (query: string) => {
    try {
        const posts = databases.listDocuments(
            dababase,
            videoCollection,
            [Query.search('title', query)]
        )

        return (await posts).documents
    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

export const getUserPosts = async (userId: string) => {

    try {
        const posts = databases.listDocuments(
            dababase,
            videoCollection,
            [Query.equal('creator', userId)]
        )

        return (await posts).documents
    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

export const signout = async () => {

    try {
        const session = await account.deleteSession('current')
        return session
    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

export const getFilePreview = async (fileId:string, fileType:string)=> {
    let fileUrl;
    
    try {

        if(fileType === 'video'){
            fileUrl = storage.getFileView(storageId, fileId)
        } else if (fileType === 'image'){
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, ImageGravity.Top,100)
        }
        else{
            throw new Error(' Invalid file type')
        }
        
        if(!fileUrl)
            throw Error

        return fileUrl

    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : String(error));
    }

}

export const uploadFile = async (file:ImagePickerAsset,fileType:string)=> {

    const {
        filename,   
        mimetype,               
        filesize,                      
        uri,
    } = file;

    const asset = {
        name: filename ?? `file-${Date.now()}`, 
        type: mimetype ?? fileType,            
        size: filesize ?? 0,                    
        uri: uri ?? '',                                     
    };
    try {

        const uploadFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset
        )
        
        const fileUrl = await getFilePreview(uploadFile.$id, fileType)

        return fileUrl

    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : String(error));
    }

}


export const createVideo = async ({title, thumbnail, video, prompt, userId}:UploadFormProps) => {
   
    try {
        const [videoUrl, thumbnailUrl] = await Promise.all([
            uploadFile(thumbnail, 'image'),
            uploadFile(video, 'video')
        ])
        const newPost = await databases.createDocument(
            dababase,
            videoCollection,
            ID.unique(),
            {
                title:title,
                thumbnail:thumbnailUrl,
                video:videoUrl,
                prompt:prompt,
                creator: userId
            }
        )

        return newPost

    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}