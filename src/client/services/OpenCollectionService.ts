import { CreateQuizInput, OpenCollectionStats, OpenCollectionQuizSummary } from '../shared/models/OpenCollectionTypes';

declare global {
    interface Window {
        g_ck: string;
    }
}

export type OpenCollectionOverview = {
    stats: OpenCollectionStats;
    question_groups: {
        never_seen: string[];
        correct: string[];
        ever_failed: string[];
        last_attempt_failed: string[];
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
    quizzes: OpenCollectionQuizSummary[];
};

export class OpenCollectionService {
    private readonly overviewPath: string;
    private readonly createQuizPath: string;

    constructor() {
        this.overviewPath = '/api/x_2119443_quiz_sim/quiz_simulator_api/collections/open-overview';
        this.createQuizPath = '/api/x_2119443_quiz_sim/quiz_simulator_api/quizzes/create';
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
            question_groups: {
                never_seen: Array.isArray(result?.question_groups?.never_seen)
                    ? result.question_groups.never_seen.map((id: any) => String(id || ''))
                    : [],
                correct: Array.isArray(result?.question_groups?.correct)
                    ? result.question_groups.correct.map((id: any) => String(id || ''))
                    : [],
                ever_failed: Array.isArray(result?.question_groups?.ever_failed)
                    ? result.question_groups.ever_failed.map((id: any) => String(id || ''))
                    : [],
                last_attempt_failed: Array.isArray(result?.question_groups?.last_attempt_failed)
                    ? result.question_groups.last_attempt_failed.map((id: any) => String(id || ''))
                    : [],
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
            quizzes: Array.isArray(result?.quizzes)
                ? result.quizzes.map((quiz: any) => ({
                      sys_id: String(quiz?.sys_id || ''),
                      status: String(quiz?.status || ''),
                      result: parseInt(String(quiz?.result || '0'), 10),
                      created_on: String(quiz?.created_on || ''),
                      correct_count: parseInt(String(quiz?.correct_count || '0'), 10),
                      total_questions: parseInt(String(quiz?.total_questions || '0'), 10),
                  }))
                : [],
        };
    }

    async createQuiz(input: CreateQuizInput) {
        const response = await fetch(this.createQuizPath, {
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
