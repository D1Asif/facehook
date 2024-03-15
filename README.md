# Facehook - A Social media app
This is a simplified version of a social media app like Facebook.

## Features
1. Authentication: registration, login implemented by JWT based authentication. When the authToken is expired, the app automatically generates a new authToken using refreshToken without suddenly expiring the session. This provides a seamless user expereince. However, the auth tokens are stored in context api, so reloading the website would flush the memory and need to login again.
2. Post: User can create a post with text content and image. Can edit and delete the post. Like/unlike and comment a post. See others comment in the post.
3. Profile Page: User can upload a display picture. If there is no DP, the first letter of the user is shown as the DP. Can edit the bio. User can find all the user's post in the profile page sorted to the latest post first.
4. Home Page: All the posts of all the users are displayed in the feed of the home page. Posts are sorted to the latest post first. User can edit/delete user's own post.

## Technologies used:
React, React router dom, axios, react hook form, vercel etc.

## How to run
1. clone the repo into your machine
2. Open the terminal in the backend-server folder and run ```npm run dev ```. This will start the server.
3. Then visit the website [link](https://facehook-phi.vercel.app/). You'll find the website up and running with full functionalities.
