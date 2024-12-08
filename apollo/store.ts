import { makeVar } from '@apollo/client';

import { CustomJwtPayload } from '../libs/types/customJwtPayload';
export const themeVar = makeVar({});

export const userVar = makeVar<CustomJwtPayload>({
	_id: '',
	memberType: '',
	memberStatus: '',
	memberAuthType: '',
	memberPhone: '',
	memberNick: '',
	memberFullName: '',
	memberImage: '',
	memberAddress: '',
	memberResume: '',
	memberJobs: 0,
	memberCompany: '',
	memberJoblistings: 0,
	memberApplications: 0,
	memberArticles: 0,
	memberDesc: '',
	memberPoints: 0,
	memberLikes: 0,
	memberViews: 0,
	memberComments: 0,
	memberRank: 0,
	memberWarnings: 0,
	memberBlocks: 0,
});

//@ts-ignore
export const socketVar = makeVar<WebSocket>();

// export const socketVar = makeVar<WebSocket |null>(null);