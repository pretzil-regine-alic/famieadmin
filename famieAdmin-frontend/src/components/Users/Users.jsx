import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Users.css';

const Users = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:6192/api/users');
        const users = response.data?.users || [];
        
        // Log the data to the browser console
        console.log("Received data in frontend:", users);

        setAllUsers(users);
        setFilteredUsers(users);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    let usersToDisplay = allUsers;
    if (searchTerm) {
      usersToDisplay = usersToDisplay.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterType === 'parent') {
      usersToDisplay = usersToDisplay.filter(user => user.type === 'Parent');
    } else if (filterType === 'child') {
      usersToDisplay = usersToDisplay.filter(user => user.type === 'Child');
    }

    setFilteredUsers(usersToDisplay);
  }, [searchTerm, filterType, allUsers]);

  return (
    <div className="users-container">
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <p>Total Active Users: {filteredUsers.length}</p>

          <div className="search-filter-container">
            <div className="form-group">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search email or username"
              />
              <label>Search email or username</label>
            </div>

            <div className="form-group">
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
              >
                <option value="all">All Users</option>
                <option value="parent">Parent</option>
                <option value="child">Child</option>
              </select>
              <label>User Type</label>
            </div>
          </div>

          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Username</th>
                  <th>User Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    <td>{user.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
