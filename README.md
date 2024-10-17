# Box Fusion Challenge

## Description

The Box Fusion Challenge is a web application designed to manage employee records. 
It allows users to create, read, update, and delete employee information, including personal details and skills. 
The application is built using React for the front-end and integrates with a C# API for data management.

### Features

- **Employee Management**: Add, edit, view, and delete employee records.
- **Search Functionality**: Search employees by name or email.
- **Filter Options**: Filter employees based on different criteria (e.g., Date of Birth, Skills).
- **Responsive Design**: A user-friendly interface that adapts to various screen sizes.

## Technologies Used

- React
- TypeScript
- Semantic UI React
- Axios (for API calls)
- C# (for backend API)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Monte-Ntuli/Box-Fusion-Challenge.git

2. Navigate to the project directory:
   
   ```bash
   cd Box-Fusion-Challenge/employeemanager.client

4. Install the dependencies:

   ```bash
   npm install


## Running the Project Using Visual Studio

1. **Open the Solution File**:
   - Launch **Visual Studio**.
   - Go to **File** > **Open** > **Project/Solution...**.
   - Navigate to your project directory and select the `.sln` file (e.g., `EmployeeManager.sln`).

2. **Restore NuGet Packages**:
   - In the **Solution Explorer**, right-click on the solution (the top-level node) and select **Restore NuGet Packages**. This will download any dependencies required for your C# API.

3. **Set the Startup Projects**:
   - Right-click on the solution in **Solution Explorer** and select **Properties**.
   - In the **Common Properties** section, go to **Startup Projects**.
   - Select **Multiple startup projects**.
   - Set the action for both the frontend (if it's in the same solution) and the backend (C# API) to **Start**.

4. **Build the Solution**:
   - Go to **Build** > **Build Solution** or press `Ctrl + Shift + B`. This compiles your project and checks for any errors.

5. **Run the Project**:
   - Click on the green **Start** button (or press `F5`) to run the project. This will launch both the frontend and backend (if configured).
   - If the backend is set up correctly, the frontend should be accessible via the configured URL, usually [https://localhost:5173](http://localhost:5173) for the React app.

6. **Access the Application**:
   - Open your web browser and navigate to the specified URL (e.g., [https://localhost:5173](https://localhost:5173)) to view and interact with the application.
