import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Job } from '../../types/job/job';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface TrendJobCardProps {
	job: Job;
	likeJobHandler: any;
}

const TrendJobCard = (props: TrendJobCardProps) => {
	const { job, likeJobHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailHandler = async (jobId: string) => {
		console.log('jobId:', jobId);
		await router.push({ pathname: '/job/detail', query: { id: jobId } });
	};

		return (
			<Stack className="trend-card-box" key={job._id}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${job?.jobImages[0]})` }}
					onClick={() => pushDetailHandler(job._id)}
				>
					<div>${job.jobSalary}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'} onClick={() => pushDetailHandler(job._id)}>{job.jobTitle}</strong>
					<p className={'desc'}>{job.jobDescription ?? 'no description'}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{job.jobExperienceRequired} Expereince</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{job.jobPositionsAvailable} Positions</span>
						</div>
						<div>
							<img src="/img/icons/expand.svg" alt="" />
							<span>{job.jobRank} Rank</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>
							{job.jobNegotiableSalary ? 'Negitioation' : ''} {job.jobNegotiableSalary && job.jobRemoteAvailable && '/'}{' '}
							{job.jobRemoteAvailable ? 'Remote' : ''}
						</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{job?.jobViews}</Typography>
							<IconButton color={'default'} onClick={() => likeJobHandler(user, job?._id)}>
								{job?.meLiked && job?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{job?.jobLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	};

export default TrendJobCard;
