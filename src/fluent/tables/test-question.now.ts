import { Table, ReferenceColumn, ChoiceColumn, ListColumn } from '@servicenow/sdk/core';

export const x_2119443_test_sim_test_question = Table({
    name: 'x_2119443_test_sim_test_question',
    label: 'Test Question',
    display: 'question',
    schema: {
        question: ReferenceColumn({ referenceTable: 'x_2119443_test_sim_question', mandatory: true }),
        test: ReferenceColumn({ referenceTable: 'x_2119443_test_sim_test', mandatory: true }),
        status: ChoiceColumn({
            mandatory: true,
            default: 'unanswered',
            choices: {
                correct: 'Correct',
                failed: 'Failed',
                unanswered: 'Unanswered',
            },
        }),
        selected_answers: ListColumn({ referenceTable: 'x_2119443_test_sim_answer' }),
    },
});

import { List, Form, default_view } from '@servicenow/sdk/core';

Form({
    table: 'x_2119443_test_sim_test_question',
    view: default_view,
    sections: [
        {
            caption: 'Details',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'test', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'status', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Question Details',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'question', type: 'table_field' },
                        { field: 'selected_answers', type: 'table_field' },
                    ],
                },
            ],
        },
    ],
});

List({
    table: 'x_2119443_test_sim_test_question',
    view: default_view,
    columns: [
        { element: 'test', position: 0 },
        { element: 'question', position: 1 },
        { element: 'status', position: 2 },
    ],
});

import { Acl } from '@servicenow/sdk/core';

Acl({
    $id: Now.ID['test_question_create'],
    type: 'record',
    table: 'x_2119443_test_sim_test_question',
    operation: 'create',
    roles: ['x_2119443_test_sim.user'],
});

Acl({
    $id: Now.ID['test_question_read'],
    type: 'record',
    table: 'x_2119443_test_sim_test_question',
    operation: 'read',
    roles: ['x_2119443_test_sim.user'],
});

Acl({
    $id: Now.ID['test_question_write'],
    type: 'record',
    table: 'x_2119443_test_sim_test_question',
    operation: 'write',
    roles: ['x_2119443_test_sim.user'],
});

Acl({
    $id: Now.ID['test_question_delete'],
    type: 'record',
    table: 'x_2119443_test_sim_test_question',
    operation: 'delete',
    roles: ['x_2119443_test_sim.admin'],
});