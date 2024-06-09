# TinyUrl Service

TinyUrl is a URL shortening service designed for business clients who publish links to landing pages and internet files. This service allows users to create shortened URLs that are user-friendly and easy to share. Additionally, TinyUrl provides tracking capabilities to monitor the number of clicks on each shortened link and the exposure level across different sources.


## Features

- **Shortening**: Generate short, user-friendly URLs from long original URLs.
- **Tracking**: Track the number of clicks on each shortened URL.
- **Targeting**: Define multiple sources (targets) for each link to analyze exposure from different channels.

## Architecture

- **Server**: Node.js
- **Database**: MongoDB

## Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/TinyUrlProject.git
    cd TinyUrlProject
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Configure environment variables**
    Create a `.env` file in the root directory and add the following:
    ```env
    MONGODB_URI=mongodb://localhost:27017/tinyurl
    PORT=3000
    ```

4. **Start the server**
    ```bash
    npm start
    ```

## Usage

Once the server is running, you can interact with the API using tools like Postman or through your frontend application.

## API Endpoints

- **Create User**
    ```
    POST /users
    {
      "name": "John Doe",
      "email": "778.aee@exa9mple000.com",
      "password": "password123",
      "links": [
        {
          "originalUrl": "https://exam7ple.com"
      
        },
        {
          "originalUrl": "https://anothe7r-example.com"
      
        }
    ]}

- **Get Original URL and Redirect**
    ```
    GET /:shortId
    ```

- **Get Click Stats**
    ```
    GET /links/:linkId/clicks
    ```

## Database Schema

### User Schema
```javascript


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "new user"
    },
    email: {
        type: String,
        required: true,
        default: "admin123@gmail.com",
        unique: true  // Adding a unique constraint for better data integrity
    },
    password: {
        type: String,
        required: true,
        default: "123456",
        unique: true 
    },
    links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }]
});
```

### Link Schema
```javascript

const clickSchema = new mongoose.Schema(
  {
    insertedAt: {
      type: Date,
      default: Date.now,
    },
    ipAddress: {
      type: String,
      default: "0.0.0.0",
    },
    targetParamValue: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const LinkSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },

  clicks: [clickSchema],
  targetParamName: String, // Add the targetParamName field
  targetValues: [
    {
      name: String,
      value: String,
    },
  ],
});



```
### License
This project is licensed under the MIT License - see the LICENSE file for details.

Replace `"yourusername"` in the clone URL with your actual GitHub username. This README file provides an overview of your project, installation instructions, API usage, and contribution guidelines, making it easy for others to understand and contribute to your project
"# project-tinyURL" 
