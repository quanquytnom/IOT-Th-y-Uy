use("test")

// // find temperature > 20
// db.datasensors.find({
//     "temperature": {
//         $gt: 20
//     }
// })

const query = {};

// Define dates in ISO format for consistent parsing
const searchedDay = new Date("2024-11-05");
const searchedDayEnd = new Date("2024-11-06");

// Build query
query.createdAt = {
  $gte: searchedDay,
  $lt: searchedDayEnd
};
query.dust = {
  $gt: 60
};

// Execute the query
db.datasensors.find(query);



// db.datasensors.find({
//     "dust": {
//         $gt: 60
//     },
//     "createdAt": searchedDay
// })

// const today = new Date("2024-11-06");
// const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
// const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);



// db.datasensors.countDocuments({
//   "createdAt": {
//     $gte: start,
//     $lt: end
//   },
//   "dust": { $gt: 60 }
// })