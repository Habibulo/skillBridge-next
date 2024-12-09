import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Box, Button, Menu, MenuItem, Pagination, Stack, Typography } from '@mui/material';
import JobCard from '../../libs/components/job/JobCard';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import Filter from '../../libs/components/job/Filter';
import { useRouter } from 'next/router';
import { JobsInquiry } from '../../libs/types/job/job.input';
import { Job } from '../../libs/types/job/job';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Direction, Message } from '../../libs/enums/common.enum';
import { GET_JOB, GET_JOBS } from '../../apollo/user/query';
import { useMutation, useQuery } from '@apollo/client';
import { T } from '../../libs/types/common';
import { LIKE_TARGET_JOB } from '../../apollo/user/mutation';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const JobList: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [searchFilter, setSearchFilter] = useState<JobsInquiry>(
		router?.query?.input ? JSON.parse(router?.query?.input as string) : initialInput,
	);
	const [jobs, setJobs] = useState<Job[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [sortingOpen, setSortingOpen] = useState(false);
	const [filterSortName, setFilterSortName] = useState('New');

	/** APOLLO REQUESTS **/
	const [likeTargetJob] = useMutation(LIKE_TARGET_JOB);
	const {
		loading: getJobsLoading, //-> loading jarayoni yani backend dan data olish jarayonida qanaqadur animatsiyalarni korsatishimiz mumkun.
		data: getJobsData, //-> data kirib kelgandan keyin onComplete etapi ishga tushadi.
		error: getJobsError, //-> data kirib kelgunga qadar qandaydur errorlar hosil bolsa errorni korsatish.
		refetch: getJobsRefetch,
	} = useQuery(GET_JOB, {
		fetchPolicy: 'network-only', //->chashimizdsan foydalanmagan xolda togridan togri faqatgina bizi backentimizdan qabul etayotgan malumotlarni bizga taqdim etsin 
		variables: { input: searchFilter }, //-> variable lar bu qaysi turdagi malumotlarni serverga yuborish
		notifyOnNetworkStatusChange: true, //-> va qayta malumotlar ozgarganda update qilishda bu mantiq ishlatiladi. va bullar hammasi options ichida mujassam boladi.
		onCompleted: (data: T) => {
			setJobs(data?.getJobs?.list); //-> backend dan birinchi data olinganda onComplete ishga tushadi.
			setTotal(data?.getJobs?.metaCounter[0]?.total);
		},
	});
	/** LIFECYCLES **/
	useEffect(() => {
		if (router.query.input) {
			const inputObj = JSON.parse(router?.query?.input as string);
			setSearchFilter(inputObj);
		}

		setCurrentPage(searchFilter.page === undefined ? 1 : searchFilter.page);
	}, [router]);

	useEffect(() => {
		console.log('+++searchFilter:', searchFilter);
		//Backend Refetch
		// getJobsRefetch({ input: searchFilter }).then();
	}, [searchFilter]);

	/** HANDLERS **/
	const handlePaginationChange = async (event: ChangeEvent<unknown>, value: number) => {
		searchFilter.page = value;
		await router.push(
			`/job?input=${JSON.stringify(searchFilter)}`,
			`/job?input=${JSON.stringify(searchFilter)}`,
			{
				scroll: false,
			},
		);
		setCurrentPage(value);
	};

	const likeJobHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
			//execute likeTargetJob Mutation
			await likeTargetJob({ variables: { input: id } });

			// execute getJobsRefetch
			await getJobsRefetch({ input: initialInput });

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('Error, on likeTargetJob', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	const sortingClickHandler = (e: MouseEvent<HTMLElement>) => {
		setAnchorEl(e.currentTarget);
		setSortingOpen(true);
	};

	const sortingCloseHandler = () => {
		setSortingOpen(false);
		setAnchorEl(null);
	};

	const sortingHandler = (e: React.MouseEvent<HTMLLIElement>) => {
		switch (e.currentTarget.id) {
			case 'new':
				setSearchFilter({ ...searchFilter, sort: 'createdAt', direction: Direction.ASC });
				setFilterSortName('New');
				break;
			case 'lowest':
				setSearchFilter({ ...searchFilter, sort: 'jobSalary', direction: Direction.ASC });
				setFilterSortName('Lowest Price');
				break;
			case 'highest':
				setSearchFilter({ ...searchFilter, sort: 'jobSalary', direction: Direction.DESC });
				setFilterSortName('Highest Price');
		}
		setSortingOpen(false);
		setAnchorEl(null);
	};

		return (
			<div id="property-list-page" style={{ position: 'relative' }}>
				<div className="container">
					<Box component={'div'} className={'right'}>
						<span>Sort by</span>
						<div>
							<Button onClick={sortingClickHandler} endIcon={<KeyboardArrowDownRoundedIcon />}>
								{filterSortName}
							</Button>
							<Menu anchorEl={anchorEl} open={sortingOpen} onClose={sortingCloseHandler} sx={{ paddingTop: '5px' }}>
								<MenuItem
									onClick={sortingHandler}
									id={'new'}
									disableRipple
									sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
								>
									New
								</MenuItem>
								<MenuItem
									onClick={sortingHandler}
									id={'lowest'}
									disableRipple
									sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
								>
									Lowest Price
								</MenuItem>
								<MenuItem
									onClick={sortingHandler}
									id={'highest'}
									disableRipple
									sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
								>
									Highest Price
								</MenuItem>
							</Menu>
						</div>
					</Box>
					<Stack className={'property-page'}>
						<Stack className={'filter-config'}>
							{/* @ts-ignore */}
							<Filter searchFilter={searchFilter} setSearchFilter={setSearchFilter} initialInput={initialInput} />
						</Stack>
						<Stack className="main-config" mb={'76px'}>
							<Stack className={'list-config'}>
								{jobs?.length === 0 ? (
									<div className={'no-data'}>
										<img src="/img/icons/icoAlert.svg" alt="" />
										<p>No Jobs found!</p>
									</div>
								) : (
									jobs.map((job: Job) => {
										return ( <JobCard job={job} key={job?._id} likeJobHandler={likeJobHandler} /> );
									})
								)}
							</Stack>
							<Stack className="pagination-config">
								{jobs.length !== 0 && (
									<Stack className="pagination-box">
										<Pagination
											page={currentPage}
											count={Math.ceil(total / searchFilter.limit)}
											onChange={handlePaginationChange}
											shape="circular"
											color="primary"
										/>
									</Stack>
								)}

								{jobs.length !== 0 && (
									<Stack className="total-result">
										<Typography>
											Total {total} job{total > 1 ? 's' : ''} available
										</Typography>
									</Stack>
								)}
							</Stack>
						</Stack>
					</Stack>
				</div>
			</div>
		);
	};

JobList.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		sort: 'createdAt',
		direction: 'DESC',
		search: {
			text: '',
		},
	},
};

export default withLayoutBasic(JobList);

/** 
	router = Next/router dan keladi va useRouter() hook orqali yasalgan.
	useRouter() ozi nima? 
	useEffect dagi router qiymatlari ozgarsa useEffect() qayta ishga tushadi. 
	Yani componentDidMount boladi.

	router -> query paramsdagi qiymatlar ozgarsa router trigger beradi. 
						Yani useEffect() qayta ishga tushadi va inputdagi qiymatlarni 
						togridan togri router orqali oladi.

	router.query -> query paramsni olib beradi
 **/