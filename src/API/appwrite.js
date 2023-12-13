import { Client , Databases} from 'appwrite';
const client = new Client();
client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_PROJECT_ID);

const databases = new Databases(client);

export { databases ,client}