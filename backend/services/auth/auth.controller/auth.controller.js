import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../../../models/userModel.js';
import interviewReportModel from '../../../models/docModel.js';

export async function  handleRegister(req,res){
    let {username, email, password} = req.body;
    const existeduser = await userModel.findOne({email});
    if(existeduser){
        res.json({
            message: "User already exists. Please login...",
            user: null
        });
    }
    else{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    const user = await userModel.create({
        username,
        password: hash,
        email
    });
        res.json({
            message: "Account created successfully. Please login...",
            user: {
                username: user.username,
                email: user.email
            }
        });
    }
}

export function handleLogout(req, res){
    const token=req.cookies?.token;
    if(!token) res.json({
        message: "Not logged in..."
    })
    else{
        res.clearCookie('token',{
            path: '/'
        });
        res.json({
            message: "Logged out successfully..."
        })
    }
}

export async function handleLogin(req,res){
    let {email, password} = req.body;
    // console.log(email, password);
    
    const existeduser = await userModel.findOne({email});
    const token=req.cookies.token;
    if(token){
        res.json({
            message: 'Already logged in.'
        })
        return;
    }
    
    if(!existeduser){
        res.json({
            message: "No such account exists. Please create one...",
            user: null
        });
    }
    else{
    const result = await bcrypt.compare(password, existeduser.password);
    if(result){
        const token = jwt.sign({email}, process.env.JWT_SECRET);
        res.cookie('token',token,{
            maxAge:10000000,
            path: '/'
        });
        res.json({
            message: "Logged in successfully.",
            user: {
                id: existeduser._id,
                username: existeduser.username,
                email: existeduser.email
            }
        });
    }
    else{
        res.json({
            message: "Invalid email or password",
            user: null
        });
    }
    }
}

export async function handleGetMe(req, res) {
    const token = req.cookies.token;

    // console.log("Token at line 95 of auth.controller ", token);
    

    if (!token) {
        return res.json({ user: null });
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel
            .findOne({ email })
            .select("-password")
            .populate('reports');

        if (!user) {
            // console.log("Npt logged in...");
            
            return res.json({ message: 'Not logged in at line 114 of auth.controller', user: null });
        }

        // console.log("at line 120 of controller of auth, user: ", user);
        

        return res.json({
            message: 'used fetched successfully...',
            user: user
        });
    } catch {
        res.clearCookie("token", { path: "/" });
        return res.json({ user: null });
    }
}

export async function appendReport({ token, reportId }){
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({email});
    user.reports.push(reportId);
    await user.save();
}

export async function updateSkillCompletion(req, res) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Not authenticated"
            });
        }

        const { email } = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        const { reportId, skillGapId } = req.params;
        const { isCompleted } = req.body;

        if (typeof isCompleted !== "boolean") {
            return res.status(400).json({
                message: "isCompleted must be a Boolean"
            });
        }

        const result = await interviewReportModel.updateOne(
            {
                _id: reportId,
                user: user._id,
                "skill_gaps._id": skillGapId
            },
            {
                $set: {
                    "skill_gaps.$.isCompleted": isCompleted
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Report or skill gap not found"
            });
        }

        return res.json({
            message: "Skill progress updated successfully",
            isCompleted
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}