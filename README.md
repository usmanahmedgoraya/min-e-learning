# Mini e-learning APP

This documentation provides comprehensive guidelines on setting up the project locally and understanding the UI structure.

---

## 1. How to Set Up the Project Locally

Follow these steps to set up and run the project on your local machine.

### Prerequisites
Ensure you have the following installed:
- **Node.js 23** (Latest LTS recommended)
- **Yarn** or **npm**
- **Git**
- **Next.js 15**
- **Reactjs 19**

### Installation Steps

1. **Clone the Repository**
   ```sh
   git clone https://github.com/usmanahmedgoraya/min-e-learning.git
   cd min-e-learning
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

## 2. Deployment

The application is deployed and can be accessed at:

- **Frontend (Next.js) Deployment:** [Live URL](https://your-frontend-deployment-link.com)
- **Backend API:** [API URL](https://your-backend-api-link.com)

---

## 3. UI Structure

The application consists of several core UI components.

### **Navbar**
- The navbar includes navigation links to different sections such as:
  - Home
  - Featured Courses
  - Course List
  - Contact
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
- The backend is already set up with all auth-related screens, but frontend-only reset password screens are implemented.
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

## 4. Project Dependencies

This project uses the following dependencies:

```json
{
  "dependencies": {
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.1.2",
    "@radix-ui/react-tabs": "^1.1.3",
    "@reduxjs/toolkit": "^2.6.1",
    "@tanstack/react-query": "^5.69.0",
    "@tanstack/react-query-devtools": "^5.69.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.6.0",
    "js-cookie": "^3.0.5",
    "lucide-react": "^0.483.0",
    "next": "15.2.4",
    "next-themes": "^0.4.6",
    "postcss": "^8.5.3",
    "react": "^19.0.0",
    "react-countup": "^6.5.3",
    "react-dom": "^19.0.0",
    "react-fast-marquee": "^1.6.5",
    "react-hook-form": "^7.54.2",
    "react-intersection-observer": "^9.16.0",
    "react-redux": "^9.2.0",
    "sonner": "^2.0.1",
    "tailwind-merge": "^3.0.2",
    "tailwindcss-animate": "^1.0.7",
    "tw-animate-css": "^1.2.4",
    "use-debounce": "^10.0.4",
    "zod": "^3.24.2"
  }
}
```

---

## 5. Development Scripts

The project includes the following scripts:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

To start the development server, run:

```sh
npm run dev
```

To build and start the project:

```sh
npm run build
npm run start
```

---

### 🚀 **Next Steps**
- Implement API for contact form submission.

---
For further assistance, reach out to the project maintainer.
