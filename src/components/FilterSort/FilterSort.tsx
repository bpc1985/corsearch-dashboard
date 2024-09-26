import { FC } from "react";
import styles from "./FilterSort.module.scss";

export interface FilterSortProps {
  filterText: string;
  onFilterChange: (text: string) => void;
  sortField: "name" | "email";
  sortDirection: "asc" | "desc";
  onSortChange: (field: "name" | "email") => void;
}

export const FilterSort: FC<FilterSortProps> = ({
  filterText,
  onFilterChange,
  sortField,
  sortDirection,
  onSortChange,
}) => {
  return (
    <div className={styles.filterSort}>
      <input
        type="text"
        placeholder="Filter users..."
        value={filterText}
        onChange={e => onFilterChange(e.target.value)}
        className={styles.filterInput}
      />
      <div className={styles.sortButtons}>
        <button
          className={`${styles.sortButton} ${
            sortField === "name" ? styles.active : ""
          }`}
          onClick={() => onSortChange("name")}
        >
          Sort by Name{" "}
          {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
        </button>
        <button
          className={`${styles.sortButton} ${
            sortField === "email" ? styles.active : ""
          }`}
          onClick={() => onSortChange("email")}
        >
          Sort by Email{" "}
          {sortField === "email" && (sortDirection === "asc" ? "↑" : "↓")}
        </button>
      </div>
    </div>
  );
};
