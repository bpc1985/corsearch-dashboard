import { FC } from "react";
import { User } from "types";
import styles from "./UserList.module.scss";

interface UserListProps {
  users: User[];
}

export const UserList: FC<UserListProps> = ({ users }) => {
  return (
    <div className={styles.userList}>
      {users.map(user => (
        <div key={user.id} className={styles.userCard}>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>
            Address: {user.address.street}, {user.address.suite},{" "}
            {user.address.city}, {user.address.zipcode}
          </p>
        </div>
      ))}
    </div>
  );
};
