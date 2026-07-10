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
        status: string;
        question: string;
        type: string;
        rationale: string;
        docs: string;
        selected_answer_ids: string[];
        answers: Array<{
            sys_id: string;
            answer: string;
            is_correct: boolean;
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
            throw new Error(errorData?.result?.error || `HTTP error ${response.status}`);
        }

        const payload = await response.json();
        if (!payload?.result || typeof payload.result !== 'object') {
            throw new Error('Invalid response contract: expected result object');
        }

        const result = payload.result as TestDetail;

        return {
            test: {
                sys_id: String(result?.test?.sys_id || ''),
                collection_id: String(result?.test?.collection_id || ''),
                collection_name: String(result?.test?.collection_name || ''),
                status: String(result?.test?.status || ''),
                result: parseInt(String(result?.test?.result || '0'), 10),
            },
            questions: Array.isArray(result?.questions)
                ? result.questions.map((question: any) => ({
                      test_question_id: String(question?.test_question_id || ''),
                      question_id: String(question?.question_id || ''),
                      status: String(question?.status || ''),
                      question: String(question?.question || ''),
                      type: String(question?.type || ''),
                      rationale: String(question?.rationale || ''),
                      docs: String(question?.docs || ''),
                      selected_answer_ids: Array.isArray(question?.selected_answer_ids)
                          ? question.selected_answer_ids.map((id: any) => String(id || ''))
                          : [],
                      answers: Array.isArray(question?.answers)
                          ? question.answers.map((answer: any) => ({
                                sys_id: String(answer?.sys_id || ''),
                                answer: String(answer?.answer || ''),
                                is_correct: String(answer?.is_correct || 'false') === 'true',
                            }))
                          : [],
                  }))
                : [],
        };
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
            throw new Error(errorData?.result?.error || `HTTP error ${response.status}`);
        }

        const data = await response.json();
        if (!data?.result || typeof data.result !== 'object') {
            throw new Error('Invalid response contract: expected result object');
        }

        return {
            test_id: String(data.result?.test_id || ''),
            saved_questions_count: parseInt(String(data.result?.saved_questions_count || '0'), 10),
        };
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
            throw new Error(errorData?.result?.error || `HTTP error ${response.status}`);
        }

        const data = await response.json();
        if (!data?.result || typeof data.result !== 'object') {
            throw new Error('Invalid response contract: expected result object');
        }

        return {
            test_id: String(data.result?.test_id || ''),
            total_questions: parseInt(String(data.result?.total_questions || '0'), 10),
            correct_count: parseInt(String(data.result?.correct_count || '0'), 10),
            failed_count: parseInt(String(data.result?.failed_count || '0'), 10),
            score_percent: parseInt(String(data.result?.score_percent || '0'), 10),
            question_results: Array.isArray(data.result?.question_results)
                ? data.result.question_results.map((item: any) => ({
                      question_id: String(item?.question_id || ''),
                      status: item?.status === 'correct' ? 'correct' : 'failed',
                  }))
                : [],
        };
    }
}
