import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store/store';
import { Provider } from 'react-redux';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthLayout from './component/AuthLayout'
import {
  AddProfile,
  DashboardPage,
  EditPost,
  EditProfile,
  PostByMyFollowing,
  Homepage,
  SignUpPage,
  UpdatePassword,
  ViewProfile,
  Timeline,
  AddPost,
} from './pages/page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: (
          <AuthLayout authentication>
            <Homepage />
          </AuthLayout>
        ),
      },
      {
        path: '/account',
        element: (
          <AuthLayout authentication>
            <UpdatePassword />
          </AuthLayout>
        ),
      },
      {
        path: '/profile/:_id',
        element: (
          <AuthLayout authentication>
            <ViewProfile />
          </AuthLayout>
        ),
      },
      {
        path: '/timeline/:_id',
        element: (
          <AuthLayout authentication>
            <Timeline />
          </AuthLayout>
        ),
      },
      {
        path: '/add-profile',
        element: (
          <AuthLayout authentication>
            {' '}
            <AddProfile />
          </AuthLayout>
        ),
      },
      {
        path: '/edit-profile/:_id',
        element: (
          <AuthLayout authentication>
            {' '}
            <EditProfile />
          </AuthLayout>
        ),
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: '/following-posts',
        element: (
          <AuthLayout authentication>
            <PostByMyFollowing />
          </AuthLayout>
        ),
      },
      {
        path: '/edit-post/:_id',
        element: (
          <AuthLayout authentication>
            {' '}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: '/',
        element: <DashboardPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
