const mongoose = require('mongoose');
const encryption = require('../util/encryption');
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    firstName: { type: mongoose.Schema.Types.String },
    lastName: { type: mongoose.Schema.Types.String },
    phno : {type:mongoose.Schema.Types.Number},
    salt: { type: mongoose.Schema.Types.String, required: true },
    roles: [{ type: mongoose.Schema.Types.String }],
    isAdmin: {type: Boolean, default: false},
    rentedCars:[{type: ObjectId, ref: 'Car'}]
},{
    usePushEach: true
  });

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {
    try {
        let users = await User.find();
        if (users.length > 0) return;
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, 'admin@123');
        return User.create({
            username: 'admin',
            salt,
            hashedPass,
            roles: ['Admin'],
            isAdmin: true
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = User;
