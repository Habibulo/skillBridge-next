import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Job } from '../../types/job/job';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL, topJobRank } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface PopularJobCardProps {
	job: Job;
}

const PopularJobCard = (props: PopularJobCardProps) => {
	const { job } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailHandler = async (jobId: string) => {
		console.log('jobId:', jobId);
		await router.push({ pathname: '/job/detail', query: { id: jobId } });
	};
	
		return (
			<Stack className="popular-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${job?.jobImages[0]})` }}
					onClick={() => pushDetailHandler(job._id)}
				>
					{job && job?.jobRank >= topJobRank ? (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					) : (
						''
					)}

					<div className={'price'}>${job.jobSalary}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'} onClick={() => pushDetailHandler(job._id)}>{job.jobTitle}</strong>
					<p className={'desc'}>{job.jobAddress}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{job?.jobExperienceRequired} Experience</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{job?.jobPositionsAvailable} Positions</span>
						</div>
						<div>
							<img src="/img/icons/expand.svg" alt="" />
							<span>{job?.jobRank} Rank</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>{job?.jobNegotiableSalary ? 'Negotiate' : 'off'}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{job?.jobViews}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	};
export default PopularJobCard;
