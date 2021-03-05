/**
 * Company Name
 * Domain
 * Openings
 * Stipend
 * Duration
 * Brief Desc
 * Who Can apply?
 */

const mongoose = require('mongoose');

const companyprofileSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true,
    },
    contact : {
        phone : {
            type : Number,
            minlength : 10,
            maxlength : 15 // iodjwioqdqd
        },
        email : {
            type : String,
            unique : true,
            lowercase : true,
            require : String
        },  
    },
    // =========================== Internship Details =========================
    details : {
        description : String,
        domain : {
            type : String, // Needs to be updated.
        }
    },
    stipend : {
         minlimit : Number,
         maxlimit : Number,
         default : 0 // :(
    },
    opening : {
        type : String,
        content : ['Stand up Comedian', 'Web', 'xyz'], //Needs to be updated.
    },
});

const companyprofile = new mongoose.model('companyprofile', companyprofileSchema);
module.exports = companyprofile;
