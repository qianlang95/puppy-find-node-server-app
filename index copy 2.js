import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import UserModel from './models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import FollowModel from './models/Follow.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));
app.use(cookieParser());

const CONNECTION_STRING = 'mongodb+srv://puppy:puppy123456@cluster1.6czondc.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const verifyUser = (allowedRoles) => (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        if (allowedRoles.includes('guest')) {
            return next(); // 允许guest用户继续
        }
        return res.status(401).json({ message: "Authentication required" });
    } 
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        } 
        if (!allowedRoles.includes(decoded.role)) {
            return res.status(403).json({ message: "Not authorized" });
        }
        req.user = decoded;
        next();
    });
};


// 获取关注列表
app.get('/following/:userID', async (req, res) => {
    try {
        const following = await FollowModel.find({ follower: req.params.userID })
            .populate('followed', 'userID name'); // 确保这里的 'followed' 正确对应模型中的字段

        const followingList = following.map(follow => {
            return follow.followed && follow.followed.userID ? follow.followed.userID.toString() : null;
        }).filter(id => id !== null); // 过滤掉 null 值

        res.json(followingList);
    } catch (err) {
        console.error('Error fetching following:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


// 获取粉丝列表，并包括粉丝的姓名
app.get('/followers/:userID', async (req, res) => {
    try {
        const followers = await FollowModel.find({ followed: req.params.userID })
            .populate('follower', 'userID name'); // Ensure correct population

        const followersList = followers.map(follow => {
            if (follow.follower && follow.follower.userID) {
                return {
                    userID: follow.follower.userID.toString(),
                    name: follow.follower.name
                };
            }
            return null;
        }).filter(follower => follower !== null); // Filter out null values

        res.json(followersList);
    } catch (err) {
        console.error('Error fetching followers:', err);
        res.status(500).json({ message: 'Server error' });
    }
});




// 取消关注
app.post('/unfollow', async (req, res) => {
    const { follower, followed } = req.body;
    try {
        const follow = await FollowModel.findOne({ follower, followed });
        if (!follow) {
            return res.status(400).json({ message: 'Not following' });
        }

        await follow.remove();
        res.json({ message: 'Unfollow successful' });
    } catch (err) {
        console.error('Error on unfollow:', err);
        res.status(500).json({ message: 'Server error' });
    }
});
  




app.get('/profile/:userID', async (req, res) => {
    const userID = req.params.userID;

    try {
        const user = await UserModel.findOne({ userID: userID }).select('-password'); // 使用 userID 变量进行查询
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { name, email, role, birthDate, address } = user;
        res.json({ name, email, role, birthDate, address });
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});




app.put('/updateProfile/:userID', async (req, res) => {
    const userID = req.params.userID; // Corrected variable name to match the route parameter
    const updatedProfile = req.body;
  
    try {
      const user = await UserModel.findOne({ userID: userID }); // Use the same variable name as defined above
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.name = updatedProfile.name ?? user.name;
      user.email = updatedProfile.email ?? user.email;
      user.birthDate = updatedProfile.birthDate ?? user.birthDate;
      user.address = updatedProfile.address ?? user.address;
  
      await user.save();
      res.json({ message: "Profile updated successfully" });
    } catch (err) {
      console.error('Error updating profile:', err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
app.get('/dashboard', verifyUser(['admin', 'buyer', 'seller']), (req, res) => {
    res.json("Success");
});

app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        // Check for existing user
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }
  
        const hash = await bcrypt.hash(password, 10);
        const uniqueUserID = uuidv4();
        const newUser = new UserModel({ name, email, password: hash, role, userID: uniqueUserID });
  
        await newUser.save();
        console.log('User registered successfully with userID:', uniqueUserID);
  
        res.status(201).json({ message: 'Success', userID: uniqueUserID });
    } catch (err) {
        console.error('Failed to register:', err);
        res.status(500).json({ message: 'Server error' });
    }
  });
  

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            // 将用户信息存储在会话中
            req.session.user = { userID: user.userID, email: user.email, role: user.role };
            res.json({ Status: "Success", role: user.role, userID: user.userID });
        } else {
            res.status(401).json({ Status: "Error", message: "Authentication failed" });
        }
    } catch (err) {
        res.status(500).json({ Status: "Error", message: "Server error" });
    }
});


app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Could not log out" });
        }
        res.json({ message: 'Logout successful' });
    });
});




app.listen(3001, () => {
    console.log("Server is Running");
});
