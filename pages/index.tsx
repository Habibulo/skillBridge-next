import { NextPage } from 'next';
import useDeviceDetect from '../libs/hooks/useDeviceDetect';
import withLayoutMain from '../libs/components/layout/LayoutHome';
import CommunityBoards from '../libs/components/homepage/CommunityBoards';
import PopularJobs from '../libs/components/homepage/PopularJobs';
import TopAgents from '../libs/components/homepage/TopAgents';
import Events from '../libs/components/homepage/Events';
import TrendJobs from '../libs/components/homepage/TrendJobs';
import TopJobs from '../libs/components/homepage/TopJobs';
import { Stack } from '@mui/material';
// import Advertisement from '../libs/components/homepage/Advertisement';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export const getStaticProps = async ({ locale }: any) => ({ props: { ...(await serverSideTranslations(locale, ['common'])), }, });

const Home: NextPage = () => {
	const device = useDeviceDetect();
		return (
			<Stack className={'home-page'}>
				<TrendJobs />
				<PopularJobs />
				<TopJobs />
				<TopAgents />
				<Events />
				<CommunityBoards />
			</Stack>
		);
	};

export default withLayoutMain(Home);
