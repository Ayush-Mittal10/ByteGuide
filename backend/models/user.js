import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        default: null
    },
    plan_start_date: {
        type: Date
    },
    plan_end_date: {
        type: Date
    },
    userData: {
        semester: {
            type: String,
        },
        languagesLearned: {
            type: [String],
        },
        languageRatings: {
            type: Map,
            of: Number,
        },
        selectedLibraries: {
            type: Map,
            of: [String],
        },
        otherLibraries: {
            type: Map,
            of: String,
        },
        selectedFrameworks: {
            type: [String],
        },
        cpOption: {
            type: String,
        },
        selectedPlatforms: {
            type: [String],
        },
        usernames: {
            type: Map,
            of: String,
        },
        projectOption: {
            type: String,
        },
        projectLink: {
            type: String,
        },
        codeforcesStats: {
            type: Object,
        },
        leetCodeStats: {
            type: Object,
        },
        semesters: {
            type: [Object],
        },
        overallProgress: {
            type: Number,
        },
        proTip: {
            type: String,
        },
    }
});

const User = mongoose.model('User', userSchema);
export default User;