import ActionHistory from "../models/ActionHistory.js";
import { publishDeviceControl } from "../mqtt/mqttClient.js";

export const getActionHistorys = async (req, res) => {
    try {
        // sort should look like this: { "field": "light", "sort": "desc"}
        const { page = 1, pageSize = 10, sort = null, search = "" } = req.query;

        // formatted sort should look like { userId: -1 }
        const generateSort = () => {
            if (sort) {
                const sortParsed = JSON.parse(sort);
                return {
                    [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
                };
            }
            return { createdAt: 1 }; // Default sort by createdAt in descending order
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const actionHistory = await ActionHistory.find({
            $or: [
                { deviceName: { $regex: new RegExp(search, "i") } },
                { action: { $regex: new RegExp(search, "i") } },
            ],
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);

        const total = await ActionHistory.countDocuments({
            deviceName: { $regex: search, $options: "i" },
        });

        res.status(200).json({
            actionHistory,
            total,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//recieve POST request from client: add new action history (turn on/off a device)
export const saveActionHistory = async (req, res) => {
    try {
        const { deviceName, action } = req.body;
        console.log(deviceName, action);
        const actionHistory = new ActionHistory({ deviceName, action });
        
        
        //save data to mongodb
        await actionHistory.save();

        publishDeviceControl(deviceName, action);

        res.status(201).json(actionHistory);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}