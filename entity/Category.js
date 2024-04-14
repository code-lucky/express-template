// src/entity/Category.js
const { EntitySchema } = require('typeorm');

const Category = new EntitySchema({
    name: 'Category',
    tableName: 'category',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name:{
            type: 'varchar',
        },
        pid:{
            type: 'int',
            default: '0'
        },
        delete:{
            type: 'int',
            default: '0'
        },
        creat_date:{
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        },
        update_date:{
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP'
        }
    }
});

module.exports = Category;
