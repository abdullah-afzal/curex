# CureX

**CureX** is a desktop Content Management System (CMS) application designed for clinics to manage their users, doctors, and other administrative tasks. Built with Tauri, React, and Rust, this application offers a seamless experience with a focus on security, user management, and ease of use.

## Features

- **Sign In**: Secure sign-in for both admins and general users.
- **Admin Dashboard**: Admin users can manage users, doctors, and settings.
- **General Dashboard**: Non-admin users can view and manage their personal information.
- **User Management**: Admins can view, create, and delete users.
- **Doctor Management**: Admins can manage doctor records.
- **Settings**: Users can update their passwords and other personal details.
  
### Upcoming Features

- **Invoice Generation**: The system will soon include functionality for generating invoices for clinic services, allowing users to easily create and manage invoices for patients.
- **Appointment Scheduling**: A feature to schedule and manage appointments for both patients and doctors will be added.
- **Patient Management**: The ability to add, view, and update patient records, with integration to other modules like appointment scheduling and invoicing.
- **Reporting & Analytics**: Admins will be able to generate reports for clinic activities, such as patient visits, revenue, and doctor performance.
- **Notifications**: Automated notifications for patients and doctors regarding upcoming appointments, invoice due dates, and other important clinic-related events.

## Technologies

- **Frontend**: React
- **Backend**: Rust (via Tauri)
- **Database**: Local file-based storage using JSON for user management

## Installation

### Prerequisites

- **Rust**: Ensure you have Rust installed. You can install it from [https://www.rust-lang.org/](https://www.rust-lang.org/).
- **Node.js**: Required for building and running the frontend. Install it from [https://nodejs.org/](https://nodejs.org/).
- **Tauri**: Tauri CLI to build the desktop app. You can install it by running:

  ```bash
  cargo install tauri-cli
  ```

### Clone the Repository

```bash
git clone https://github.com/abdullah-afzal/curex.git
cd curex
```

### Install Frontend Dependencies

Navigate to the frontend directory and install the required packages:

```bash
cd frontend
npm install
```

### Build the Tauri Application

Run the following command to build the application:

```bash
cargo tauri dev
```

This will start the Tauri application in development mode, allowing you to see changes immediately.

## Usage

### Sign In

- Admin users can log in with predefined credentials.
- Non-admin users can log in with their username and password.

### Admin Dashboard

Once logged in, admins can access the dashboard where they can:
- View, create, and delete users.
- Manage doctors' records.
- Update settings and manage clinic details.

### General Dashboard

General users can:
- View their personal information.
- Update their password.

### Settings

In the settings section, users can:
- Change their password and update their profile.


## Contributing

If you'd like to contribute to the project, feel free to fork the repository and create a pull request. Please ensure that all contributions follow the project's coding style and guidelines.