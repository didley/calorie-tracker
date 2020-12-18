import { useQuery } from "./useQuery";
import { useMutation } from "./useMutation";

export const useApi = () => {
  /* eslint-disable react-hooks/rules-of-hooks */
  return {
    get: (...args) => useQuery(...args),
    post: (...args) => useMutation("post", ...args),
    put: (...args) => useMutation("put", ...args),
    patch: (...args) => useMutation("patch", ...args),
    delete: (...args) => useMutation("delete", ...args),
  };
};
