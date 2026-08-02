import React, { useEffect, useMemo, useState } from 'react';
import { OpenCollectionOverview, OpenCollectionService } from '../services/OpenCollectionService';
import CreateQuizModal from './CreateQuizModal';
import OpenCollectionStatsSection from './OpenCollectionStatsSection';
import OpenCollectionTestsSection from './OpenCollectionTestsSection';
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
    onOpenTest: (testId: string, createdOn?: string) => void;
    onOpenQuestions: (filter: QuestionFilter) => void;
    onError: () => void;
}

export default function OpenCollectionPage({
    collection,
    onOpenTest,
    onOpenQuestions,
    onError,
}: OpenCollectionPageProps) {
    const openCollectionService = useMemo(() => new OpenCollectionService(), []);

    const [overview, setOverview] = useState<OpenCollectionOverview | null>(null);
    const [loading, setLoading] = useState(false);
    const [creatingTest, setCreatingTest] = useState(false);
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

    const handleCreateTest = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!collection?.sys_id) {
            onError();
            return;
        }

        try {
            setCreatingTest(true);

            const created = await openCollectionService.createTest({
                collection_id: collection.sys_id,
                question_count: questionCount,
                mode,
            });

            const createdTestId = created.test_id;
            if (!createdTestId) {
                throw new Error('Invalid response contract: test_id is required');
            }

            onOpenTest(createdTestId, created.created_on);
        } catch (err: any) {
            reportAsyncError(err, onError);
        } finally {
            setCreatingTest(false);
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
        if (creatingTest) {
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

            <OpenCollectionTestsSection loading={loading} tests={overview?.tests || []} onOpenTest={onOpenTest} />

            <CreateQuizModal
                isOpen={isCreateModalOpen}
                creatingTest={creatingTest}
                questionCount={questionCount}
                mode={mode}
                onClose={handleCloseCreateModal}
                onSubmit={handleCreateTest}
                onQuestionCountChange={setQuestionCount}
                onModeChange={setMode}
            />
        </div>
    );
}
