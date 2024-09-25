const express = require('express');
const bodyParser = require('body-parser');
const musicRoutes = require('./routes/musicRoutes');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // To serve static files (music)
app.set('view engine', 'ejs');
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Routes
app.use('/', musicRoutes);

// Server listen
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
