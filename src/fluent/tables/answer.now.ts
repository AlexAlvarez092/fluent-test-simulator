import { Table, StringColumn, ReferenceColumn, BooleanColumn } from '@servicenow/sdk/core';

export const x_2119443_test_sim_answer = Table({
    name: 'x_2119443_test_sim_answer',
    label: 'Answer',
    display: 'answer',
    schema: {
        answer: StringColumn({ mandatory: true, maxLength: 4000 }),
        question: ReferenceColumn({ referenceTable: 'x_2119443_test_sim_question' }),
        is_correct: BooleanColumn({}),
    },
});

import { List, Form, default_view } from '@servicenow/sdk/core';

Form({
    table: 'x_2119443_test_sim_answer',
    view: default_view,
    sections: [
        {
            caption: 'Details',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [{ field: 'question', type: 'table_field' }],
                    rightElements: [{ field: 'is_correct', type: 'table_field' }],
                },
                {
                    layout: 'one-column',
                    elements: [{ field: 'answer', type: 'table_field' }],
                },
            ],
        },
    ],
});

List({
    table: 'x_2119443_test_sim_answer',
    view: default_view,
    columns: [
        { element: 'answer', position: 0 },
        { element: 'question', position: 1 },
        { element: 'is_correct', position: 2 },
    ],
});

import { Acl } from '@servicenow/sdk/core';

Acl({
    $id: Now.ID['answer_create'],
    type: 'record',
    table: 'x_2119443_test_sim_answer',
    operation: 'create',
    roles: ['x_2119443_test_sim.admin'],
});

Acl({
    $id: Now.ID['answer_read'],
    type: 'record',
    table: 'x_2119443_test_sim_answer',
    operation: 'read',
    roles: ['x_2119443_test_sim.user'],
});

Acl({
    $id: Now.ID['answer_write'],
    type: 'record',
    table: 'x_2119443_test_sim_answer',
    operation: 'write',
    roles: ['x_2119443_test_sim.admin'],
});

Acl({
    $id: Now.ID['answer_delete'],
    type: 'record',
    table: 'x_2119443_test_sim_answer',
    operation: 'delete',
    roles: ['x_2119443_test_sim.admin'],
});
