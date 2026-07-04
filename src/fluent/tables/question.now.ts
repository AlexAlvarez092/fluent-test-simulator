import { Table, StringColumn, ReferenceColumn, ChoiceColumn, UrlColumn } from '@servicenow/sdk/core'

export const x_2119443_test_sim_question = Table({
    name: 'x_2119443_test_sim_question',
    label: 'Question',
    display: 'question',
    schema: {
        question: StringColumn({ mandatory: true, maxLength: 4000 }),
        collection: ReferenceColumn({ referenceTable: 'x_2119443_test_sim_collection' }),
        type: ChoiceColumn({
            default: 'single',
            choices: {
                single: 'Single',
                multiple: 'Multiple'
            }
        }),
        rationale: StringColumn({}),
        docs: UrlColumn({})
    },
})

import { List, Form, default_view } from '@servicenow/sdk/core'

Form({
    table: 'x_2119443_test_sim_question',
    view: default_view,
    sections: [
        {
            caption: 'Details',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'collection', type: 'table_field' }
                    ],
                    rightElements: [
                        { field: 'type', type: 'table_field' }
                    ]
                },
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'question', type: 'table_field' },
                        { field: 'rationale', type: 'table_field' },
                        { field: 'docs', type: 'table_field' }
                    ]
                }
            ],
        },
        {
            caption: 'Answers',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        {
                            type: 'list',
                            listType: '12M',
                            listRef: 'x_2119443_test_sim_answer.question',
                        },
                    ]
                }
            ]
        }
    ],
})

List({
    table: 'x_2119443_test_sim_question',
    view: default_view,
    columns: [
        { element: 'question', position: 0 },
        { element: 'collection', position: 1 },
        { element: 'type', position: 2 }
    ],
})

import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['question_create'],
    type: 'record',
    table: 'x_2119443_test_sim_question',
    operation: 'create',
    roles: ['x_2119443_test_sim.admin']
})

Acl({
    $id: Now.ID['question_read'],
    type: 'record',
    table: 'x_2119443_test_sim_question',
    operation: 'read',
    roles: ['x_2119443_test_sim.user']
})

Acl({
    $id: Now.ID['question_write'],
    type: 'record',
    table: 'x_2119443_test_sim_question',
    operation: 'write',
    roles: ['x_2119443_test_sim.admin']
})

Acl({
    $id: Now.ID['question_delete'],
    type: 'record',
    table: 'x_2119443_test_sim_question',
    operation: 'delete',
    roles: ['x_2119443_test_sim.admin']
})
