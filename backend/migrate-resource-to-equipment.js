const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected for migration!');
  runMigration();
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

async function runMigration() {
  try {
    const db = mongoose.connection.db;
    const bookingsCollection = db.collection('bookings');

    // Find all bookings that have 'resource' field but empty 'equipment' field
    const bookingsToUpdate = await bookingsCollection.find({
      resource: { $exists: true, $ne: [] },
      $or: [
        { equipment: { $exists: false } },
        { equipment: [] }
      ]
    }).toArray();

    console.log(`\nFound ${bookingsToUpdate.length} bookings to migrate`);

    if (bookingsToUpdate.length === 0) {
      console.log('✅ No bookings need migration. All done!');
      process.exit(0);
      return;
    }

    let migratedCount = 0;
    for (const booking of bookingsToUpdate) {
      await bookingsCollection.updateOne(
        { _id: booking._id },
        { 
          $set: { equipment: booking.resource },
          $unset: { resource: "" }  // Remove resource field
        }
      );
      migratedCount++;
      if (migratedCount % 10 === 0) {
        console.log(`Migrated ${migratedCount}/${bookingsToUpdate.length} bookings...`);
      }
    }

    console.log(`\n✅ Successfully migrated ${migratedCount} bookings!`);
    console.log('All resource data has been copied to equipment field.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}
