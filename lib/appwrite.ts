import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.rncrashcourse',
    project: '66ffb072003bf412b45e',
    dababase: '66ffb401001c79f7dc63',
    usersCollection: '66ffb418002b610fff2c',
    videoCollection: '66ffb43a00193cd9a46e',
    storageId: '66ffb8e80001084c6415'
}

const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.project)
    .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)

type CreateUserProps = {
    username: string
    email: string
    password: string
}

export const createUser = async ({ username, email, password }: CreateUserProps) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username)

        if (!newAccount) throw new Error

        const avatarUrl = avatars.getInitials(username)

        await signIn({ email: email, password: password });

        const newUser = await databases.createDocument(
            config.dababase,
            config.usersCollection,
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