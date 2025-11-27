'use client'

import {
    ContributionGraph,
    ContributionGraphBlock,
    ContributionGraphCalendar,
    ContributionGraphFooter,
    ContributionGraphLegend,
    ContributionGraphTotalCount,
    type Activity,
} from '@/components/kibo-ui/contribution-graph'
import { cn } from '@/lib/utils'

type ContributionGraphClientProps = {
    data: Activity[]
    totalCount: number
}

export const ContributionGraphClient = ({
    data,
    totalCount,
}: ContributionGraphClientProps) => {
    return (
        <ContributionGraph
            data={data}
            totalCount={totalCount}
            blockSize={11}
            blockMargin={1}
            fontSize={12}
            labels={{
                totalCount: '{{count}} contributions in {{year}}',
            }}
        >
            <ContributionGraphCalendar>
                {({ activity, dayIndex, weekIndex }) => (
                    <ContributionGraphBlock
                        activity={activity}
                        dayIndex={dayIndex}
                        weekIndex={weekIndex}
                        className={cn(
                            'dark:data-[level="0"]:fill-muted/50 data-[level="0"]:fill-muted',
                            'data-[level="1"]:fill-[#9be9a8] dark:data-[level="1"]:fill-[#0e4429]',
                            'data-[level="2"]:fill-[#40c463] dark:data-[level="2"]:fill-[#006d32]',
                            'data-[level="3"]:fill-[#30a14e] dark:data-[level="3"]:fill-[#26a641]',
                            'data-[level="4"]:fill-[#216e39] dark:data-[level="4"]:fill-[#39d353]'
                        )}
                    />
                )}
            </ContributionGraphCalendar>
            <ContributionGraphFooter>
                <ContributionGraphTotalCount />
                <ContributionGraphLegend
                    className={cn(
                        'dark:data-[level="0"]:fill-muted/50 data-[level="0"]:fill-muted',
                        'data-[level="1"]:fill-[#9be9a8] dark:data-[level="1"]:fill-[#0e4429]',
                        'data-[level="2"]:fill-[#40c463] dark:data-[level="2"]:fill-[#006d32]',
                        'data-[level="3"]:fill-[#30a14e] dark:data-[level="3"]:fill-[#26a641]',
                        'data-[level="4"]:fill-[#216e39] dark:data-[level="4"]:fill-[#39d353]'
                    )}
                />
            </ContributionGraphFooter>
        </ContributionGraph>
    )
}
