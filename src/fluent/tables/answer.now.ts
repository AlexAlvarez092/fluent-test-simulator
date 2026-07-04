import { Table, StringColumn, ReferenceColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_2119443_test_sim_answer = Table({
    name: 'x_2119443_test_sim_answer',
    label: 'Answer',
    display: 'answer',
    schema: {
        answer: StringColumn({ mandatory: true, maxLength: 4000 }),
        question: ReferenceColumn({ referenceTable: 'x_2119443_test_sim_question' }),
        is_correct: BooleanColumn({})
    },
})

import { List, Form, default_view } from '@servicenow/sdk/core'

Form({
    table: 'x_2119443_test_sim_answer',
    view: default_view,
    sections: [
        {
            caption: 'Details',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'question', type: 'table_field' }
                    ],
                    rightElements: [
                        { field: 'is_correct', type: 'table_field' }
                    ]
                },
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'answer', type: 'table_field' },
                    ]
                }
            ],
        }
    ],
})

List({
    table: 'x_2119443_test_sim_answer',
    view: default_view,
    columns: [
        { element: 'answer', position: 0 },
        { element: 'question', position: 1 },
        { element: 'is_correct', position: 2 }
    ],
})

