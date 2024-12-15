# Chat Application Documentation

## Chat-App (November 2024)

![Untitled design](https://github.com/user-attachments/assets/c8569b09-2ba9-4e35-b6f8-7acfdcdd3e03)

**[Github](https://github.com/anish877/chatapp-react)** | **[Live Preview](https://chatapp-react-hwka.onrender.com/)**

Designed and built a realtime chatting app using React, Tailwind CSS, and Socket.io within a monorepo structure, enabling seamless communication. This application ensures secure and efficient messaging through robust backend and frontend integration.

---

## Overview

The Chat-App is a modern realtime chatting application designed for seamless communication. The project leverages React for a dynamic user interface, Tailwind CSS for responsive design, and Socket.io for real-time communication. Key features include user authentication, instant messaging, and media sharing. The backend integrates MongoDB for database management and Cloudinary for image storage. The monorepo structure ensures modular development, facilitating scalability and maintainability.

---

## Pages

### 1. Login Page

<img width="1512" alt="Screenshot 2024-12-15 at 6 38 57 PM" src="https://github.com/user-attachments/assets/c893ce25-2a5c-40f9-947d-f012e7724075" />


#### Overview

The Login Page allows users to securely log in using their credentials. JSON Web Tokens (JWT) are used to manage authentication securely.

#### Design

- A clean and intuitive form for entering email and password.
- Responsive design with Tailwind CSS.

#### Components

1. **Login Form**: Accepts user email and password.
2. **Submit Button**: Validates credentials and sends them to the backend.
3. **Error Notification**: Displays error messages for failed login attempts.

#### Backend (APIs)

- **Endpoint**: `/api/auth/login`
- **Request Format**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Successful Response**:
  ```json
  {
    "token": "eyJhbGci...",
    "user": {
      "id": "12345",
      "name": "John Doe"
    }
  }
  ```
- **Failed Response**:
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

---

### 2. Signup Page

<img width="1512" alt="Screenshot 2024-12-15 at 6 39 10 PM" src="https://github.com/user-attachments/assets/6ce0c9d3-d56d-4b06-b7f5-d76b68b7a2ca" />


#### Overview

The Signup Page enables new users to register an account by providing their details. Authentication tokens are generated upon successful signup.

#### Design

- A form for entering name, email, password, and profile picture.
- Integrated Cloudinary for profile image uploads.

#### Components

1. **Signup Form**: Fields for user details and profile image.
2. **Upload Button**: Uploads the profile picture to Cloudinary.
3. **Submit Button**: Sends user details to the backend.

#### Backend (APIs)

- **Endpoint**: `/api/auth/signup`
- **Request Format**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword",
    "profileImage": "https://cloudinary.com/image"
  }
  ```
- **Successful Response**:
  ```json
  {
    "message": "Signup successful",
    "user": {
      "id": "12345",
      "name": "John Doe"
    }
  }
  ```
- **Failed Response**:
  ```json
  {
    "error": "Email already exists"
  }
  ```

---

### 3. Chat Page

<img width="1512" alt="Screenshot 2024-12-15 at 6 40 00 PM" src="https://github.com/user-attachments/assets/fe2b529d-5b87-4f25-a15d-52d0dc82a4ba" />
<img width="1512" alt="Screenshot 2024-12-15 at 6 40 38 PM" src="https://github.com/user-attachments/assets/b6deb6aa-265e-420a-96fa-7533e4a403d0" />
<img width="1512" alt="Screenshot 2024-12-15 at 6 40 49 PM" src="https://github.com/user-attachments/assets/3d86952b-24e9-4164-877b-f6420cc717d2" />

#### Overview

The Chat Page is the core feature of the application, enabling users to send and receive messages in real time. It includes user presence tracking and media sharing capabilities.

#### Design

- A chat window displaying messages in a conversational format.
- Input field for text messages and an option for image uploads.
- User presence indicators.

#### Components

1. **Message List**: Displays all messages in chronological order.
2. **Message Input**: Allows users to type and send text messages.
3. **File Upload Button**: Uploads images to Cloudinary for sharing.
4. **User List**: Shows online/offline status of users.

#### Backend (APIs)

- **Send Message API**:

  - **Endpoint**: `/api/chat/send`
  - **Request Format**:
    ```json
    {
      "senderId": "12345",
      "receiverId": "67890",
      "message": "Hello!",
      "mediaUrl": "https://cloudinary.com/image"
    }
    ```
  - **Successful Response**:
    ```json
    {
      "message": "Message sent successfully"
    }
    ```
  - **Failed Response**:
    ```json
    {
      "error": "Failed to send message"
    }
    ```

- **Retrieve Messages API**:

  - **Endpoint**: `/api/chat/messages`
  - **Request Format**:
    ```json
    {
      "userId": "12345",
      "chatId": "67890"
    }
    ```
  - **Response**:
    ```json
    [
      {
        "senderId": "12345",
        "message": "Hello!",
        "timestamp": "2024-11-01T10:00:00Z"
      },
      {
        "senderId": "67890",
        "message": "Hi!",
        "timestamp": "2024-11-01T10:01:00Z"
      }
    ]
    ```

---

## Conclusion

The Chat-App is a comprehensive, realtime communication platform, designed with scalability and user experience in mind. The integration of robust technologies like React, Tailwind CSS, Socket.io, MongoDB, and Cloudinary ensures high performance and ease of use.

