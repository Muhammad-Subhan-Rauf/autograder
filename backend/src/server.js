const express = require('express');
const submitRouter = require('./routes/submitRouter');

const cors = require('cors');

const app = express();

// Enable CORS for all requests
app.use(cors());

// Enable CORS only for your frontend application
// app.use(cors({
//   origin: 'http://localhost:5173/' // Adjust this to match the origin of your frontend app
// }));

// Enable JSON body parsing middleware (must be placed before the routes)
app.use(express.json());

const port = 3000

//--------------------------------------------
// Configure Routes
//--------------------------------------------

app.use('/api', submitRouter);

// Catch-all route for undefined endpoints
app.use((req, res) => {
    res.status(404).json({
      error: 'Endpoint not found',
      message: `The requested endpoint ${req.originalUrl} does not exist.`
    });
  });
  
//--------------------------------------------

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});