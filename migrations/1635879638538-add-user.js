const { Users, Roles } = require("../models");
const bcrypt = require("bcrypt");
/**
 * Make any changes you need to make to the database here
 */
async function up () {
    // Write migration here
    const role = await Roles.findOne({slug: 'admin'})
    if (role) {
        await Users.create({
            fullName: 'Ivan Ivanov',
            email: 'admin@neoflex.ru',
            password: bcrypt.hashSync('admin12345', 10),
            role: role._id
        })
    }
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
    // Write migration here
}

module.exports = { up, down };
