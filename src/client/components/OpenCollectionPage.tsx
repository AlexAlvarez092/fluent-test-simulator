import React, { useEffect, useMemo, useState } from 'react';
import { OpenCollectionOverview, OpenCollectionService } from '../services/OpenCollectionService';
import CreateQuizModal from './CreateQuizModal';
import OpenCollectionStatsSection from './OpenCollectionStatsSection';
import OpenCollectionQuizzesSection from './OpenCollectionQuizzesSection';
import {
    OpenCollectionStats,
    QuestionCount,
    QuestionFilter,
    QuizMode,
    SelectedCollection,
} from '../shared/models/OpenCollectionTypes';
import { reportAsyncError } from '../shared/services/errorHandling';

interface OpenCollectionPageProps {
    collection: SelectedCollection | null;
    onOpenQuiz: (quizId: string, createdOn?: string) => void;
    onOpenQuestions: (filter: QuestionFilter) => void;
    onError: () => void;
}

export default function OpenCollectionPage({
    collection,
    onOpenQuiz,
    onOpenQuestions,
    onError,
}: OpenCollectionPageProps) {
    const openCollectionService = useMemo(() => new OpenCollectionService(), []);

    const [overview, setOverview] = useState<OpenCollectionOverview | null>(null);
    const [loading, setLoading] = useState(false);
    const [creatingQuiz, setCreatingQuiz] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [questionCount, setQuestionCount] = useState<QuestionCount>('10');
    const [mode, setMode] = useState<QuizMode>('never_seen');

    const loadOverview = async () => {
        if (!collection?.sys_id) {
            return;
        }

        try {
            setLoading(true);
            const data = await openCollectionService.getOverview(collection.sys_id);
            setOverview(data);
        } catch (err: any) {
            reportAsyncError(err, onError);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadOverview();
    }, [collection?.sys_id, openCollectionService]);

    const handleCreateQuiz = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!collection?.sys_id) {
            onError();
            return;
        }

        try {
            setCreatingQuiz(true);

            const created = await openCollectionService.createQuiz({
                collection_id: collection.sys_id,
                question_count: questionCount,
                mode,
            });

            const createdQuizId = created.quiz_id;
            if (!createdQuizId) {
                throw new Error('Invalid response contract: quiz_id is required');
            }

            onOpenQuiz(createdQuizId, created.created_on);
        } catch (err: any) {
            reportAsyncError(err, onError);
        } finally {
            setCreatingQuiz(false);
        }
    };

    if (!collection) {
        return (
            <div>
                <h1>Collection</h1>
                <p>No collection selected.</p>
            </div>
        );
    }

    const stats: OpenCollectionStats = overview?.stats || {
        never_seen_count: 0,
        correct_count: 0,
        ever_failed_count: 0,
        last_attempt_failed_count: 0,
    };
    const allQuestionsCount = overview?.questions?.length || 0;

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        if (creatingQuiz) {
            return;
        }

        setIsCreateModalOpen(false);
    };

    return (
        <div>
            <h1>{collection.name}</h1>

            <OpenCollectionStatsSection
                loading={loading}
                stats={stats}
                allQuestionsCount={allQuestionsCount}
                onOpenQuestions={onOpenQuestions}
                onOpenCreateModal={handleOpenCreateModal}
            />

            <OpenCollectionQuizzesSection loading={loading} quizzes={overview?.quizzes || []} onOpenQuiz={onOpenQuiz} />

            <CreateQuizModal
                isOpen={isCreateModalOpen}
                creatingQuiz={creatingQuiz}
                questionCount={questionCount}
                mode={mode}
                onClose={handleCloseCreateModal}
                onSubmit={handleCreateQuiz}
                onQuestionCountChange={setQuestionCount}
                onModeChange={setMode}
            />
        </div>
    );
}
