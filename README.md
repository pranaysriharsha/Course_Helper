Course Helper

This application allows users to manage courses by creating, updating, deleting, and viewing courses. Additionally, logged-in users can maintain their personal course list and add new courses to it.

Features

1. Home Page

Displays all available courses in the body of the page.

App Bar:

Login Button: Redirects users to the login page.

Drawer Options:

Login: Navigates to the login page.

My Courses - Login: Navigates to the login page if the user is not logged in.

Home: Displays all courses currently available.

2. Course Details

When a course card is clicked, a detailed view of the course is shown:

Details Shown:

Course Name

Course Code

Course Credits

Course Description

Image URL

Buttons:

Update: Updates the course details with the current form data. This activity is done by authorized users only.

Delete: Deletes the course from the database. This activity is done by authorized users only.

Close: Closes the course details view.

3. Add Course

Add Course Button: Opens a form where users can input details of a new course. This activity is done by authorized users only.

Form Fields:

Course Name

Course Code

Course Credits

Course Description

Image URL

Save Button: Adds the new course to the database.

4. Login Functionality

Login Page: Allows users to log in or register if they don't have an account.

Once logged in:

The Login Button in the app bar changes to a Logout Button.

5. My Courses (Logged-In Users)

My Courses Tab: Displays the logged-in user's courses.

Add to My Courses Button:

Prompts the user to enter a course code.

Adds the course to the user's personal course list if valid.

Navigation Overview

Home Page: Displays all courses.

Login Page: Accessible via the Login button or "My Courses - Login" in the drawer when not logged in.

My Courses Tab:

Shows the user's courses when logged in.

Allows adding courses to the user's list via course code.

Technical Details

The application uses a frontend-backend architecture.

Authentication: JWT-based login and session management.

Frontend Features:

React Router for navigation.

Axios for API calls.

Backend:

Built using Express.js.

Handles CRUD operations for courses and manages user authentication and course associations.

How to Use

Launch the application.

View all courses on the home page.

Use the Login button to log in or register.

Once logged in:

View and manage your courses in the My Courses tab.

Add courses to your list using the Add to My Courses button.

Use the Add Course button to create new courses.

Click on a course card to view or update its details, or delete it entirely.

Logout when finished.

Enjoy managing your courses efficiently!
