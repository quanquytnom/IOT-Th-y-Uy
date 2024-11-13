

import ActionHistory from "../models/ActionHistory.js";
import { publishDeviceControl } from "../mqtt/mqttClient.js";

export const getActionHistorys = async (req, res) => {
    try {
        const { page = 1, pageSize = 10, sort = null, search = "", startDate, endDate } = req.query;

        // Generate sort configuration
        const generateSort = () => {
            if (sort) {
                const sortParsed = JSON.parse(sort);
                return { [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1 };
            }
            return { createdAt: -1 };
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};

        // Build base query with search filter
        const query = {
            $or: [
                { deviceName: { $regex: new RegExp(search, "i") } },
                { action: { $regex: new RegExp(search, "i") } },
            ],
        };

        
        // Date filter logic
        if (startDate || endDate) {
            let start = startDate ? new Date(startDate) : null;
            let end = endDate ? new Date(endDate) : null;

            //Error from DatePicker make the pickedDate decrease 1 (Nov 06 -> Nov05)
            //Temporary solution: increase the recieved date by 1.
            if (start) {
                start.setDate(start.getDate() + 1); // Increase start date by 1 day
                start.setHours(0, 0, 0, 0); // Set to beginning of the new day
            }
        
            if (end) {
                end.setDate(end.getDate() + 1); // Increase end date by 1 day
                end.setHours(23, 59, 59, 999); // Set to the end of the new day
            }
        
            // Apply date filters
            query.createdAt = {};
            if (start) query.createdAt.$gte = start;
            if (end) query.createdAt.$lte = end;
        
            // Log date filters and query to verify
            // console.log("Received startDate:", startDate);
            // console.log("Received endDate:", endDate);
            // console.log("Formatted Start Date:", start ? start.toISOString() : "Not provided");
            // console.log("Formatted End Date:", end ? end.toISOString() : "Not provided");
            // console.log("Query being sent to MongoDB:", query);
        }
        



        // Fetch data with pagination, sorting, and filtering
        const actionHistory = await ActionHistory.find(query)
            .sort(sortFormatted)
            .skip((page) * pageSize)
            .limit(parseInt(pageSize));

        const total = await ActionHistory.countDocuments(query);

        res.status(200).json({ actionHistory, total });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// For adding new action history
export const saveActionHistory = async (req, res) => {
    try {
        const { deviceName, action } = req.body;
        const actionHistory = new ActionHistory({ deviceName, action });

        // Save data to MongoDB
        await actionHistory.save();

        publishDeviceControl(deviceName, action);

        res.status(201).json(actionHistory);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
