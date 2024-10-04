import { Client, Account, ID } from 'react-native-appwrite';

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

type CreateUserProps = {
    username:string
    email:string
    password:string
}

export const createUser = ({username, email, password}:CreateUserProps)=> {
    account.create(ID.unique(), email, password, username)
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
}