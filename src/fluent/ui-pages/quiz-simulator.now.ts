import '@servicenow/sdk/global';
import { UiPage } from '@servicenow/sdk/core';
import homepage from '../../client/index.html';

UiPage({
    $id: Now.ID['quiz-simulator-page'],
    endpoint: 'x_2119443_quiz_sim_app.do',
    description: 'Quiz Simulator Portal UI Page',
    category: 'general',
    html: homepage,
    direct: true,
});
