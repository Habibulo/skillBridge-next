import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import TopJobCard from './TopJobCard';
import { JobsInquiry } from '../../types/job/job.input';
import { Job } from '../../types/job/job';
import { useMutation, useQuery } from '@apollo/client';
import { GET_JOBS } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { LIKE_TARGET_JOB } from '../../../apollo/user/mutation';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { Message } from '../../enums/common.enum';

interface TopJobsProps {
	initialInput: JobsInquiry;
}

const TopJobs = (props: TopJobsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [topJobs, setTopJobs] = useState<Job[]>([]);

	/** APOLLO REQUESTS **/
	const [likeTargetJob] = useMutation(LIKE_TARGET_JOB);

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
			setTopJobs(data?.getJobs?.list);
		},
	});

	/** HANDLERS **/
	const likeJobHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
			//execute likeTargetjob  Mutationni ishga tushirish
			await likeTargetJob({ variables: { input: id } });
			//execute getJobsRefetch
			await getJobsRefetch({ input: initialInput });
			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR,likeJobHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};
		return (
			<Stack className={'top-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Top Jobs</span>
							<p>Check out our Top Jobs</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'pagination-box'}>
								<WestIcon className={'swiper-top-prev'} />
								<div className={'swiper-top-pagination'}></div>
								<EastIcon className={'swiper-top-next'} />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'top-property-swiper'}
							slidesPerView={'auto'}
							spaceBetween={15}
							modules={[Autoplay, Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-top-next',
								prevEl: '.swiper-top-prev',
							}}
							pagination={{
								el: '.swiper-top-pagination',
							}}
						>
							{topJobs.map((job: Job) => {
								return (
									<SwiperSlide className={'top-property-slide'} key={job?._id}>
										<TopJobCard job={job} likeJobHandler = {likeJobHandler}/>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	};

TopJobs.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'jobRank',
		direction: 'DESC',
		search: {},
	},
};

export default TopJobs;
