import React, { useState } from 'react';
import { NextPage } from 'next';
import { Pagination, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import JobCard from '../job/JobCard';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { Job } from '../../types/job/job';
import { AgentJobsInquiry } from '../../types/job/job.input';
import { T } from '../../types/common';
import { JobStatus } from '../../enums/job.enum';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import { UPDATE_JOB } from '../../../apollo/user/mutation';
import { GET_AGENT_JOBS } from '../../../apollo/user/query';
import { sweetConfirmAlert, sweetErrorHandling } from '../../sweetAlert';

const MyJobs: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const [searchFilter, setSearchFilter] = useState<AgentJobsInquiry>(initialInput);
	const [agentJobs, setagentJobs] = useState<Job[]>([]);
	const [total, setTotal] = useState<number>(0);
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** APOLLO REQUESTS **/


	const [updateJob] = useMutation(UPDATE_JOB);
	const {
		loading: getAgentJobsLoading,
		data: getAgentJobsData,
		error: getAgentJobsError,
		refetch: getAgentJobsRefetch,
	} = useQuery(GET_AGENT_JOBS, {
		fetchPolicy: 'network-only',
		variables: { input: searchFilter },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setagentJobs(data?.getAgentJobs?.list);
			setTotal(data?.getAgentJobs?.metaCounter[0]?.total ?? 0);
		},
	});

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	const changeStatusHandler = (value: JobStatus) => {
		setSearchFilter({ ...searchFilter, search: { jobStatus: value } });
	};
	
	const deleteJobHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert(' are you sure to delete this Job?')) {
				await updateJob({
					variables: {
						input: {
							_id: id,
							jobStatus: 'CLOSED',
						},
					},
				});

				await getAgentJobsRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	const updateJobHandler = async (status: string, id: string) => {
		try {
			if (await sweetConfirmAlert(` are you sure change to ${status} status?`)) {
				await updateJob({
					variables: {
						input: {
							_id: id,
							jobStatus: status,
						},
					},
				});
				await getAgentJobsRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	if (user?.memberType !== 'AGENT') {
		router.back();
	}

		return (
			<div id="my-property-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">My Properties</Typography>
						<Typography className="sub-title">We are glad to see you again!</Typography>
					</Stack>
				</Stack>
				<Stack className="property-list-box">
					<Stack className="tab-name-box">
						<Typography
							onClick={() => changeStatusHandler(JobStatus.ACTIVE)}
							className={searchFilter.search.jobStatus === JobStatus.ACTIVE ? 'active-tab-name' : 'tab-name'}
						>
							On Open Position
						</Typography>
						<Typography
							onClick={() => changeStatusHandler(JobStatus.EXPIRED)}
							className={searchFilter.search.jobStatus === JobStatus.EXPIRED ? 'active-tab-name' : 'tab-name'}
						>
							On Expired
						</Typography>
					</Stack>
					<Stack className="list-box">
						<Stack className="listing-title-box">
							<Typography className="title-text">Listing title</Typography>
							<Typography className="title-text">Date Published</Typography>
							<Typography className="title-text">Status</Typography>
							<Typography className="title-text">View</Typography>
							{searchFilter.search.jobStatus === JobStatus.ACTIVE && (
								<Typography className="title-text">Action</Typography>
							)}
						</Stack>

						{agentJobs?.length === 0 ? (
							<div className={'no-data'}>
								<img src="/img/icons/icoAlert.svg" alt="" />
								<p>No Job found!</p>
							</div>
						) : (
							agentJobs.map((job: Job) => {
								return (
									<JobCard
										job={job}
										// deleteJobHandler={deleteJobHandler}
										// updateJobHandler={updateJobHandler}
									/>
								);
							})
						)}

						{agentJobs.length !== 0 && (
							<Stack className="pagination-config">
								<Stack className="pagination-box">
									<Pagination
										count={Math.ceil(total / searchFilter.limit)}
										page={searchFilter.page}
										shape="circular"
										color="primary"
										onChange={paginationHandler}
									/>
								</Stack>
								<Stack className="total-result">
									<Typography>{total} job available</Typography>
								</Stack>
							</Stack>
						)}
					</Stack>
				</Stack>
			</div>
		);
	};

MyJobs.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		search: {
			jobStatus: 'ACTIVE',
		},
	},
};

export default MyJobs;
