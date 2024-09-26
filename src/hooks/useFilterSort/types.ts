export enum ActionKind {
  SET_FILTER_TEXT = "SET_FILTER_TEXT",
  SET_SORT_FIELD = "SET_SORT_FIELD",
  SET_SORT_DIRECTION = "SET_SORT_DIRECTION",
}

export type ActionType =
  | { type: ActionKind.SET_FILTER_TEXT; payload: string }
  | { type: ActionKind.SET_SORT_FIELD; payload: "name" | "email" }
  | { type: ActionKind.SET_SORT_DIRECTION; payload: "asc" | "desc" };

export type StateType = {
  filterText: string;
  sortField: "name" | "email";
  sortDirection: "asc" | "desc";
};
