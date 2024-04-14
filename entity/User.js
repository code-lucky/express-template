// src/entity/User.js
const { EntitySchema } = require('typeorm');

const User = new EntitySchema({
    name: 'User',
    tableName: 'user',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        username: {
            type: 'varchar'
        },
        password:{
            type: 'varchar'
        },
        email: {
            type: 'varchar'
        },
        delete:{
            type: 'int',
            default: '0'
        },
        creat_date:{
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP',
        },
        update_date:{
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP'
        }
    }
});

module.exports = User;
