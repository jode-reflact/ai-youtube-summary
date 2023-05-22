import { type SummaryItem, summaryItems } from '../../dummy/summaries';

export const fetchSummary = (summaryId: string): SummaryItem | undefined => {
  return summaryItems.find((item: SummaryItem) => item.id === summaryId);
};
