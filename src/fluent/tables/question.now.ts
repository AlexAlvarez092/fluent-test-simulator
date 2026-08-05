import { Table, StringColumn, ReferenceColumn, ChoiceColumn, UrlColumn } from '@servicenow/sdk/core'

export const x_2119443_quiz_sim_question = Table({
    name: 'x_2119443_quiz_sim_question',
    label: 'Question',
    display: 'question',
    schema: {
        question: StringColumn({ mandatory: true, maxLength: 4000 }),
        collection: ReferenceColumn({ referenceTable: 'x_2119443_quiz_sim_collection' }),
        type: ChoiceColumn({
            default: 'single',
            choices: {
                single: {
                    label: 'Single',
                    sequence: 1,
                },
                multiple: {
                    label: 'Multiple',
                    sequence: 2,
                },
            },
        }),
        rationale: StringColumn({ maxLength: 4000 }),
        docs: UrlColumn({}),
    },
    index: [
        {
            name: 'index',
            unique: false,
            element: 'collection',
        },
    ],
})

import { List, Form, default_view } from '@servicenow/sdk/core'

Form({
    table: 'x_2119443_quiz_sim_question',
    view: default_view,
    sections: [
        {
            caption: 'Details',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [{ field: 'collection', type: 'table_field' }],
                    rightElements: [{ field: 'type', type: 'table_field' }],
                },
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'question', type: 'table_field' },
                        { field: 'rationale', type: 'table_field' },
                        { field: 'docs', type: 'table_field' },
                    ],
                },
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
                            listRef: 'x_2119443_quiz_sim_answer.question',
                        },
                    ],
                },
            ],
        },
    ],
})

List({
    table: 'x_2119443_quiz_sim_question',
    view: default_view,
    columns: ['question', 'collection', 'type'],
})

import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['question_create'],
    type: 'record',
    table: 'x_2119443_quiz_sim_question',
    operation: 'create',
    roles: ['x_2119443_quiz_sim.user'],
})

Acl({
    $id: Now.ID['question_read'],
    type: 'record',
    table: 'x_2119443_quiz_sim_question',
    operation: 'read',
    roles: ['x_2119443_quiz_sim.user'],
})

Acl({
    $id: Now.ID['question_write'],
    type: 'record',
    table: 'x_2119443_quiz_sim_question',
    operation: 'write',
    roles: ['x_2119443_quiz_sim.user'],
})

Acl({
    $id: Now.ID['question_delete'],
    type: 'record',
    table: 'x_2119443_quiz_sim_question',
    operation: 'delete',
    roles: ['x_2119443_quiz_sim.user'],
})
