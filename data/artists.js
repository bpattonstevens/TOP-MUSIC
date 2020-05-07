/* TOP MUSIC
 * Artists
 * ~
 */

const mongoCollections = require('../config/mongoCollections');
const ObjectId = require('mongodb').ObjectId
const artists = mongoCollections.artists;
const genres = mongoCollections.genres;

let exportedMethods = {
    async  GetAllArtists() {
        let artistsCollection = await artists();
        let artistsList = await artistsCollection.find({}).toArray();
        if (!artistsList.length) throw 'Artists is not in System';
        return artistsList;
    },
    async  GetArtistsById(id) {
        let artistsCollection = await artists();
        let artistsList = await artistsCollection.findOne({ _id: id });
        if (!artistsList) throw 'artists not found ';
        return artistsList;
    },
    async  AddArtists(artistData) {
        let artistsCollection = await artists();
        let insertArtist = await artistsCollection.insertMany(artistData);
        return true;
    },
    async removeArtist(id) {
        if (id === undefined) return Promise.reject('No id provided');
        let currentArtist= await this.getArtist(id);
        const artistCollection = await artists();
    
        const deletedInfo = await artistCollection.removeOne({_id: ObjectId(id)});
        if (deletedInfo.deletedCount === 0) throw `Could not delete artist with id of ${id}`;
    
        let output = {
          "deleted": true,
          "data": {
              "_id": currentArtist._id, 
              "artistName": currentArtist.artistName,
              "artistMembers": currentArtist.artistMembers,
              "yearFormed": currentArtist.yearFormed,
              "genres": currentArtist.genres,
              "recordLabel": currentArtist.recordLabel,
              "albums": currentArtist.albums
        }
      };
      return output;
    },
    async updateArtist(id, artistName, artistMembers, yearFormed, genres, recordLabel, albums) {
        if (id === undefined) return Promise.reject('No id provided');
        if (artistName === undefined) return Promise.reject('No artist name provided');
        if (artistMembers === undefined) return Promise.reject('No artist members provided');
        if (yearFormed === undefined) return Promise.reject('No year formed provided');
        if (genres === undefined) return Promise.reject('No genres provided');
        if (recordLabel === undefined) return Promise.reject('No record label provided');
    
        const artistCollection = await artists();
        // const userThatPosted = await users.getUserById(posterId);
    
        let updatedArtist = {
            artistName: artistName,
            artistMembers: artistMembers,
            yearFormed: yearFormed,
            genres: genres,
            recordLabel: recordLabel,
            alubms: albums
        };

        const updateInfo = await artistCollection.updateOne({_id: ObjectId(id)}, {$set: updatedArtist});
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
        return this.getArtistById(id);
    },
    async sortArtists() {
        /* TO DO */
        return;
    }

  };
  
  module.exports = exportedMethods;
  