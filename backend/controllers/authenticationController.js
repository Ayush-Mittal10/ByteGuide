import User from '../models/user.js';
import Plan from '../models/plan.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const cookieOptions = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: 'None'
};

async function register(req, res) {
    try {
        const { firstname, lastname, email, password, userData } = req.body;
        
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const oldUser = await User.findOne({ email });
        
        if (oldUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const encryptedUserPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name: firstname,
            last_name: lastname,
            email: email.toLowerCase(),
            password: encryptedUserPassword,
            userData,
            plan: null,
            plan_start_date: null,
            plan_end_date: null
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: '2h' }
        );

        res.status(201).json({ user, token });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: '2h' }
        );

        console.log('Auth token:', token);
        
        console.log(req.cookies.access_token);
        res.status(200).cookie("access_token", token, cookieOptions).json(user);

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Failed to login user' });
    }
}

async function logout(req, res) {
    try {
        return res.clearCookie("access_token").status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ error: 'Failed to logout' });
    }
}

async function checkLoginStatus(req, res) {
    try {
        const token = req.cookies.access_token;

        console.log('Received token:', token);
    
        if (!token) {
            console.error('Token missing in authorization header');
            return res.status(401).json({ isLoggedIn: false });
        }
    
        jwt.verify(token, process.env.TOKEN_KEY);
        res.status(200).json({ isLoggedIn: true });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ isLoggedIn: false });
    }
}

async function updateUserData(req, res) {
    try {
        const { userData } = req.body;

        const token = req.cookies.access_token;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await User.findById(decodedToken.user_id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.userData = {
            ...user.userData,
            ...userData
        };
        await user.save();

        return res.status(200).json({ message: 'User data updated successfully' });

    } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).json({ error: 'Failed to update user data' });
    }
}

async function getUserData(req, res) {
    try {
        const token = req.cookies.access_token;
        console.log("token:", token);
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await User.findById(decodedToken.user_id).populate('plan');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.userData.semesters || !user.userData.overallProgress || !user.userData.proTip) {
            return res.status(404).json({ error: 'Incomplete user data' });
        }

        return res.status(200).json({
            userId: user._id,
            ...user.userData,
            plan: user.plan ? user.plan.name : 'free',
            overallProgress: user.userData.overallProgress,
            proTip: user.userData.proTip
        });

    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
}

export { register, login, logout, checkLoginStatus, updateUserData, getUserData };