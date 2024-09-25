const db = require('../config/db');

// get lahat ng songs
exports.getAllMusic = (callback) => {
    const query = 'SELECT * FROM music_files';
    db.query(query, (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};

// pag aadd sa database
exports.insertMusic = ({ songName, author, musicFilePath, pictureFilePath, lyrics }, callback) => {
    const query = 'INSERT INTO music_files (file_path, song_name, author, picture_path, lyrics) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [musicFilePath, songName, author, pictureFilePath, lyrics], (err, results) => {
        callback(err, results);
    });
};

// select ang info ng = sa id
exports.getMusicById = (id, callback) => {
    const query = 'SELECT * FROM music_files WHERE id = ?'; // Use the correct column name for the ID
    db.query(query, [id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0]); // Return the first result
    });
};


// update ng song
exports.updateSong = (songId, updatedData) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE music_files SET song_name = ?, author = ?, lyrics = ? WHERE id = ?';
        const params = [updatedData.song_name, updatedData.author, updatedData.lyrics, songId];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results); // Resolve the promise on success
        });
    });
};



// mag add sa playlist
exports.addToPlaylist = (song_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO playlisttable (song_id) VALUES (?)';
        db.query(sql, [song_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};




// Delete song from both playlist and music_files tables
exports.deleteSong = (songId, callback) => {
    const deleteFromPlaylistQuery = `DELETE FROM playlisttable WHERE song_id = ?`;
    db.query(deleteFromPlaylistQuery, [songId], (err) => {
        if (err) {
            console.error('Error deleting from playlist table:', err);
            return callback(err); // Return error to callback
        }
        console.log('Deleted from playlisttable');

        const deleteFromMusicFilesQuery = `DELETE FROM music_files WHERE id = ?`;
        db.query(deleteFromMusicFilesQuery, [songId], (err) => {
            if (err) {
                console.error('Error deleting from music files:', err);
                return callback(err); // Return error to callback
            }
            console.log('Deleted from music_files');
            callback(null); // Notify success
        });
    });
};












exports.getSongsByPlaylistId = (playlistId, callback) => {
    if (typeof callback !== 'function') {
        throw new Error('Callback is not a function');
    }

    const query = 'SELECT * FROM playlisttable WHERE playlist_id = ?';
    connection.query(query, [playlistId], (error, results) => {
        if (error) {
            console.error('Query error:', error);
            return callback(error);
        }
        callback(null, results);
    });
};

exports.getSongsplaylist = (callback) => {
    const query = `
    SELECT mf.id, mf.song_name, mf.author, mf.picture_path
    FROM playlisttable AS pt 
    JOIN music_files AS mf ON pt.song_id = mf.id;`; // Removed the unnecessary comma and WHERE clause
    db.query(query, (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};


exports.removePlaylist = (id, callback) => {
    const query = 'DELETE FROM playlisttable WHERE song_id = ?';

    db.query(query, [id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};

    // Additional methods for adding/updating/deleting songs can go here