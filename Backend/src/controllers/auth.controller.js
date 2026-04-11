import User from '../models/user.model.js';
import Doctor from '../models/doctor.model.js';

// Simple Login - No JWT
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Search in Users (Admins) first
        let account = await User.findOne({ email });
        let role = 'admin';

        // If not found in Users, search in Doctors
        if (!account) {
            account = await Doctor.findOne({ "contact.email": email });
            role = 'doctor';
        }
        
        if (!account) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Simple text comparison
        if (account.password !== password) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        res.status(200).json({ 
            success: true, 
            message: 'Login successful',
            user: {
                id: account._id,
                email: role === 'doctor' ? account.contact.email : account.email,
                name: account.name,
                role: role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Simple Register
export const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = new User({ email, password, name });
        await user.save();

        res.status(201).json({ success: true, message: 'User created' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
