import React, { useCallback, useEffect, useState } from 'react';
import {
	Stack,
	Typography,
	Checkbox,
	Button,
	OutlinedInput,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Tooltip,
	IconButton,
} from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { JobLocation, JobEmploymentMode } from '../../enums/job.enum';
import { JobsInquiry } from '../../types/job/job.input';
import { useRouter } from 'next/router';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { jobRank } from '../../config';
import RefreshIcon from '@mui/icons-material/Refresh';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: '200px',
		},
	},
};

interface FilterType {
	searchFilter: JobsInquiry;
	setSearchFilter: any;
	initialInput: JobsInquiry;
}

const Filter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [jobLocation, setJobLocation] = useState<JobLocation[]>(Object.values(JobLocation));
	const [jobEmploymentMode, setJobEmploymentMode] = useState<JobEmploymentMode[]>(Object.values(JobEmploymentMode));
	const [searchText, setSearchText] = useState<string>('');
	const [showMore, setShowMore] = useState<boolean>(false);

	/** LIFECYCLES **/
	useEffect(() => {
		if (searchFilter?.search?.locationList?.length == 0) {
			delete searchFilter.search.locationList;
			setShowMore(false);
			router
				.push(
					`/job?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/job?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.typeList?.length == 0) {
			delete searchFilter.search.typeList;
			router
				.push(
					`/job?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/job?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.positionsAvailableList?.length == 0) {
			delete searchFilter.search.positionsAvailableList;
			router
				.push(
					`/job?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/job?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.options?.length == 0) {
			delete searchFilter.search.options;
			router
				.push(
					`/job?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/job?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.typeIndustry?.length == 0) {
			delete searchFilter.search.typeIndustry;
			router
				.push(
					`/job?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/job?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.locationList) setShowMore(true);
	}, [searchFilter]);

	/** HANDLERS **/
	const jobLocationSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/job?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						`/job?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.locationList?.includes(value)) {
					await router.push(
						`/job?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						`/job?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('jobLocationSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, jobLocationSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const jobModeSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/job?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						`/job?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.typeList?.includes(value)) {
					await router.push(
						`/job?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/job?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('jobModeeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, jobTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const jobExperienceSelectHandler = useCallback(
		async (number: Number) => {
			try {
				if (number != 0) {
					if (searchFilter?.search?.experienceRange?.includes(number)) {
						await router.push(
							`/job?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									experienceRange: searchFilter?.search?.experienceRange?.filter((item: Number) => item !== number),
								},
							})}`,
							`/job?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									experienceRange: searchFilter?.search?.experienceRange?.filter((item: Number) => item !== number),
								},
							})}`,
							{ scroll: false },
						);
					} else {
						await router.push(
							`/job?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, experienceRange: [...(searchFilter?.search?.experienceRange || []), number] },
							})}`,
							`/job?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, experienceRange: [...(searchFilter?.search?.experienceRange || []), number] },
							})}`,
							{ scroll: false },
						);
					}
				} else {
					delete searchFilter?.search.experienceRange;
					setSearchFilter({ ...searchFilter });
					await router.push(
						`/job?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						`/job?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						{ scroll: false },
					);
				}

				console.log('jobExperienceSelectHandler:', number);
			} catch (err: any) {
				console.log('ERROR, jobExperienceSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const jobOptionSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/job?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
						})}`,
						`/job?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.options?.includes(value)) {
					await router.push(
						`/job?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								options: searchFilter?.search?.options?.filter((item: string) => item !== value),
							},
						})}`,
						`/job?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								options: searchFilter?.search?.options?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				console.log('jobOptionSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, jobOptionSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const jobPositionSelectHandler = useCallback(
		async (number: Number) => {
			try {
				if (number != 0) {
					if (searchFilter?.search?.positionsAvailableList?.includes(number)) {
						await router.push(
							`/job?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									positionsAvailableList: searchFilter?.search?.positionsAvailableList?.filter((item: Number) => item !== number),
								},
							})}`,
							`/job?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									positionsAvailableList: searchFilter?.search?.positionsAvailableList?.filter((item: Number) => item !== number),
								},
							})}`,
							{ scroll: false },
						);
					} else {
						await router.push(
							`/job?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, positionsAvailableList: [...(searchFilter?.search?.positionsAvailableList || []), number] },
							})}`,
							`/job?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, positionsAvailableList: [...(searchFilter?.search?.positionsAvailableList || []), number] },
							})}`,
							{ scroll: false },
						);
					}
				} else {
					delete searchFilter?.search.positionsAvailableList;
					setSearchFilter({ ...searchFilter });
					await router.push(
						`/job?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						`/job?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						{ scroll: false },
					);
				}

				console.log('jobPositionSelectHandler:', number);
			} catch (err: any) {
				console.log('ERROR, jobPositionSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const periodsRangeHandler = useCallback(
		async (e: any, type: string) => {
			const value = e.target.value;

			if (type == 'start') {
				await router.push(
					`/job?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							periodsRange: { ...searchFilter.search.periodsRange, start: value },
						},
					})}`,
					`/job?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							periodsRange: { ...searchFilter.search.periodsRange, start: value },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/job?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							periodsRange: { ...searchFilter.search.periodsRange, end: value },
						},
					})}`,
					`/job?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							periodsRange: { ...searchFilter.search.periodsRange, end: value },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const jobSalaryRangeHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/job?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							salaryRange: { ...searchFilter.search.salaryRange, start: value * 1 },
						},
					})}`,
					`/job?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							salaryRange: { ...searchFilter.search.salaryRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/job?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							salaryRange: { ...searchFilter.search.salaryRange, end: value * 1 },
						},
					})}`,
					`/job?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							salaryRange: { ...searchFilter.search.salaryRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(
				`/job?input=${JSON.stringify(initialInput)}`,
				`/job?input=${JSON.stringify(initialInput)}`,
				{ scroll: false },
			);
		} catch (err: any) {
			console.log('ERROR, refreshHandler:', err);
		}
	};

		return (
			<Stack className={'filter-main'}>
				<Stack className={'find-your-home'} mb={'40px'}>
					<Typography className={'title-main'}>Find Your Home</Typography>
					<Stack className={'input-box'}>
						<OutlinedInput
							value={searchText}
							type={'text'}
							className={'search-input'}
							placeholder={'What are you looking for?'}
							onChange={(e: any) => setSearchText(e.target.value)}
							onKeyDown={(event: any) => {
								if (event.key == 'Enter') {
									setSearchFilter({
										...searchFilter,
										search: { ...searchFilter.search, text: searchText },
									});
								}
							}}
							endAdornment={
								<>
									<CancelRoundedIcon
										onClick={() => {
											setSearchText('');
											setSearchFilter({
												...searchFilter,
												search: { ...searchFilter.search, text: '' },
											});
										}}
									/>
								</>
							}
						/>
						<img src={'/img/icons/search_icon.png'} alt={''} />
						<Tooltip title="Reset">
							<IconButton onClick={refreshHandler}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						Location
					</p>
					<Stack
						className={`property-location`}
						style={{ height: showMore ? '253px' : '115px' }}
						onMouseEnter={() => setShowMore(true)}
						onMouseLeave={() => {
							if (!searchFilter?.search?.locationList) {
								setShowMore(false);
							}
						}}
					>
						{jobLocation.map((location: string) => {
							return (
								<Stack className={'input-box'} key={location}>
									<Checkbox
										id={location}
										className="property-checkbox"
										color="default"
										size="small"
										value={location}
										checked={(searchFilter?.search?.locationList || []).includes(location as JobLocation)}
										onChange={jobLocationSelectHandler}
									/>
									<label htmlFor={location} style={{ cursor: 'pointer' }}>
										<Typography className="property-type">{location}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Job Employment Mode</Typography>
					{jobEmploymentMode.map((mode: string) => (
						<Stack className={'input-box'} key={mode}>
							<Checkbox
								id={mode}
								className="property-checkbox"
								color="default"
								size="small"
								value={mode}
								onChange={jobModeSelectHandler}
								checked={(searchFilter?.search?.typeList || []).includes(mode as JobEmploymentMode)}
							/>
							<label style={{ cursor: 'pointer' }}>
								<Typography className="property_type">{mode}</Typography>
							</label>
						</Stack>
					))}
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Experience</Typography>
					<Stack className="button-group">
						<Button
							sx={{
								borderRadius: '12px 0 0 12px',
								border: !searchFilter?.search?.experienceRange ? '2px solid #181A20' : '1px solid #b9b9b9',
							}}
							onClick={() => jobExperienceSelectHandler(0)}
						>
							Any
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.experienceRange?.includes(1) ? '2px solid #181A20' : '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.experienceRange?.includes(1) ? undefined : 'none',
							}}
							onClick={() => jobExperienceSelectHandler(1)}
						>
							1
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.experienceRange?.includes(2) ? '2px solid #181A20' : '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.experienceRange?.includes(2) ? undefined : 'none',
							}}
							onClick={() => jobExperienceSelectHandler(2)}
						>
							2
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.experienceRange?.includes(3) ? '2px solid #181A20' : '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.experienceRange?.includes(3) ? undefined : 'none',
							}}
							onClick={() => jobExperienceSelectHandler(3)}
						>
							3
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.experienceRange?.includes(4) ? '2px solid #181A20' : '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.experienceRange?.includes(4) ? undefined : 'none',
								borderRight: searchFilter?.search?.experienceRange?.includes(4) ? undefined : 'none',
							}}
							onClick={() => jobExperienceSelectHandler(4)}
						>
							4
						</Button>
						<Button
							sx={{
								borderRadius: '0 12px 12px 0',
								border: searchFilter?.search?.experienceRange?.includes(5) ? '2px solid #181A20' : '1px solid #b9b9b9',
							}}
							onClick={() => jobExperienceSelectHandler(5)}
						>
							5+
						</Button>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Positions</Typography>
					<Stack className="button-group">
						<Button
							sx={{
								borderRadius: '12px 0 0 12px',
								border: !searchFilter?.search?.positionsAvailableList ? '2px solid #181A20' : '1px solid #b9b9b9',
							}}
							onClick={() => jobPositionSelectHandler(0)}
						>
							Any
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.positionsAvailableList?.includes(1) ? '2px solid #181A20' : '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.positionsAvailableList?.includes(1) ? undefined : 'none',
							}}
							onClick={() => jobPositionSelectHandler(1)}
						>
							1
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.positionsAvailableList?.includes(2) ? '2px solid #181A20' : '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.positionsAvailableList?.includes(2) ? undefined : 'none',
							}}
							onClick={() => jobPositionSelectHandler(2)}
						>
							2
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.positionsAvailableList?.includes(3) ? '2px solid #181A20' : '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.positionsAvailableList?.includes(3) ? undefined : 'none',
							}}
							onClick={() => jobPositionSelectHandler(3)}
						>
							3
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.positionsAvailableList?.includes(4) ? '2px solid #181A20' : '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.positionsAvailableList?.includes(4) ? undefined : 'none',
								// borderRight: false ? undefined : 'none',
							}}
							onClick={() => jobPositionSelectHandler(4)}
						>
							4
						</Button>
						<Button
							sx={{
								borderRadius: '0 12px 12px 0',
								border: searchFilter?.search?.positionsAvailableList?.includes(5) ? '2px solid #181A20' : '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.positionsAvailableList?.includes(5) ? undefined : 'none',
							}}
							onClick={() => jobPositionSelectHandler(5)}
						>
							5+
						</Button>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Options</Typography>
					<Stack className={'input-box'}>
						<Checkbox
							id={'Barter'}
							className="property-checkbox"
							color="default"
							size="small"
							value={'jobNegotiableSalary'}
							checked={(searchFilter?.search?.options || []).includes('jobNegotiableSalary')}
							onChange={jobOptionSelectHandler}
						/>
						<label htmlFor={'Barter'} style={{ cursor: 'pointer' }}>
							<Typography className="propert-type">Barter</Typography>
						</label>
					</Stack>
					<Stack className={'input-box'}>
						<Checkbox
							id={'Rent'}
							className="property-checkbox"
							color="default"
							size="small"
							value={'jobRemoteAvailable'}
							checked={(searchFilter?.search?.options || []).includes('jobRemoteAvailable')}
							onChange={jobOptionSelectHandler}
						/>
						<label htmlFor={'Rent'} style={{ cursor: 'pointer' }}>
							<Typography className="propert-type">Rent</Typography>
						</label>
					</Stack>
				</Stack>
				{/* <Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Salary Range</Typography>
					<Stack className="square-year-input">
						<FormControl>
							<InputLabel id="demo-simple-select-label">Min</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={searchFilter?.search?.periodsRange?.start ?? 0}
								label="Min"
								onChange={(e: any) => periodsRangeHandler(e, 'start')}
								MenuProps={MenuProps}
							>
								{periodsRange.map((square: number) => (
									<MenuItem
										value={square}
										disabled={(searchFilter?.search?.periodsRange?.end || 0) < square}
										key={square}
									>
										{square}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<div className="central-divider"></div>
						<FormControl>
							<InputLabel id="demo-simple-select-label">Max</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={searchFilter?.search?.periodsRange?.end ?? 500}
								label="Max"
								onChange={(e: any) => periodsRangeHandler(e, 'end')}
								MenuProps={MenuProps}
							>
								{periodRange.map((square: number) => (
									<MenuItem
										value={square}
										disabled={(searchFilter?.search?.periodsRange?.start || 0) > square}
										key={square}
									>
										{square}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>
				</Stack> */}
				<Stack className={'find-your-home'}>
					<Typography className={'title'}>Salary Range</Typography>
					<Stack className="square-year-input">
						<input
							type="number"
							placeholder="$ min"
							min={0}
							value={searchFilter?.search?.salaryRange?.start ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									jobSalaryRangeHandler(e.target.value, 'start');
								}
							}}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder="$ max"
							value={searchFilter?.search?.salaryRange?.end ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									jobSalaryRangeHandler(e.target.value, 'end');
								}
							}}
						/>
					</Stack>
				</Stack>
			</Stack>
		);
	};

export default Filter;
