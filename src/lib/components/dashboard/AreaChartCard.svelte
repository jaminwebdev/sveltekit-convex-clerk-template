<script lang="ts">
	import * as Card from '@/lib/components/ui/card/index';
	import { onMount } from 'svelte';
	import ApexCharts from 'apexcharts';
	let chartEl: HTMLDivElement;

	onMount(() => {
		if (typeof window === 'undefined') return;

		const options = {
			chart: { type: 'area', height: '100%', toolbar: { show: false } },
			series: [
				{ name: 'Sales', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
				{ name: 'Another', data: [14, 33, 31, 13, 45, 52, 76, 91, 148] }
			],
			xaxis: {
				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
				labels: {
					style: {
						colors: 'var(--color-foreground)'
					}
				}
			},
			yaxis: {
				labels: {
					style: {
						colors: 'var(--color-foreground)'
					}
				}
			},
			colors: ['var(--color-primary)', 'var(--color-secondary)'],
			grid: { borderColor: '#e5e7eb' },
			dataLabels: { enabled: false },
			stroke: { curve: 'smooth', width: 3 },
			markers: {
				size: 4,
				colors: ['var(--color-primary)', 'var(--color-secondary)'],
				strokeColors: '#fff',
				strokeWidth: 2
			},
			legend: {
				labels: {
					colors: 'var(--color-foreground)'
				}
			},
			fill: {
				type: 'gradient',
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.4,
					opacityTo: 0,
					stops: [0, 100],
					colorStops: [
						[
							{
								offset: 0,
								color: 'var(--color-primary)',
								opacity: 0.4
							},
							{
								offset: 100,
								color: 'var(--color-primary)',
								opacity: 0
							}
						],
						[
							{
								offset: 0,
								color: 'var(--color-secondary)',
								opacity: 0.4
							},
							{
								offset: 100,
								color: 'var(--color-secondary)',
								opacity: 0
							}
						]
					]
				}
			}
		};
		new ApexCharts(chartEl, options).render();
	});
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Sales Overview</Card.Title>
		<Card.Description>Monthly sales trend</Card.Description>
	</Card.Header>
	<Card.Content style="height: 300px;">
		<div bind:this={chartEl} style="height: 100%;"></div>
	</Card.Content>
</Card.Root>
