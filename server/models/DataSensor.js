import mongoose from "mongoose";

const DataSensorSchema = new mongoose.Schema(
  {
    temperature: { type: Number}, // Đổi thành kiểu Number và thêm required
    humidity: { type: Number },
    light: { type: Number},
    dust: { type: Number},
  },
  { timestamps: true }
);

const DataSensor = mongoose.model("DataSensor", DataSensorSchema);
export default DataSensor;