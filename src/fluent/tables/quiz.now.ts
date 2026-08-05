import { Table, ReferenceColumn, ChoiceColumn, IntegerColumn } from '@servicenow/sdk/core';

export const x_2119443_quiz_sim_quiz = Table({
    name: 'x_2119443_quiz_sim_quiz',
    label: 'Quiz',
    display: 'collection',
    schema: {
        user_collection: ReferenceColumn({
            referenceTable: 'x_2119443_quiz_sim_user_collection',
            mandatory: true,
            cascadeRule: 'delete',
        }),
        collection: ReferenceColumn({ referenceTable: 'x_2119443_quiz_sim_collection', mandatory: true }),
        user: ReferenceColumn({ referenceTable: 'sys_user', mandatory: true }),
        status: ChoiceColumn({
            mandatory: true,
            default: 'in_progress',
            choices: {
                in_progress: {
                    label: 'In progress',
                    sequence: 1,
                },
                completed: {
                    label: 'Completed',
                    sequence: 2,
                },
            },
        }),
        result: IntegerColumn({ mandatory: true, default: 0 }),
    },
    index: [
        {
            name: 'index',
            unique: false,
            element: 'collection',
        },
        {
            name: 'index2',
            unique: false,
            element: 'user_collection',
        },
        {
            name: 'index3',
            unique: false,
            element: 'user',
        },
    ],
});

import { List, Form, default_view } from '@servicenow/sdk/core';

Form({
    table: 'x_2119443_quiz_sim_quiz',
    view: default_view,
    sections: [
        {
            caption: 'Details',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'user_collection', type: 'table_field' },
                        { field: 'collection', type: 'table_field' },
                        { field: 'status', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'user', type: 'table_field' },
                        { field: 'result', type: 'table_field' },
                    ],
                },
            ],
        },
    ],
});

List({
    table: 'x_2119443_quiz_sim_quiz',
    view: default_view,
    columns: ['user_collection', 'collection', 'user', 'status', 'result'],
});

import { Acl } from '@servicenow/sdk/core';

Acl({
    $id: Now.ID['quiz_create'],
    type: 'record',
    table: 'x_2119443_quiz_sim_quiz',
    operation: 'create',
    roles: ['x_2119443_quiz_sim.user'],
});

Acl({
    $id: Now.ID['quiz_read'],
    type: 'record',
    table: 'x_2119443_quiz_sim_quiz',
    operation: 'read',
    roles: ['x_2119443_quiz_sim.user'],
});

Acl({
    $id: Now.ID['quiz_write'],
    type: 'record',
    table: 'x_2119443_quiz_sim_quiz',
    operation: 'write',
    roles: ['x_2119443_quiz_sim.user'],
});

Acl({
    $id: Now.ID['quiz_delete'],
    type: 'record',
    table: 'x_2119443_quiz_sim_quiz',
    operation: 'delete',
    roles: ['x_2119443_quiz_sim.user'],
});
