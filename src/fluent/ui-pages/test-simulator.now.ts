import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import homepage from '../../client/index.html'

UiPage({
    $id: Now.ID['test-simulator-page'],
    endpoint: 'x_2119443_test_sim_app.do',
    description: 'Test Simulator Portal UI Page',
    category: 'general',
    html: homepage,
    direct: true,
})
