import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Job } from '../../types/job/job';
import { JobsInquiry } from '../../types/job/job.input';
import TrendJobCard from './TrendPJobsCard';
import { useMutation, useQuery } from '@apollo/client';
import { GET_JOB } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { LIKE_TARGET_JOB } from '../../../apollo/user/mutation';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { Message } from '../../enums/common.enum';

interface TrendJobsProps {
	initialInput: JobsInquiry;
}

const TrendJobs = (props: TrendJobsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [trendJobs, setTrendJobs] = useState<Job[]>([]);

	/** APOLLO REQUESTS **/
	const [likeTargetJob] = useMutation(LIKE_TARGET_JOB);

	const {
		loading: getPropertiesLoading,
		data: getPropertiesData,
		error: getPropertiesError,
		refetch: getJobsRefetch,
	} = useQuery(GET_JOB, {
		fetchPolicy: 'cache-and-network',// cache + => network
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTrendJobs(data?.getProperties?.list);
		},
	});
	
	/** HANDLERS **/
	const likeJobHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
			//execute likeTargetJob  Mutationni ishga tushirish
			await likeTargetJob({ variables: { input: id } });
			//execute getJobsRefetch
			await getJobsRefetch({ input: initialInput });
			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR,likeJobHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};


	if (trendJobs) console.log('trendJobs:', trendJobs);
	if (!trendJobs) return null;

		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Trend Properties</span>
							<p>Trend is based on likes</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'pagination-box'}>
								<WestIcon className={'swiper-trend-prev'} />
								<div className={'swiper-trend-pagination'}></div>
								<EastIcon className={'swiper-trend-next'} />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						{trendJobs.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Trends Empty
							</Box>
						) : (
							<Swiper
								className={'trend-property-swiper'}
								slidesPerView={'auto'}
								spaceBetween={15}
								modules={[Autoplay, Navigation, Pagination]}
								navigation={{
									nextEl: '.swiper-trend-next',
									prevEl: '.swiper-trend-prev',
								}}
								pagination={{
									el: '.swiper-trend-pagination',
								}}
							>
								{trendJobs.map((job: Job) => {
									return (
										<SwiperSlide key={job._id} className={'trend-property-slide'}>
											<TrendJobCard job={job} likeJobHandler={likeJobHandler} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	};

TrendJobs.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'jobLikes',
		direction: 'DESC',
		search: {},
	},
};

export default TrendJobs;
