import { UserList } from "components/UserList";
import { FilterSort } from "components/FilterSort";
import { useUsers } from "hooks/useUsers/useUsers";
import { useFilterSort } from "hooks/useFilterSort/useFilterSort";
import styles from "App.module.scss";

const App = () => {
  const { users, isLoading, error } = useUsers();

  const {
    filterText,
    sortField,
    sortDirection,
    filteredAndSortedUsers,
    handleFilterChange,
    handleSortChange,
  } = useFilterSort(users);

  if (isLoading) {
    return <div className={styles.loading}>Loading users...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.app}>
      <h1>User Dashboard</h1>
      <FilterSort
        filterText={filterText}
        onFilterChange={handleFilterChange}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />
      <UserList users={filteredAndSortedUsers} />
    </div>
  );
};

export default App;
