// import DataSensor from "../models/DataSensor.js";

// export const getDataSenSors = async (req, res) => {
//     try {
//         // sort should look like this: { "field": "light", "sort": "desc"}
//         const { page = 1, pageSize = 10, sort = null, search = "" } = req.query;

//         // formatted sort should look like { userId: -1 }
//         const generateSort = () => {
//             const sortParsed = JSON.parse(sort);
//             const sortFormatted = {
//                 [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
//             };

//             return sortFormatted;
//         };
//         const sortFormatted = Boolean(sort) ? generateSort() : {};
        
//         //convert string to number to sort

//         const dataSenSors = await DataSensor.find({
//             $or: [
//                 { temperature: { $regex: new RegExp(search, "i") } },
//                 { light: { $regex: new RegExp(search, "i") } },
//                 { humidity: { $regex: new RegExp(search, "i") } },
//             ],
//         })
//             .sort(sortFormatted)
//             .skip(page * pageSize)
//             .limit(pageSize);


//         const total = await DataSensor.countDocuments({
//             temperature: { $regex: search, $options: "i" },
//         });

//         res.status(200).json({
//             dataSenSors,
//             total,
//         });
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// };

// export const saveDataSenSor = async (req, res) => {
//     try {
//         const { temperature, humidity, light } = req.body;
//         const dataSenSor = new DataSensor({ temperature, humidity, light });

//         //save data to mongodb
//         await dataSenSor.save();
//         res.status(201).json(dataSenSor);
//         // console.log("Data saved to MongoDB:", dataSenSor);
//     }
//     catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// }

import DataSensor from "../models/DataSensor.js";
// import { db } from "../index.js";

// export const getDataSenSors = async (req, res) => {
//     try {
//         // sort should look like this: { "field": "light", "sort": "desc"}
//         const { page = 1, pageSize = 10, sort = null, search = "" } = req.query;

//         // formatted sort should look like { userId: -1 }
//         const generateSort = () => {
//             const sortParsed = JSON.parse(sort);
//             return {
//                 [sortParsed.field]: (sortParsed.sort === "asc" ? 1 : -1),
//             };
//         };

//         const sortFormatted = Boolean(sort) ? generateSort() : {};
        
//         // Convert string fields to numbers for sorting
//         const dataSenSors = await DataSensor.find({
//             $or: [
//                 { temperature: { $regex: new RegExp(search, "i") } },
//                 { light: { $regex: new RegExp(search, "i") } },
//                 { humidity: { $regex: new RegExp(search, "i") } },
//                 { dusk: { $regex: new RegExp(search, "i") } },
//             ],
//         })
//         .sort(sortFormatted)
//         .skip(page * pageSize)
//         .limit(pageSize)
//         .lean(); // Use lean for better performance, if you don't need Mongoose documents

        

        

//         const total = await DataSensor.countDocuments({
//             temperature: { $regex: search, $options: "i" },
//         });

//         res.status(200).json({
//             dataSenSors: parsedDataSenSors,
//             total,
//         });
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// };

export const getDataSenSors = async (req, res) => {
    try {
        const { page = 1, pageSize = 10, sort = null, search = "" } = req.query;
        //sort should look like this: { "field": "light", "sort": "desc" }
        // Generate sort object based on query parameters
        const generateSort = () => {
            if (sort) {
                const sortParsed = JSON.parse(sort);
                return {
                    [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
                };
            }
            return { createdAt: -1 }; // Default sort by createdAt in descending order
        };

        const sortFormatted = Boolean(sort) ? generateSort() : {};

        // Create a query for numeric fields. If `search` is provided, convert it to a number.
        const searchValue = search ? parseFloat(search) : null;
        const query = searchValue
            ? {
                $or: [
                    { temperature: searchValue },
                    { humidity: searchValue },
                    { light: searchValue },
                    { dust: searchValue },
                ],
            }
            : {}; // If no search is provided, use an empty query to fetch all records

        // Fetch data with sorting, pagination, and limit
        const dataSenSors = await DataSensor.find(query)
            .sort(sortFormatted)
            .skip((page) * pageSize)
            .limit(Number(pageSize))
            .lean(); // Use lean for better performance if you don't need Mongoose documents

        // Count total documents based on query
        const total = await DataSensor.countDocuments(query);

        // Send response
        res.status(200).json({
            dataSenSors,
            total,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const saveDataSensor = async (data) => {
    try {
        // console.log('Data received:', data);
        // Tạo một instance mới của model DataSensor
        const newDataSensor = new DataSensor({
            temperature: data.temperature,
            humidity: data.humidity,
            light: data.light,
            dust: data.dust // Gán giá trị dust
        });

        console.log('New data sensor:', newDataSensor);


        // Lưu instance vào MongoDB
        await newDataSensor.save();

        // console.log('Data sensor saved successfully:', newDataSensor);
    } catch (error) {
        console.error('Error saving data sensor:', error);
    }
};
