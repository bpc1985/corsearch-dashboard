import { useReducer, useMemo, useCallback } from "react";
import { User } from "types";
import { ActionKind, ActionType, StateType } from "hooks/useFilterSort/types";
import { useDebounce } from "hooks/useDebounce";

const initialState: StateType = {
  filterText: "",
  sortField: "name",
  sortDirection: "asc",
};

export const filterSortReducer = (
  state: StateType,
  action: ActionType
): StateType => {
  switch (action.type) {
    case ActionKind.SET_FILTER_TEXT:
      return { ...state, filterText: action.payload };
    case ActionKind.SET_SORT_FIELD:
      return {
        ...state,
        sortField: action.payload,
        sortDirection:
          action.payload === state.sortField
            ? state.sortDirection === "asc"
              ? "desc"
              : "asc"
            : "asc",
      };
    case ActionKind.SET_SORT_DIRECTION:
      return { ...state, sortDirection: action.payload };
    default:
      return state;
  }
};

export const useFilterSort = (users: User[]) => {
  const [state, dispatch] = useReducer(filterSortReducer, initialState);
  const debouncedFilterText = useDebounce(state.filterText, 300);

  const filteredAndSortedUsers = useMemo(() => {
    const filteredUsers = users.filter(user => {
      const searchText = debouncedFilterText.toLowerCase();
      const valuesToCheck = [
        user.name.toLowerCase(),
        user.email.toLowerCase(),
        user.phone,
        user.website.toLowerCase(),
        user.address.street.toLowerCase(),
        user.address.suite.toLowerCase(),
        user.address.zipcode.toLowerCase(),
        user.address.city.toLowerCase(),
      ];
      return valuesToCheck.some(value => value.includes(searchText));
    });

    const sortedUsers = filteredUsers.sort((a, b) => {
      const fieldA = a[state.sortField].toLowerCase();
      const fieldB = b[state.sortField].toLowerCase();
      return state.sortDirection === "asc"
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    });

    return sortedUsers;
  }, [users, debouncedFilterText, state.sortField, state.sortDirection]);

  const handleFilterChange = useCallback((text: string) => {
    dispatch({ type: ActionKind.SET_FILTER_TEXT, payload: text });
  }, []);

  const handleSortChange = useCallback((field: "name" | "email") => {
    dispatch({ type: ActionKind.SET_SORT_FIELD, payload: field });
  }, []);

  return {
    filterText: state.filterText,
    sortField: state.sortField,
    sortDirection: state.sortDirection,
    filteredAndSortedUsers,
    handleFilterChange,
    handleSortChange,
  };
};
