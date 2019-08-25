
exports.selectAllUsers = (knex) => {
    knex({
            user: 'users'
        })
        .select({
            aId: 'user.id',
            aName: 'user.name',
            aResponses: 'user.responses'
        })
        .then((resp) => {
            console.table(resp);
        })
        .catch((err) => {
            if (err) throw err
        });
};

//select all users
// knex({
//     user: 'users'
// })
// .select({
//     aId: 'user.id',
//     aName: 'user.name',
//     aResponses: 'user.responses'
// })
// .then((resp) => {
//     console.table(resp);
// })
// .catch((err) => {
//     if (err) throw err
// });

var exports = module.exports = {};