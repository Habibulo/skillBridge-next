import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Job } from '../../types/job/job';
import { REACT_APP_API_URL } from '../../config';
import { formatterStr } from '../../utils';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface JobBigCardProps {
	job: Job;
	likeJobHandler?: any;
}

const JobBigCard = (props: JobBigCardProps) => {
	const { job, likeJobHandler } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** HANDLERS **/
	const goJobDetatilPage = (jobId: string) => {
		router.push(`/job/detail?id=${jobId}`);
	};

	return (
			<Stack className="property-big-card-box" onClick={() => goJobDetatilPage(job?._id)}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${job?.jobImages?.[0]})` }}
				>
					{job && job?.jobRank >= 50 && (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					)}

					<div className={'price'}>${formatterStr(job?.jobSalary)}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{job?.jobTitle}</strong>
					<p className={'desc'}>{job?.jobAddress}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{job?.jobExperienceRequired} Experience </span>
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
						<div>
							{job?.jobNegotiableSalary ? <p>Negotioation</p> : <span>Negotioation</span>}
							{job?.jobRemoteAvailable ? <p>Remote</p> : <span>Remote</span>}
						</div>
						<div className="buttons-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{job?.jobViews}</Typography>
							<IconButton
								color={'default'}
								onClick={(e: any) => {
									e.stopPropagation();
									likeJobHandler(user, job?._id);
								}}
							>
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

export default JobBigCard;
