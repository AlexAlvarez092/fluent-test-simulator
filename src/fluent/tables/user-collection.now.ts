import { Table, ReferenceColumn, ListColumn } from '@servicenow/sdk/core'

export const x_2119443_test_sim_user_collection = Table({
    name: 'x_2119443_test_sim_user_collection',
    label: 'User Collection',
    display: 'collection',
    schema: {
        user: ReferenceColumn({ referenceTable: 'sys_user', mandatory: true }),
        collection: ReferenceColumn({ referenceTable: 'x_2119443_test_sim_collection', mandatory: true }),
        never_seen_questions: ListColumn({ referenceTable: 'x_2119443_test_sim_question' }),
        correct_questions: ListColumn({ referenceTable: 'x_2119443_test_sim_question' }),
        ever_failed_questions: ListColumn({ referenceTable: 'x_2119443_test_sim_question' }),
        last_attempt_failed_questions: ListColumn({ referenceTable: 'x_2119443_test_sim_question' }),
    },
})

import { List, Form, default_view } from '@servicenow/sdk/core'

Form({
    table: 'x_2119443_test_sim_user_collection',
    view: default_view,
    sections: [
        {
            caption: 'Details',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [{ field: 'user', type: 'table_field' }],
                    rightElements: [{ field: 'collection', type: 'table_field' }],
                }
            ],
        },
        {
            caption: 'Question Progress Lists',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'never_seen_questions', type: 'table_field' },
                        { field: 'correct_questions', type: 'table_field' },
                        { field: 'ever_failed_questions', type: 'table_field' },
                        { field: 'last_attempt_failed_questions', type: 'table_field' },
                    ],
                }
            ],
        },
    ],
})

List({
    table: 'x_2119443_test_sim_user_collection',
    view: default_view,
    columns: [
        { element: 'user', position: 0 },
        { element: 'collection', position: 1 },
    ],
})

import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['user_collection_create'],
    type: 'record',
    table: 'x_2119443_test_sim_user_collection',
    operation: 'create',
    roles: ['x_2119443_test_sim.user'],
})

Acl({
    $id: Now.ID['user_collection_read'],
    type: 'record',
    table: 'x_2119443_test_sim_user_collection',
    operation: 'read',
    roles: ['x_2119443_test_sim.user'],
})

Acl({
    $id: Now.ID['user_collection_write'],
    type: 'record',
    table: 'x_2119443_test_sim_user_collection',
    operation: 'write',
    roles: ['x_2119443_test_sim.user'],
})

Acl({
    $id: Now.ID['user_collection_delete'],
    type: 'record',
    table: 'x_2119443_test_sim_user_collection',
    operation: 'delete',
    roles: ['x_2119443_test_sim.user'],
})
