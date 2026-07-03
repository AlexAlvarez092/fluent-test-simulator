import { Table, StringColumn } from '@servicenow/sdk/core'

export const x_2119443_test_sim_collection = Table({
    name: 'x_2119443_test_sim_collection',
    label: 'Collection',
    display: 'name', 
    schema: {
        name: StringColumn({ mandatory: true }),
    },
})