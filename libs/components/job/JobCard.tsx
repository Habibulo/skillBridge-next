import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Job } from '../../types/job/job';
import Link from 'next/link';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL, topJobRank } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface JobCard {
	job: Job;
	likeJobHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const JobCard = (props: JobCard) => {
	const { job, likeJobHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = job?.jobImages[0]
		? `${REACT_APP_API_URL}/${job?.jobImages[0]}`
		: '/img/banner/header1.svg';

		return (
			<Stack className="card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/job/detail',
							query: { id: job?._id },
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
					{job && job?.jobRank > topJobRank && (
						<Box component={'div'} className={'top-badge'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<Typography>TOP</Typography>
						</Box>
					)}
					<Box component={'div'} className={'price-box'}>
						<Typography>${formatterStr(job?.jobSalary)}</Typography>
					</Box>
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							<Link
								href={{
									pathname: '/job/detail',
									query: { id: job?._id },
								}}
							>
								<Typography>{job.jobTitle}</Typography>
							</Link>
						</Stack>
						<Stack className="address">
							<Typography>
								{job.jobAddress}, {job.jobLocation}
							</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						<Stack className="option">
							<img src="/img/icons/bed.svg" alt="" /> <Typography>{job.jobEmploymentMode} mode</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/room.svg" alt="" /> <Typography>{job.jobExperienceRequired} experience</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/expand.svg" alt="" /> <Typography>{job.jobNegotiableSalary} m2</Typography>
						</Stack>
					</Stack>
					<Stack className="divider"></Stack>
					<Stack className="type-buttons">
						<Stack className="type">
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								className={job.jobPositionsAvailable ? '' : 'disabled-type'}
							>
								Rent
							</Typography>
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								className={job.jobStatus ? '' : 'disabled-type'}
							>
								Barter
							</Typography>
						</Stack>
						{!recentlyVisited && (
							<Stack className="buttons">
								<IconButton color={'default'}>
									<RemoveRedEyeIcon />
								</IconButton>
								<Typography className="view-cnt">{job?.jobViews}</Typography>
								<IconButton color={'default'} onClick={() => likeJobHandler(user, job?._id)}>
									{myFavorites ? (
										<FavoriteIcon color="primary" />
									) : job?.meLiked && job?.meLiked[0]?.myFavorite ? (
										<FavoriteIcon color="primary" />
									) : (
										<FavoriteBorderIcon />
									)}
								</IconButton>
								<Typography className="view-cnt">{job?.jobLikes}</Typography>
							</Stack>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	};

export default JobCard;
