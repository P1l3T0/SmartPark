const baseURL: string = (() => {
  const url = process.env.BACKEND_API_URL;

  return url !== undefined ? url : (() => { throw new Error("BACKEND_API_URL environment variable is not defined"); })();
})();
