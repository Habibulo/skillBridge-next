import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getJwtToken, logOut, updateUserInfo } from '../auth';
import { Stack, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import { MenuProps } from '@mui/material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { CaretDown } from 'phosphor-react';
import useDeviceDetect from '../hooks/useDeviceDetect';
import Link from 'next/link';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../apollo/store';
import { Logout } from '@mui/icons-material';
import { REACT_APP_API_URL } from '../config';
import { Menu, X, ChevronDown } from 'lucide-react';

const Top = () => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const { t, i18n } = useTranslation('common');
	const router = useRouter();
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const [lang, setLang] = useState<string | null>('en');
	const drop = Boolean(anchorEl2);
	const [colorChange, setColorChange] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
	let open = Boolean(anchorEl);
	const [bgColor, setBgColor] = useState<boolean>(false);
	const [logoutAnchor, setLogoutAnchor] = React.useState<null | HTMLElement>(null);
	const logoutOpen = Boolean(logoutAnchor);
	const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	/** LIFECYCLES **/
	useEffect(() => {
		if (localStorage.getItem('locale') === null) {
			localStorage.setItem('locale', 'en');
			setLang('en');
		} else {
			setLang(localStorage.getItem('locale'));
		}
	}, [router]);

	useEffect(() => {
		switch (router.pathname) {
			case '/job/detail':
				setBgColor(true);
				break;
			default:
				break;
		}
	}, [router]);

	useEffect(() => {
		const jwt = getJwtToken();
		if (jwt) updateUserInfo(jwt);
	}, []);

	/** HANDLERS **/
	const langClick = (e: any) => {
		setAnchorEl2(e.currentTarget);
	};

	const langClose = () => {
		setAnchorEl2(null);
	};

	const langChoice = useCallback(
		async (e: any) => {
			setLang(e.target.id);
			localStorage.setItem('locale', e.target.id);
			setAnchorEl2(null);
			await router.push(router.asPath, router.asPath, { locale: e.target.id });
		},
		[router],
	);

	const changeNavbarColor = () => {
		if (window.scrollY >= 50) {
			setColorChange(true);
		} else {
			setColorChange(false);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleHover = (event: any) => {
		if (anchorEl !== event.currentTarget) {
			setAnchorEl(event.currentTarget);
		} else {
			setAnchorEl(null);
		}
	};

	const solutions = [
    { name: 'Analytics', href: '#' },
    { name: 'Automation', href: '#' },
    { name: 'Reports', href: '#' }
  ];

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/property' },
    { name: 'Contact', href: '#' }
  ];

	// const StyledMenu = styled((props: MenuProps) => (
	// 	<Menu
	// 		elevation={0}
	// 		anchorOrigin={{
	// 			vertical: 'bottom',
	// 			horizontal: 'right',
	// 		}}
	// 		transformOrigin={{
	// 			vertical: 'top',
	// 			horizontal: 'right',
	// 		}}
	// 		{...props}
	// 	/>
	// ))(({ theme }) => ({
	// 	'& .MuiPaper-root': {
	// 		top: '109px',
	// 		borderRadius: 6,
	// 		marginTop: theme.spacing(1),
	// 		minWidth: 160,
	// 		color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
	// 		boxShadow:
	// 			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
	// 		'& .MuiMenu-list': {
	// 			padding: '4px 0',
	// 		},
	// 		'& .MuiMenuItem-root': {
	// 			'& .MuiSvgIcon-root': {
	// 				fontSize: 18,
	// 				color: theme.palette.text.secondary,
	// 				marginRight: theme.spacing(1.5),
	// 			},
	// 			'&:active': {
	// 				backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
	// 			},
	// 		},
	// 	},
	// }));

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', changeNavbarColor);
	}
	return (
		<nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img className="justify-items: start; text-2xl font-bold text-indigo-600" height={"40px"} width={"40px"} src="/img/logo/logoWhite.png"/>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:ml-6 md:flex md:space-x-8 items-center">
              {/* Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
                >
                  Solutions
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-3 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {solutions.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Sign in
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">
                Sign up
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            >
              Solutions
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            
            {isDropdownOpen && (
              <div className="pl-4">
                {solutions.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}

            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              >
                {item.name}
              </a>
            ))}

            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4 space-x-4">
                <button className="flex-1 px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                  Sign in
                </button>
                <button className="flex-1 px-4 py-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};


	// 	return (
	// 		<Stack className={'navbar'}>
	// 			<Stack className={`navbar-main ${colorChange ? 'transparent' : ''} ${bgColor ? 'transparent' : ''}`}>
	// 				<Stack className={'container'}>
	// 					<Box component={'div'} className={'logo-box'}>
	// 						<Link href={'/'}>
	// 							<img src="/img/logo/logoWhite.svg" alt="" />
	// 						</Link>
	// 					</Box>
	// 					<Box component={'div'} className={'router-box'}>
	// 						<Link href={'/'}>
	// 							<div>{t('Home')}</div>
	// 						</Link>
	// 						<Link href={'/property'}>
	// 							<div>{t('Properties')}</div>
	// 						</Link>
	// 						<Link href={'/agent'}>
	// 							<div> {t('Agents')} </div>
	// 						</Link>
	// 						<Link href={'/community?articleCategory=FREE'}>
	// 							<div> {t('Community')} </div>
	// 						</Link>
	// 						{user?._id && (
	// 							<Link href={'/mypage'}>
	// 								<div> {t('My Page')} </div>
	// 							</Link>
	// 						)}
	// 						<Link href={'/cs'}>
	// 							<div> {t('CS')} </div>
	// 						</Link>
	// 					</Box>
	// 					<Box component={'div'} className={'user-box'}>
	// 						{user?._id ? (
	// 							<>
	// 								<div className={'login-user'} onClick={(event: any) => setLogoutAnchor(event.currentTarget)}>
	// 									<img
	// 										src={
	// 											user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'
	// 										}
	// 										alt=""
	// 									/>
	// 								</div>

	// 								<Menu
	// 									id="basic-menu"
	// 									anchorEl={logoutAnchor}
	// 									open={logoutOpen}
	// 									onClose={() => {
	// 										setLogoutAnchor(null);
	// 									}}
	// 									sx={{ mt: '5px' }}
	// 								>
	// 									<MenuItem onClick={() => logOut()}>
	// 										<Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
	// 										Logout
	// 									</MenuItem>
	// 								</Menu>
	// 							</>
	// 						) : (
	// 							<Link href={'/account/join'}>
	// 								<div className={'join-box'}>
	// 									<AccountCircleOutlinedIcon />
	// 									<span>
	// 										{t('Login')} / {t('Register')}
	// 									</span>
	// 								</div>
	// 							</Link>
	// 						)}

	// 						<div className={'lan-box'}>
	// 							{user?._id && <NotificationsOutlinedIcon className={'notification-icon'} />}
	// 							<Button
	// 								disableRipple
	// 								className="btn-lang"
	// 								onClick={langClick}
	// 								endIcon={<CaretDown size={14} color="#616161" weight="fill" />}
	// 							>
	// 								<Box component={'div'} className={'flag'}>
	// 									{lang !== null ? (
	// 										<img src={`/img/flag/lang${lang}.png`} alt={'usaFlag'} />
	// 									) : (
	// 										<img src={`/img/flag/langen.png`} alt={'usaFlag'} />
	// 									)}
	// 								</Box>
	// 							</Button>

	// 							<StyledMenu anchorEl={anchorEl2} open={drop} onClose={langClose} sx={{ position: 'absolute' }}>
	// 								<MenuItem disableRipple onClick={langChoice} id="en">
	// 									<img
	// 										className="img-flag"
	// 										src={'/img/flag/langen.png'}
	// 										onClick={langChoice}
	// 										id="en"
	// 										alt={'usaFlag'}
	// 									/>
	// 									{t('English')}
	// 								</MenuItem>
	// 								<MenuItem disableRipple onClick={langChoice} id="kr">
	// 									<img
	// 										className="img-flag"
	// 										src={'/img/flag/langkr.png'}
	// 										onClick={langChoice}
	// 										id="uz"
	// 										alt={'koreanFlag'}
	// 									/>
	// 									{t('Korean')}
	// 								</MenuItem>
	// 								<MenuItem disableRipple onClick={langChoice} id="ru">
	// 									<img
	// 										className="img-flag"
	// 										src={'/img/flag/langru.png'}
	// 										onClick={langChoice}
	// 										id="ru"
	// 										alt={'russiaFlag'}
	// 									/>
	// 									{t('Russian')}
	// 								</MenuItem>
	// 							</StyledMenu>
	// 						</div>
	// 					</Box>
	// 				</Stack>
	// 			</Stack>
	// 		</Stack>
	// 	);
	// };

export default withRouter(Top);
