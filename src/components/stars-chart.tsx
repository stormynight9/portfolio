'use client'

import { Icons } from '@/components/icons'
import { type transformData } from '@/components/open-source'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const chartConfig = {
    count: {
        label: 'Stars',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig

interface StarsChartProps {
    data: ReturnType<typeof transformData>
    title: string
    description: string | JSX.Element
    link: string
}

export const StarsChart = ({
    data,
    title,
    description,
    link,
}: StarsChartProps) => {
    return (
        <Card className='border-none bg-transparent'>
            <CardHeader className='px-0'>
                <div className='flex justify-between'>
                    <div>
                        <CardTitle className='text-base hover:underline'>
                            {title}
                        </CardTitle>
                        <CardDescription className='text-base'>
                            {description}
                        </CardDescription>
                    </div>
                    <div>
                        <TooltipProvider delayDuration={70}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        asChild
                                        size={'icon'}
                                        variant={'ghost'}
                                        className='shrink-0'
                                    >
                                        <Link
                                            href={link}
                                            target='_blank'
                                            aria-label='Visit Repository'
                                        >
                                            <Icons.externalLink className='size-4' />
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent
                                    side='bottom'
                                    className='text-xs'
                                >
                                    Visit Repository
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </CardHeader>
            <CardContent className='px-0 pb-2'>
                <ChartContainer
                    config={chartConfig}
                    className='aspect-auto h-72'
                >
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: -30,
                            right: 4,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={5}
                            tickCount={4}
                        />
                        <XAxis
                            dataKey='month'
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value}
                            interval={'preserveStartEnd'}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <defs>
                            <linearGradient
                                id='count'
                                x1='0'
                                y1='0'
                                x2='0'
                                y2='1'
                            >
                                <stop
                                    offset='5%'
                                    stopColor='var(--color-count)'
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset='95%'
                                    stopColor='var(--color-count)'
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>

                        <Area
                            dataKey='count'
                            type='monotone'
                            fill='url(#count)'
                            fillOpacity={0.15}
                            stroke='var(--color-count)'
                            stackId='a'
                            dot={{ fillOpacity: 1, fill: 'var(--color-count)' }}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className='items-center justify-between gap-4 px-0 pb-0 text-sm leading-3 text-muted-foreground md:pb-6'>
                <p className='pl-2'>Repository star count since creation</p>
                <p className='flex items-center gap-1'>
                    <span>{data.at(-1)?.count}</span>
                    <Icons.star className='inline-block size-3.5' />
                </p>
            </CardFooter>
        </Card>
    )
}
