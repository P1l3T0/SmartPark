const baseURL: string = (() => {
  const url = process.env.BACKEND_API_URL;

  return url !== undefined
    ? url
    : (() => {
        throw new Error("BACKEND_API_URL environment variable is not defined");
      })();
})();

// Auth
export const loginEndPoint: string = `${baseURL}/authenticate`;
export const registerEndPoint: string = `${baseURL}/register`;
export const refreshTokenEndPoint: string = `${baseURL}/authenticate/refresh`;

// Account
export const getCurrentUserEndPoint: string = `${baseURL}/account`;
export const changePasswordEndPoint: string = `${baseURL}/account/change-password`;
export const resetPasswordInitEndPoint: string = `${baseURL}/account/reset-password/init`;
export const resetPasswordFinishEndPoint: string = `${baseURL}/account/reset-password/finish`;
export const activateAccountEndPoint: string = `${baseURL}/activate`;