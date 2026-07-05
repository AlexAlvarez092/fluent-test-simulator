import { Table, StringColumn } from '@servicenow/sdk/core'

export const x_2119443_test_sim_collection = Table({
    name: 'x_2119443_test_sim_collection',
    label: 'Collection',
    display: 'name',
    schema: {
        name: StringColumn({ mandatory: true, maxLength: 1000 }),
    },
})

import { List, Form, default_view } from '@servicenow/sdk/core'

Form({
    table: 'x_2119443_test_sim_collection',
    view: default_view,
    sections: [
        {
            caption: 'Details',
            content: [
                {
                    layout: 'one-column',
                    elements: [{ field: 'name', type: 'table_field' }],
                },
            ],
        },
        {
            caption: 'Questions',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        {
                            type: 'list',
                            listType: '12M',
                            listRef: 'x_2119443_test_sim_question.collection',
                        },
                    ],
                },
            ],
        },
    ],
})

List({
    table: 'x_2119443_test_sim_collection',
    view: default_view,
    columns: [{ element: 'name', position: 0 }],
})

import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['collection_create'],
    type: 'record',
    table: 'x_2119443_test_sim_collection',
    operation: 'create',
    roles: ['x_2119443_test_sim.admin'],
})

Acl({
    $id: Now.ID['collection_read'],
    type: 'record',
    table: 'x_2119443_test_sim_collection',
    operation: 'read',
    roles: ['x_2119443_test_sim.user'],
})

Acl({
    $id: Now.ID['collection_write'],
    type: 'record',
    table: 'x_2119443_test_sim_collection',
    operation: 'write',
    roles: ['x_2119443_test_sim.admin'],
})

Acl({
    $id: Now.ID['collection_delete'],
    type: 'record',
    table: 'x_2119443_test_sim_collection',
    operation: 'delete',
    roles: ['x_2119443_test_sim.admin'],
})
