export type SelectedCollection = {
    sys_id: string;
    name: string;
};

export type QuestionFilter = 'all' | 'never_seen' | 'correct' | 'ever_failed' | 'last_attempt_failed';

export type QuestionCount = '10' | '20' | '40';

export type QuizMode = 'never_seen' | 'random' | 'last_attempt_failed' | 'ever_failed';

export type OpenCollectionStats = {
    never_seen_count: number;
    correct_count: number;
    ever_failed_count: number;
    last_attempt_failed_count: number;
};

export type OpenCollectionTestSummary = {
    sys_id: string;
    status: string;
    result: number;
    created_on: string;
    correct_count: number;
    total_questions: number;
};

export type CreateTestInput = {
    collection_id: string;
    question_count: QuestionCount;
    mode: QuizMode;
};
