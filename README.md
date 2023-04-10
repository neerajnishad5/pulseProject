# BACKEND - PROJECT PULSE

### PROJECT DESCRIPTION

WAL Pulse is a tool developed and designed to make the process of maintaining projects and managing projects, based on the pariticular roles, smooth and simpler. Project Managers, Super Admin, GDO Heads and Admin who are able to login and perform specific assignments.
This is the exclusive backend of the project, access front-end here: https://github.com/neerajnishad5/front-end-pulse

### How to install WAL PULSE

Download the git repository manually or clone it by following command

```
git clone https://github.com/neerajnishad5/pulseProject
```

If you download manually extract the zip file.

then run the following command to install all the modules that are used in this project

```
  npm install
```

then start the server using below command

```
  npm start
```

### CONFIGURATION

create `.env` folder and add the following details to the `.env` file

```
DB_NAME = YOUR_DB_NAME
DB_USER = YOUR_DB_USER
DB_PASSWORD = YOUR_DB_PASSWORD
PORT = PORT
HOST = hostname
SECRET_KEY = kdsjfknvkdslfjaksdj
EMAIL_PASSWORD = EMAIL_PASSWORD (App Password)
SERVICE = SERVICE
FROM_MAIL = YOUR_EMAIL
```

Create database named `projectPulse`<br>
We assume that employee table is existing in a database so create table employee(attributes:{empId,empName}) and insert data into table

## OVERVIEW

### Roles in the project

```
1. SuperAdmin
2. Special User(Admin)
3. GDO Head(Global Delivery Organization)
4. Project Manager
5. HR Manager
```

### Tasks of the roles

#### SuperAdmin

```
 1. Get all the users.
 2. Assign roles to the Employees.
```

#### Admin

```
 1. Get all the projects in an organization
 2. Get detailed view of a project (Detailed overview: project fitness indicator, team and concern count, project concerns, project updates, team composition)
 3. Create a project
 4. Get the resourcing requests
 5. Update the existing project
 6. Delete existing project(soft delete)
 7. Get all the concerns
```

#### GDO HEAD (Global Delivery Organization)

```
 1. Get all projects under GDO
 2. Get detailed view of a project (Detailed overview: project fitness indicator, team and concern count, project concerns, project updates, team composition)
 3. Assign a project to employee
 4. Update a project
 5. Delete employee from the project
 6. Raise resource requests
```

#### Project Manager

```
 1. Raise project updates
 2. Raise project concerns
 3. Get all the projects under project manager
 4. Get detailed view of a project (Detailed overview: project fitness indicator, team and concern count, project concerns, project updates, team composition)
```
