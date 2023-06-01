# hashims_sql_employee_tracker

Employee tracker is designed to store and manage employee information for a company or organization. It provides a convenient way to track employee data, such as personal details, job information, and departmental assignments.

# Usage
To use the Employee Tracker MySQL2 Database, you need to follow these steps:

Ensure you have MySQL installed on your system. If not, download and install it from the official MySQL website.

Import any initial data or insert it manually as needed.

Configure the database connection parameters in your application or script. Make sure to provide the correct host, port, username, password, and database name.

Adding new employees, departments, and roles
Updating employee information, such as their job title or department assignment
Deleting employees, departments, and roles
Retrieving employee details based on different criteria, such as department, manager, or job title
To interact with the database, you can use SQL queries or build an application that connects to the database using a MySQL2 client library and provides a user-friendly interface to perform these operations.

# Database Structure
The Employee Tracker MySQL2 Database consists of the following tables:

employees: This table stores employee information, including their unique ID, name, email address, job title, department ID, and manager ID.

departments: This table contains department details, including the department ID and name.

roles: The roles table stores job roles within the organization, including the role ID, title, and salary.

The database employs relationships between tables using foreign keys to establish associations. For example:

The employees table has a foreign key column referencing the roles table (role ID) and the departments table (department ID).
The departments table has a foreign key column referencing the employees table (manager ID).

# License 
N/A


# ScreenShot


![ScreenShot](./assets/img/screenshot%20module%2012.jpg)



