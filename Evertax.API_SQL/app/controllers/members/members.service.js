const bcrypt = require('bcryptjs');

const db = require('../../_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Member.findAll();
}

async function getById(id) {
    return await getMember(id);
}

async function create(params) {
    // validate
    if (await db.Member.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    const Member = new db.Member(params);
    
    // hash password
    Member.passwordHash = await bcrypt.hash(params.password, 10);

    // save Member
    await Member.save();
}

async function update(id, params) {
    const Member = await getMember(id);

    // validate
    const emailChanged = params.email && Member.email !== params.email;
    if (emailChanged && await db.Member.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    // copy params to Member and save
    Object.assign(Member, params);
    await Member.save();
}

async function _delete(id) {
    const Member = await getMember(id);
    await Member.destroy();
}

// helper functions

async function getMember(id) {
    const Member = await db.Member.findByPk(id);
    if (!Member) throw 'Member not found';
    return Member;
}
