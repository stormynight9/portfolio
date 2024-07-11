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
        label: 'Count',
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
                        <CardTitle className='text-base'>{title}</CardTitle>
                        <CardDescription className='text-sm'>
                            {description}
                        </CardDescription>
                    </div>
                    <div>
                        <TooltipProvider delayDuration={70}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button
                                        asChild
                                        size={'icon'}
                                        variant={'ghost'}
                                        className='shrink-0'
                                    >
                                        <Link href={link} target='_blank'>
                                            <Icons.externalLink className='size-4' />
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent
                                    side='bottom'
                                    className='bg-transparent text-xs'
                                >
                                    Visit Repository
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </CardHeader>
            <CardContent className='px-0 pb-2'>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: -30,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickCount={3}
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
                            fillOpacity={0.4}
                            stroke='var(--color-count)'
                            stackId='a'
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className='justify-center px-0 pb-0 md:pb-6'>
                <p className='text-sm text-muted-foreground'>
                    Showing the stars count of this repository since its
                    creation
                </p>
            </CardFooter>
        </Card>
    )
}
