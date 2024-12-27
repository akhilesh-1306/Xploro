# [Xploro](https://xploro-one.vercel.app/) 

Xploro is a location-based event discovery application that allows users to explore and host events in their vicinity. The platform leverages geolocation data to filter events, ensuring users find activities within a specific range of their current location. This README provides a comprehensive overview of the project's features, architecture, and setup instructions.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Usage](#usage)
- [Contributors](#contributors)
- [License](#license)

## Features
- **User Authentication**: Secure login and registration process using JWT tokens to authenticate users and protect sensitive data.
- **Location-Based Event Filtering**:
  - Fetches the user's current geolocation and retrieves nearby events based on a specified distance (default: 75 km).
  - Uses the Haversine formula to calculate distances between the user and events, ensuring accurate results.
- **Live Location Tracking**: The application continuously fetches the user's live location and updates the event list accordingly.
- **Event Discovery**: Users can browse through a list of events filtered based on their location, providing a personalized experience.
- **Search Functionality**: Users can search for events by keywords, enhancing the discovery process.
- **In-Event Chat**: Users can communicate with other attendees of the same event through a built-in chat feature.
- **Recommendation System**: The application uses a machine learning-based recommendation system built with scikit-learn to track user clicks and provide personalized event recommendations.
- **Responsive Design**: The application is built with a mobile-first approach, ensuring a seamless experience on both desktop and mobile devices.
- **Toast Notifications**: Utilizes react-toastify for providing feedback on user actions, such as successful event fetching and errors.
- **Aesthetic UI**: The application features a sleek and modern design, with a translucent glass effect on the navbar and footer, improving visual appeal.

## Technologies Used
### Frontend:
- React.js for building the user interface
- React-Bootstrap for responsive components and styling
- react-toastify for notifications

### Backend:
- Node.js and Express for server-side logic
- MongoDB for data storage (if applicable)
- JWT for user authentication

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm (Node Package Manager)
- MongoDB (if applicable)

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/xploro.git
```

2. Navigate to the project directory:
```bash
cd xploro
```

3. Install the dependencies:
```bash
npm install
```

4. Set up your environment variables for the backend (e.g., MongoDB URI, JWT secret).

5. Start the development server:
```bash
npm start
```

### Running the Backend
If the backend is separate, follow these steps:

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install the backend dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

## Usage
1. **User Registration & Login**: Users can create an account and log in using their credentials.
2. **Location Access**: The application will request permission to access the user's geolocation.
3. **Browsing Events**: After logging in, users can view events that are filtered based on their location.
4. **Search Events**: Utilize the search bar to find specific events by keywords.
5. **Hosting Events**: Users can create and host their own events, which will also be visible to others.

## Contributors


## License
This project is licensed under the MIT License - see the LICENSE file for details.
