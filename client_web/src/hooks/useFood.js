import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { useAuth } from "hooks/useAuth";
import { defaultUserFood } from "./defaultSessionData";
import { useSessionStorage } from "hooks/useSessionStorage";
import { v4 as uuidv4 } from "uuid";

import {
  getDBFoods,
  getUsersFoods,
  addDBFood,
  addUserFood,
  updateDBFood,
  updateUserFood,
  deleteDBFood,
  deleteUserFood,
} from "api/food";

export const useFood = () => {
  const { isGuestUser } = useAuth();
  const queryClient = useQueryClient();

  const [userSessionFoods, setUserSessionFoods] = useSessionStorage(
    `userFoods`,
    defaultUserFood
  );

  function useGetDBFoods(searchQuery) {
    return useInfiniteQuery(
      ["dbFoods", searchQuery],
      ({ pageParam = 1 }) => getDBFoods(pageParam, searchQuery),
      {
        enabled: !isGuestUser,
        getNextPageParam: (lastPage, _allPages) => {
          if (!lastPage.hasNextPage) return;
          return lastPage.page + 1;
        },
      }
    );
  }

  function useGetUsersFoods(searchQuery) {
    const { isGuestUser } = useAuth();

    // replicates react-query {useInfiniteQuery} API
    const useSessionQuery = () => {
      const fetchNextPage = () => {
        return;
      };

      return {
        fetchNextPage,
        data: {
          pages: [{ data: userSessionFoods, hasNextPage: false, page: 1 }],
        },
        isLoading: false,
        isFetchingNextPage: false,
      };
    };

    const sessionQuery = useSessionQuery();

    const serverQuery = useInfiniteQuery(
      ["userFoods", searchQuery],
      ({ pageParam = 1 }) => getUsersFoods(pageParam, searchQuery),
      {
        enabled: !isGuestUser,
        getNextPageParam: (lastPage, _allPages) => {
          if (!lastPage.hasNextPage) return;
          return lastPage.page + 1;
        },
      }
    );

    let query;
    if (isGuestUser) query = sessionQuery;
    else query = serverQuery;

    return query;
  }

  function useAddDBFood() {
    return useMutation(addDBFood, {
      onSuccess: () => {
        queryClient.invalidateQueries(["dbFoods"]);
      },
    });
  }

  function useAddUserFood() {
    // replicates react-query API & backend controller
    const useSessionMutator = () => {
      const mutateAsync = (food) => {
        const foodId = uuidv4();
        const apiFoodAddedDetails = {
          _id: foodId,
          id: foodId,
          isUserFood: true,
          createdBy: "guest",
        };

        const foodWithApiDetails = {
          ...food,
          ...apiFoodAddedDetails,
        };

        const newUserFoodsList = [foodWithApiDetails, ...userSessionFoods];

        setUserSessionFoods(newUserFoodsList);

        return {
          data: foodWithApiDetails,
          msg: `${foodWithApiDetails.name} Added to your foods`,
        };
      };
      return { mutateAsync };
    };
    const sessionMutator = useSessionMutator();

    const serverMutator = useMutation(addUserFood, {
      onSuccess: () => {
        queryClient.invalidateQueries(["userFoods"]);
      },
    });

    let mutator;
    if (isGuestUser) mutator = sessionMutator;
    else mutator = serverMutator;

    return mutator;
  }

  function useUpdateDBFood() {
    return useMutation(updateDBFood, {
      onSuccess: () => {
        queryClient.invalidateQueries(["dbFoods"]);
      },
    });
  }

  function useUpdateUserFood() {
    return useMutation(updateUserFood, {
      onSuccess: () => {
        queryClient.invalidateQueries(["userFoods"]);
      },
    });
  }

  function useDeleteDBFood() {
    return useMutation(deleteDBFood, {
      onSuccess: () => {
        queryClient.invalidateQueries(["dbFoods"]);
      },
    });
  }

  function useDeleteUserFood() {
    return useMutation(deleteUserFood, {
      onSuccess: () => {
        queryClient.invalidateQueries(["userFoods"]);
      },
    });
  }

  return {
    useGetDBFoods,
    useGetUsersFoods,
    useAddDBFood,
    useAddUserFood,
    useUpdateDBFood,
    useUpdateUserFood,
    useDeleteDBFood,
    useDeleteUserFood,
  };
};
