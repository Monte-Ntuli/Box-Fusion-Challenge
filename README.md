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
   - Set the action for both the frontend and the backend (C# API) to **Start**.

4. **Build the Solution**:
   - Go to **Build** > **Build Solution** or press `Ctrl + Shift + B`. This compiles your project and checks for any errors.

5. **Run the Project**:
   - Click on the green **Start** button (or press `F5`) to run the project. This will launch both the frontend and backend (if configured).
   - If the backend is set up correctly, the frontend should be accessible via the configured URL, usually [https://localhost:5173](http://localhost:5173) for the React app.

6. **Access the Application**:
   - Open your web browser and navigate to the specified URL (e.g., [https://localhost:5173](https://localhost:5173)) to view and interact with the frontend.

7. **Access the API in Swagger**: https://localhost:7222/swagger/index.html
   - Open your web browser and navigate to the specified URL (e.g., [https://localhost:7222/swagger/index.html](https://localhost:7222/swagger/inddex.html)) to view and interact with the backend.
  

## Restoring the EmployeesDB.bak File

To restore the `EmployeesDB.bak` file in SQL Server Management Studio (SSMS), follow these steps:

1. **Open SQL Server Management Studio (SSMS)**:
   - Launch SSMS on your machine.

2. **Connect to Your SQL Server Instance**:
   - In the **Connect to Server** dialog, select your server type (usually **Database Engine**) and enter the server name.
   - Click **Connect**.

3. **Open the Restore Database Dialog**:
   - In the Object Explorer, right-click on the **Databases** node and select **Restore Database**.

4. **Select the Source for Restore**:
   - In the **Restore Database** window, select **Device** under the **Source** section.
   - Click on the **...** (ellipsis) button to open the **Select backup devices** dialog.

5. **Add the Backup File**:
   - In the **Select backup devices** dialog, click **Add**.
   - Navigate to the location of your `EmployeesDB.bak` file and select it. Click **OK**.

6. **Choose the Database to Restore**:
   - Back in the **Restore Database** dialog, the **Database** field should automatically populate with the name from the backup. You can change this if you want to restore it under a different name.
   - Ensure that the **Backup sets to restore** section has the appropriate backup checked.

7. **Restore Options**:
   - Go to the **Options** page on the left panel.
   - Here, you can choose to overwrite the existing database if you want to restore to an existing database by checking the **Overwrite the existing database (WITH REPLACE)** option.
   - Adjust other options according to your requirements, such as moving the database files to a different location if necessary.

8. **Execute the Restore**:
   - Click **OK** to start the restore process.
   - SSMS will show a message once the restore is complete. If there are any errors, they will also be displayed here.

9. **Verify the Database**:
   - After restoring, you should see the newly restored database listed under the **Databases** node in Object Explorer.
   - You can expand the database node to view its tables and other objects.

