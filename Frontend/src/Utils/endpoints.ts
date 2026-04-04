const baseURL: string = (() => {
  const url = process.env.BACKEND_API_URL;

  return url !== undefined
    ? url
    : (() => {
        throw new Error("BACKEND_API_URL environment variable is not defined");
      })();
})();

const authController: string = `${baseURL}/auth`;
const refreshController: string = `${baseURL}/refresh`;
const verificationController: string = `${baseURL}/verification`;
const userController: string = `${baseURL}/user`;

// Auth
export const loginEndPoint: string = `${authController}/login`;
export const registerEndPoint: string = `${authController}/register`;
export const refreshTokenEndPoint: string = `${refreshController}/refresh`;
export const verifyEndPoint: string = `${verificationController}/verify`;

// User
export const getCurrentUserEndPoint: string = `${userController}/get/current-user`;