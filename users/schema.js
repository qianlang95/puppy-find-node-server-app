import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    dob: {
      type: Date,
      set: (v) => v ? new Date(v) : null // 确保日期是正确的 Date 对象或 null
    },
    role: {
      type: String,
      enum: ["admin", "buyer", "seller"],
      default: "buyer"
    },
  },
  { 
    collection: "users",
    toJSON: { getters: true }, // 确保转换为 JSON 时应用 getters
    toObject: { getters: true }
  }
);

// 使用 getter 格式化日期
userSchema.path('dob').get(function (v) {
  return v ? v.toISOString().split('T')[0] : null;
});

export default userSchema;
