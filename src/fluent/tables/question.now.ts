import { Table, StringColumn, ReferenceColumn, ChoiceColumn, UrlColumn } from '@servicenow/sdk/core'

export const x_2119443_test_sim_question = Table({
    name: 'x_2119443_test_sim_question',
    label: 'Question',
    display: 'question',
    schema: {
        question: StringColumn({ mandatory: true }),
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