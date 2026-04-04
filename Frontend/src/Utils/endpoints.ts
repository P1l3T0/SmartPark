const baseURL: string = (() => {
  const url = process.env.BACKEND_API_URL;

  return url !== undefined
    ? url
    : (() => {
        throw new Error("BACKEND_API_URL environment variable is not defined");
      })();
})();

const authController: string = `${baseURL}/auth`;
const verificationController: string = `${baseURL}/verification`;

export const loginEndPoint: string = `${authController}/login`;
export const registerEndPoint: string = `${authController}/register`;
export const verifyEndPoint: string = `${verificationController}/verify`;