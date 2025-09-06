  const express = require('express');
  const cors = require('cors');
  const app = express();
  const PORT = process.env.PORT || 3001; 

  const allowedOrigins = [
    "https://77957f67-950a-4a25-bd9d-326f9600c935-00-2y0ezv4bbx8y.kirk.replit.dev:5173"
  ];

  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
  }));
  app.use(express.json());

  let places = [
    {
      id: 1,
      name: "Santorini",
      country: "Greece",
      description: "Beautiful white and blue architecture with stunning sunsets over the Aegean Sea",
      visited: true
    },
    {
      id: 2,
      name: "Kyoto",
      country: "Japan",
      description: "Ancient temples, traditional gardens, and historic geisha districts",
      visited: false
    },
    {
      id: 3,
      name: "Machu Picchu",
      country: "Peru",
      description: "Ancient Incan citadel set high in the Andes Mountains",
      visited: false
    },
    {
      id: 4,
      name: "Northern Lights",
      country: "Iceland",
      description: "Spectacular aurora borealis dancing across the Arctic sky",
      visited: true
    },
    {
      id: 5,
      name: "Great Barrier Reef",
      country: "Australia",
      description: "World's largest coral reef system with incredible marine biodiversity",
      visited: false
    }
  ];

  // Get all places
  app.get('/places', (req, res) => {
    res.json({ 
      success: true,
      count: places.length,
      data: places 
    });
  });

  // Add a new place
  app.post('/places', (req, res) => {
    if (!req.body.name || !req.body.country || !req.body.description) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, country and description"
      });
    }

    // Generate unique ID (handles deletions too)
    const newId = places.length > 0 ? Math.max(...places.map(p => p.id)) + 1 : 1;

    const newPlace = {
      id: newId,
      name: req.body.name,
      country: req.body.country,
      description: req.body.description,
      visited: false
    };

    places.push(newPlace);

    res.json({
      success: true,
      data: newPlace,
      message: "Place added successfully!"
    });
  });

app.delete('/places/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // find index of place
  const index = places.findIndex(place => place.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Place not found"
    });
  }

  // remove the place
  const deleted = places.splice(index, 1);

  res.json({
    success: true,
    data: deleted[0],
    message: "Place deleted successfully!"
  });
});

app.put('/places/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const place = places.find(p => p.id === id);

  if (!place) {
    return res.status(404).json({
      success: false,
      message: "Place not found"
    });
  }

  // Update fields if provided
  if (req.body.name !== undefined) place.name = req.body.name;
  if (req.body.country !== undefined) place.country = req.body.country;
  if (req.body.description !== undefined) place.description = req.body.description;
  if (req.body.visited !== undefined) place.visited = req.body.visited;

  res.json({
    success: true,
    data: place,
    message: "Place updated successfully!"
  });
});



  app.listen(PORT, () => {
    console.log(`🌍 Travel Bucket List Server running on port ${PORT}`);
  });
