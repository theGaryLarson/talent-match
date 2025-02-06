const authConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
    authority:
      `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_TENANT_ID}` ||
      "",
    redirectUri: "/ess",
    postLogoutRedirectUri: "/ess",
  },
  cache: {
    cacheLocation: "localStorage", // Choose between 'localStorage' or 'sessionStorage'
    storeAuthStateInCookie: false,
  },
};

export default authConfig;
