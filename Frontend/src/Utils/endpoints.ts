const baseURL: string = (() => {
  const url = process.env.BACKEND_API_URL;

  return url !== undefined
    ? url
    : (() => {
        throw new Error("BACKEND_API_URL environment variable is not defined");
      })();
})();

const vehicleController: string = `${baseURL}/v1/vehicles`;
const parkingSpotController: string = `${baseURL}/v1/parking-spots`;
const bookingsController: string = `${baseURL}/v1/bookings`;

// Auth
export const loginEndPoint: string = `${baseURL}/authenticate`;
export const registerEndPoint: string = `${baseURL}/register`;
export const refreshTokenEndPoint: string = `${baseURL}/authenticate/refresh`;

// Account
export const getCurrentUserEndPoint: string = `${baseURL}/account`;

// Vehicle
export const createVehicleEndPoint: string = vehicleController;
export const updateVehicleEndPoint: string = vehicleController;
export const getUserVehiclesEndPoint: string = vehicleController;
export const getVehicleEndPoint: string = vehicleController;
export const deleteVehicleEndPoint: string = vehicleController;

// Parking Spot
export const getParkingSpotsEndPoint: string = parkingSpotController;

// Bookings
export const createBookingEndPoint: string = bookingsController;
export const getBookingsEndPoint: string = bookingsController;
export const cancelBookingEndPoint: string = bookingsController;