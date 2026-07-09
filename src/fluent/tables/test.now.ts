import { Table, ReferenceColumn, ChoiceColumn, IntegerColumn } from '@servicenow/sdk/core';

export const x_2119443_test_sim_test = Table({
    name: 'x_2119443_test_sim_test',
    label: 'Test',
    display: 'collection',
    schema: {
        collection: ReferenceColumn({ referenceTable: 'x_2119443_test_sim_collection', mandatory: true }),
        user: ReferenceColumn({ referenceTable: 'sys_user', mandatory: true }),
        status: ChoiceColumn({
            mandatory: true,
            default: 'in_progress',
            choices: {
                in_progress: 'In progress',
                completed: 'Completed',
            },
        }),
        result: IntegerColumn({ mandatory: true, default: 0 }),
    },
});

import { List, Form, default_view } from '@servicenow/sdk/core';

Form({
    table: 'x_2119443_test_sim_test',
    view: default_view,
    sections: [
        {
            caption: 'Details',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
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
    table: 'x_2119443_test_sim_test',
    view: default_view,
    columns: [
        { element: 'collection', position: 0 },
        { element: 'user', position: 1 },
        { element: 'status', position: 2 },
        { element: 'result', position: 3 },
    ],
});

import { Acl } from '@servicenow/sdk/core';

Acl({
    $id: Now.ID['test_create'],
    type: 'record',
    table: 'x_2119443_test_sim_test',
    operation: 'create',
    roles: ['x_2119443_test_sim.user'],
});

Acl({
    $id: Now.ID['test_read'],
    type: 'record',
    table: 'x_2119443_test_sim_test',
    operation: 'read',
    roles: ['x_2119443_test_sim.user'],
});

Acl({
    $id: Now.ID['test_write'],
    type: 'record',
    table: 'x_2119443_test_sim_test',
    operation: 'write',
    roles: ['x_2119443_test_sim.user'],
});

Acl({
    $id: Now.ID['test_delete'],
    type: 'record',
    table: 'x_2119443_test_sim_test',
    operation: 'delete',
    roles: ['x_2119443_test_sim.admin'],
});