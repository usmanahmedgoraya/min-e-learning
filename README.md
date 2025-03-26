# Next.js Docs - Job Crack Task

This documentation provides comprehensive guidelines on setting up the project locally and understanding the UI structure.

---

## 1. How to Set Up the Project Locally

Follow these steps to set up and run the project on your local machine.

### Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS recommended)
- **Yarn** or **npm**
- **Git**
- **Next.js**

### Installation Steps

1. **Clone the Repository**
   ```sh
   git clone https://github.com/usmanahmedgoraya/min-e-learning.git
   cd your-repo
   ```

2. **Install Dependencies**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**
   - Create a `.env.local` file in the root directory.

4. **Run the Development Server**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
   This starts the Next.js development server at `http://localhost:3000/`.

5. **Build for Production (Optional)**
   ```sh
   npm run build
   npm run start
   ```
   The project will be available at `http://localhost:3000/`.

---

## 2. UI Structure

The application consists of several core UI components.

### **Navbar**
- The navbar includes navigation links to different sections such as:
  - Home
  - Featured Courses
  - Course List
  - Contact
  - User Profile (if logged in)
- Responsive design with a hamburger menu on mobile screens.

### **Featured Courses**
- A section showcasing top-rated or trending courses.
- Each course card displays:
  - Course Image
  - Title
  - Instructor Name
  - Rating
  - Price

### **Course List with Search & Filter**
- Displays all available courses in a grid or list format.
- Users can:
  - Search by course name, instructor, or keyword.
  - Filter by category, price range, and rating.
  - Sort results by relevance, newest, or highest rated.

### **Course Detail Page**
- Displays full details of a selected course, including:
  - Course Title and Description
  - Instructor Details
  - Course Curriculum
  - User Reviews and Ratings
  - Enrollment Button
- Related courses section suggesting similar courses.

### **User Authentication**
- Users can register and log in using their email and password.
- Email verification is required before accessing full account functionalities.
- The backend is already set up with all auth related screen, but frontend-only reset password screens are implemented.
- Authentication pages include:
  - Login Page
  - Registration Page
  - Email Verification Page
  - Forgot Password Page
  - Reset Password Page

### **Contact Us Page**

- A form allowing users to send inquiries or feedback.
- Fields include:
  - Name
  - Email
  - Subject
  - Message
- Displays a confirmation message after successful submission.

---

### 🚀 **Next Steps**
- Integrate authentication with the backend.
- Implement API for contact form submission.
- Enhance UI/UX with animations and better responsiveness.

