import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import PopularJobCard from './PopularJobCa';
import { Job } from '../../types/job/job';
import Link from 'next/link';
import { JobsInquiry } from '../../types/job/job.input';
import { GET_JOBS } from '../../../apollo/user/query';
import { useQuery } from '@apollo/client';
import { T } from '../../types/common';

interface PopularJobsProps {
	initialInput: JobsInquiry;
}

const PopularJobs = (props: PopularJobsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [popularJobs, setPopularJobs] = useState<Job[]>([]);

	/** APOLLO REQUESTS **/
	const {
		loading: getJobsLoading,
		data: getJobsData,
		error: getJobsError,
		refetch: getJobsRefetch,
	} = useQuery(GET_JOBS, {
		fetchPolicy: 'cache-and-network', // cach + =>network
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setPopularJobs(data?.getJobs?.list);
		},
	});
	/** HANDLERS **/

	if (!popularJobs) return null;

		return (
			<Stack className={'popular-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Popular Jobs</span>
							<p>Popularity is based on views</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'more-box'}>
								<Link href={'/job'}>
									<span>See All Categories</span>
								</Link>
								<img src="/img/icons/rightup.svg" alt="" />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'popular-property-swiper'}
							slidesPerView={'auto'}
							spaceBetween={25}
							modules={[Autoplay, Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-popular-next',
								prevEl: '.swiper-popular-prev',
							}}
							pagination={{
								el: '.swiper-popular-pagination',
							}}
						>
							{popularJobs.map((job: Job) => {
								return (
									<SwiperSlide key={job._id} className={'popular-property-slide'}>
										<PopularJobCard job={job} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
					<Stack className={'pagination-box'}>
						<WestIcon className={'swiper-popular-prev'} />
						<div className={'swiper-popular-pagination'}></div>
						<EastIcon className={'swiper-popular-next'} />
					</Stack>
				</Stack>
			</Stack>
		);
	};

PopularJobs.defaultProps = {
	initialInput: {
		page: 1,
		limit: 7,
		sort: 'jobViews',
		direction: 'DESC',
		search: {},
	},
};

export default PopularJobs;
