import { Table, StringColumn, ReferenceColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_2119443_test_sim_answer = Table({
    name: 'x_2119443_test_sim_answer',
    label: 'Answer',
    display: 'answer',
    schema: {
        answer: StringColumn({ mandatory: true }),
        question: ReferenceColumn({ referenceTable: 'x_2119443_test_sim_question' }),
        is_correct: BooleanColumn({})
    },
})