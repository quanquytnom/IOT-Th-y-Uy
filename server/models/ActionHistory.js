import mongoose from "mongoose";

const ActionHistorySchema = new mongoose.Schema(
  {
    deviceName: String,
    action: String,
  },
  { timestamps: true }
);

const ActionHistory = mongoose.model("ActionHistory", ActionHistorySchema);
export default ActionHistory;