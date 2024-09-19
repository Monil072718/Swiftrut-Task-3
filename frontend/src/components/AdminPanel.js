import React, { useEffect, useState, useContext } from 'react';
import { getAllTasks, getAllUsers } from '../api'; // Make sure you have these functions in your API file
import { AuthContext } from '../auth';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';

const AdminPanel = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch all tasks for the admin
  useEffect(() => {
    const fetchAllTasks = async () => {
      const fetchedTasks = await getAllTasks(token);
      setTasks(fetchedTasks);
    };

    const fetchAllUsers = async () => {
      const fetchedUsers = await getAllUsers(token);
      setUsers(fetchedUsers);
    };

    fetchAllTasks();
    fetchAllUsers();
  }, [token]);

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Admin Panel
      </Typography>

      <Typography variant="h5" component="h3" gutterBottom>
        All Tasks
      </Typography>
      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {task.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Assigned to: {task.assignedTo ? task.assignedTo.name : 'Unassigned'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" component="h3" gutterBottom>
        All Users
      </Typography>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {user.name} ({user.role})
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminPanel;
