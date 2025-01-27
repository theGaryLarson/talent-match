import { PublicClientApplication } from "@azure/msal-browser";
import authConfig from "./auth.config";

const msalInstance = new PublicClientApplication(authConfig);

export default msalInstance;
