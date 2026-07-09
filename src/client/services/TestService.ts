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
        answers: Array<{
            sys_id: string;
            answer: string;
        }>;
    }>;
};

export class TestService {
    private readonly testDetailPath: string;

    constructor() {
        this.testDetailPath = '/api/x_2119443_test_sim/test_simulator_api/tests/detail';
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
}
