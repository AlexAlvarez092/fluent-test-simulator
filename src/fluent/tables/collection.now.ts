import { Table, StringColumn } from '@servicenow/sdk/core'

export const x_2119443_test_sim_collection = Table({
    name: 'x_2119443_test_sim_collection',
    label: 'Collection',
    display: 'name', 
    schema: {
        name: StringColumn({ mandatory: true }),
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
                    elements: [
                        { field: 'name', type: 'table_field' },
                        
                    ]
                }
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
                    ]
                }
            ]
        }
    ],
})

List({
    table: 'x_2119443_test_sim_collection',
    view: default_view,
    columns: [
        { element: 'name', position: 0 }
    ],
})