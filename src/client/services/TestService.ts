declare global {
    interface Window {
        g_ck: string;
    }
}

export type TestDetail = {
    test: {
        sys_id: string;
        collection_id: string;
        collection_name: string;
        status: string;
        result: number;
    };
    questions: Array<{
        test_question_id: string;
        question_id: string;
        question: string;
        type: string;
        rationale: string;
        docs: string;
        selected_answer_ids: string[];
        answers: Array<{
            sys_id: string;
            answer: string;
        }>;
    }>;
};

export type SubmitTestPayload = {
    test_id: string;
    answers: Array<{
        question_id: string;
        selected_answer_ids: string[];
    }>;
};

export type SubmitTestResult = {
    test_id: string;
    total_questions: number;
    correct_count: number;
    failed_count: number;
    score_percent: number;
    question_results: Array<{
        question_id: string;
        status: 'correct' | 'failed';
    }>;
};

export type SaveTestProgressPayload = {
    test_id: string;
    answers: Array<{
        question_id: string;
        selected_answer_ids: string[];
    }>;
};

export type SaveTestProgressResult = {
    test_id: string;
    saved_questions_count: number;
};

export class TestService {
    private readonly testDetailPath: string;
    private readonly saveProgressPath: string;
    private readonly submitPath: string;

    constructor() {
        this.testDetailPath = '/api/x_2119443_test_sim/test_simulator_api/tests/detail';
        this.saveProgressPath = '/api/x_2119443_test_sim/test_simulator_api/tests/save-progress';
        this.submitPath = '/api/x_2119443_test_sim/test_simulator_api/tests/submit';
    }

    async getTestDetail(testId: string): Promise<TestDetail> {
        const query = new URLSearchParams();
        query.set('test_id', testId);

        const response = await fetch(`${this.testDetailPath}?${query.toString()}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'X-UserToken': window.g_ck,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || errorData.error || `HTTP error ${response.status}`);
        }

        const payload = await response.json();
        if (!payload?.result || typeof payload.result !== 'object') {
            throw new Error('Invalid response contract: expected result object');
        }

        return payload.result as TestDetail;
    }

    async saveTestProgress(payload: SaveTestProgressPayload): Promise<SaveTestProgressResult> {
        const response = await fetch(this.saveProgressPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-UserToken': window.g_ck,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || errorData.error || `HTTP error ${response.status}`);
        }

        const data = await response.json();
        if (!data?.result || typeof data.result !== 'object') {
            throw new Error('Invalid response contract: expected result object');
        }

        return data.result as SaveTestProgressResult;
    }

    async submitTest(payload: SubmitTestPayload): Promise<SubmitTestResult> {
        const response = await fetch(this.submitPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-UserToken': window.g_ck,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || errorData.error || `HTTP error ${response.status}`);
        }

        const data = await response.json();
        if (!data?.result || typeof data.result !== 'object') {
            throw new Error('Invalid response contract: expected result object');
        }

        return data.result as SubmitTestResult;
    }
}
