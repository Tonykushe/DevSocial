# DevSocial

> Small social network app built with the MERN stack. 
> Link to live website https://boiling-thicket-34606.herokuapp.com
> Building an extensive backend API with Node.js & Express
> Protecting routes/endpoints with JWT (JSON Web Tokens)
> Integrating React with the backend in an elegant way, creating a great workflow
> Uses Redux for app state management


## Quick Start

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

You will need to create a keys.js in the server config folder with

```
module.exports = {
  mongoURI: 'YOUR_OWN_MONGO_URI',
  secretOrKey: 'YOUR_OWN_SECRET'
};
```

## App Info

### Author

Tony Mugendi

### Version

1.0.0

### License

This project is licensed under the MIT License
