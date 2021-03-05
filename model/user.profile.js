/**
 * Graduation Year
 * UNI / College
 * Degree 
 * Github Link
 * Linkedin Link 
 * Resume (Drive) Link.
 * --- User ----
 * --- Acad ----
 * --- Programmers Profile ---
 */

const mongoose = require('mongoose');
const userProfileSchema = new mongoose.Schema({
    user : {
        bio : {
            type : String,
            // type : {Schema.Type.ObjectID, ref : 'user' },
        },
    },
    // ============================================ Academic ==========================================
    academic : {
        degree : {
            type : String,
            required : true
        },
        resume : {
            type : String,
            required : true
        },
        github : {
            type : String,
            unique : true
        },
        linkedin : {
            type : String,
            unique : true
        },
        graduationyear :{
         type : String,
            required : true
        },
        college : {
            type : String,
            required : true
        },
    },
    
    // ================================== Programmers Profile ====================================
    // programmer : {
    //     leetcode : {
    //         type : String
    //     },
    //     hackerrank : {
    //         type : String
    //     },
    //     other : { //CF-CC
    //           type : String
    //     }
    // },
    // ==================================== For LeaderBoard ====================================
    score : {
        type : String,
        default : 0,
    }
}, {timestamps : true});

const userProfile  = new mongoose.model('userprofile', userProfileSchema);

module.exports = userProfile;