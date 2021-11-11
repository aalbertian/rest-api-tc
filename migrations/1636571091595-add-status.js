const { Status } = require("../models")

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  // Write migration here
    await Status.create({name: "Declined", slug: "decl"})
    await Status.create({name: "New", slug: "new"})
    await Status.create({name: "Done", slug: "done"})
    await Status.create({name: "In progress", slug: "in-progress"})
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
}

module.exports = { up, down };
