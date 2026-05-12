const baseURL: string = (() => {
  const url = process.env.BACKEND_API_URL;

  return url !== undefined
    ? url
    : (() => {
        throw new Error("BACKEND_API_URL environment variable is not defined");
      })();
})();

const vehicleController: string = `${baseURL}/vehicle`;
const parkingSpotController: string = `${baseURL}/parking-spot`;

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

// Vehicle
export const createVehicleEndPoint: string = `${vehicleController}/create`;
export const updateVehicleEndPoint: string = `${vehicleController}/update`;
export const getUserVehiclesEndPoint: string = `${vehicleController}/get/user-vehicles`;
export const deleteVehicleEndPoint: string = `${vehicleController}/delete`;

// Parking Spot
export const getParkingSpotsEndPoint: string = `${parkingSpotController}/get/all`;
export const reserveParkingSpotEndPoint: string = `${parkingSpotController}/reserve`;
export const cancelReservationEndPoint: string = `${parkingSpotController}/cancel`;