import { Table, ReferenceColumn, ChoiceColumn, ListColumn } from '@servicenow/sdk/core';

export const x_2119443_quiz_sim_quiz_question = Table({
    name: 'x_2119443_quiz_sim_quiz_question',
    label: 'Quiz Question',
    display: 'question',
    schema: {
        question: ReferenceColumn({ referenceTable: 'x_2119443_quiz_sim_question', mandatory: true }),
        quiz: ReferenceColumn({
            referenceTable: 'x_2119443_quiz_sim_quiz',
            mandatory: true,
            cascadeRule: 'delete',
        }),
        status: ChoiceColumn({
            mandatory: true,
            default: 'unanswered',
            choices: {
                correct: {
                    label: 'Correct',
                    sequence: 1,
                },
                failed: {
                    label: 'Failed',
                    sequence: 2,
                },
                unanswered: {
                    label: 'Unanswered',
                    sequence: 3,
                },
            },
        }),
        selected_answers: ListColumn({ referenceTable: 'x_2119443_quiz_sim_answer' }),
    },
    index: [
        {
            name: 'index',
            unique: false,
            element: 'question',
        },
        {
            name: 'index2',
            unique: false,
            element: 'quiz',
        },
    ],
});

import { List, Form, default_view } from '@servicenow/sdk/core';

Form({
    table: 'x_2119443_quiz_sim_quiz_question',
    view: default_view,
    sections: [
        {
            caption: 'Details',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [{ field: 'quiz', type: 'table_field' }],
                    rightElements: [{ field: 'status', type: 'table_field' }],
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
    table: 'x_2119443_quiz_sim_quiz_question',
    view: default_view,
    columns: ['quiz', 'question', 'status'],
});

import { Acl } from '@servicenow/sdk/core';

Acl({
    $id: Now.ID['quiz_question_create'],
    type: 'record',
    table: 'x_2119443_quiz_sim_quiz_question',
    operation: 'create',
    roles: ['x_2119443_quiz_sim.user'],
});

Acl({
    $id: Now.ID['quiz_question_read'],
    type: 'record',
    table: 'x_2119443_quiz_sim_quiz_question',
    operation: 'read',
    roles: ['x_2119443_quiz_sim.user'],
});

Acl({
    $id: Now.ID['quiz_question_write'],
    type: 'record',
    table: 'x_2119443_quiz_sim_quiz_question',
    operation: 'write',
    roles: ['x_2119443_quiz_sim.user'],
});

Acl({
    $id: Now.ID['quiz_question_delete'],
    type: 'record',
    table: 'x_2119443_quiz_sim_quiz_question',
    operation: 'delete',
    roles: ['x_2119443_quiz_sim.user'],
});
