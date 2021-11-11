const { Types } = require("../models")
/**
 * Make any changes you need to make to the database here
 */
async function up () {
  // Write migration here
    await Types.create({name: "Hardware", slug: "hard"})
    await Types.create({name: "Software", slug: "soft"})
    await Types.create({name: "Networking", slug: "net"})
    await Types.create({name: "Troubleshooting", slug: "troublesh"})
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
}

module.exports = { up, down };
