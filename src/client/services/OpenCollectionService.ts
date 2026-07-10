declare global {
    interface Window {
        g_ck: string;
    }
}

export type OpenCollectionOverview = {
    stats: {
        never_seen_count: number;
        correct_count: number;
        ever_failed_count: number;
        last_attempt_failed_count: number;
    };
    questions: Array<{
        sys_id: string;
        question: string;
        type: string;
        rationale: string;
        docs: string;
        answers: Array<{
            sys_id: string;
            answer: string;
            is_correct: boolean;
        }>;
    }>;
    tests: Array<{
        sys_id: string;
        status: string;
        result: number;
        created_on: string;
    }>;
};

export class OpenCollectionService {
    private readonly overviewPath: string;
    private readonly createTestPath: string;

    constructor() {
        this.overviewPath = '/api/x_2119443_test_sim/test_simulator_api/collections/open-overview';
        this.createTestPath = '/api/x_2119443_test_sim/test_simulator_api/tests/create';
    }

    private async getErrorMessage(response: Response): Promise<string> {
        let payload: any = null;

        try {
            payload = await response.json();
        } catch (error) {
            return `HTTP error ${response.status}`;
        }

        const message = payload?.result?.error;

        if (typeof message === 'string' && message.trim().length > 0) {
            return message;
        }

        return `HTTP error ${response.status}`;
    }

    async getOverview(collectionId: string): Promise<OpenCollectionOverview> {
        const query = new URLSearchParams();
        query.set('collection_id', collectionId);

        const response = await fetch(`${this.overviewPath}?${query.toString()}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'X-UserToken': window.g_ck,
            },
        });

        if (!response.ok) {
            throw new Error(await this.getErrorMessage(response));
        }

        const payload = await response.json();
        if (!payload?.result || typeof payload.result !== 'object') {
            throw new Error('Invalid response contract: expected result object');
        }

        const result = payload.result as any;

        return {
            stats: {
                never_seen_count: parseInt(String(result?.stats?.never_seen_count || '0'), 10),
                correct_count: parseInt(String(result?.stats?.correct_count || '0'), 10),
                ever_failed_count: parseInt(String(result?.stats?.ever_failed_count || '0'), 10),
                last_attempt_failed_count: parseInt(String(result?.stats?.last_attempt_failed_count || '0'), 10),
            },
            questions: Array.isArray(result?.questions)
                ? result.questions.map((question: any) => ({
                      sys_id: String(question?.sys_id || ''),
                      question: String(question?.question || ''),
                      type: String(question?.type || ''),
                      rationale: String(question?.rationale || ''),
                      docs: String(question?.docs || ''),
                      answers: Array.isArray(question?.answers)
                          ? question.answers.map((answer: any) => ({
                                sys_id: String(answer?.sys_id || ''),
                                answer: String(answer?.answer || ''),
                                is_correct: String(answer?.is_correct || 'false') === 'true',
                            }))
                          : [],
                  }))
                : [],
            tests: Array.isArray(result?.tests)
                ? result.tests.map((test: any) => ({
                      sys_id: String(test?.sys_id || ''),
                      status: String(test?.status || ''),
                      result: parseInt(String(test?.result || '0'), 10),
                      created_on: String(test?.created_on || ''),
                  }))
                : [],
        };
    }

    async createTest(input: {
        collection_id: string;
        question_count: '10' | '20' | '40';
        mode: 'never_seen' | 'random' | 'last_attempt_failed' | 'ever_failed';
    }) {
        const response = await fetch(this.createTestPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-UserToken': window.g_ck,
            },
            body: JSON.stringify(input),
        });

        if (!response.ok) {
            throw new Error(await this.getErrorMessage(response));
        }

        const payload = await response.json();
        if (!payload?.result || typeof payload.result !== 'object') {
            throw new Error('Invalid response contract: expected result object');
        }

        return payload.result;
    }
}
