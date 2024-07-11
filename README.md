
# Social-Connect

![Screenshot](https://github.com/lightning-sagar/Social-Connect/assets/139375536/20bb2465-cadd-485f-a658-c2267add35ec)

## Project Overview
Social-Connect is a versatile social media application that allows users to tweet, chat with other users, and follow them. The application is built using modern web technologies and provides a seamless and interactive user experience.

## Features
- **Tweeting**: Post tweets that can be viewed by followers.
- **Chatting**: Real-time chat with other users.
- **Following**: Follow other users to see their tweets and get updates.

## Getting Started

### Prerequisites
Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) (v6.0.0 or higher)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
   or **unzip** the project folder.

2. **Navigate to the project directory**:
   ```bash
   cd Social-Connect
   ```

3. **Install backend dependencies**:
   ```bash
   npm install
   ```

4. **Install frontend dependencies**:
   ```bash
   npm install --prefix Frontend
   ```

### Running the Project

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

### Directory Structure
- **Backend**: Contains all server-side code, API endpoints, and database models.
- **Frontend**: Contains all client-side code, components, and styling.

### Environment Variables
Make sure to set up the necessary environment variables in a `.env` file at the root of the project. Example:
```env
PORT=3000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_URL=<your-cloudinary-url>
```

### Technologies Used
- **Backend**: Node.js, Express.js, Mongoose, JWT, bcryptjs, Multer
- **Frontend**: React, Vite, Socket.io

## Contributing
We welcome contributions! Please fork the repository and submit pull requests for any features, bug fixes, or improvements.

## Contact
For any inquiries, please reach out to [lightningsagar0@gmail.com].

