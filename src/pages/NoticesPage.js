// import { Suspense } from 'react';
// import { Outlet } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import SectionContainer from '../components/SectionContainer';
import NoticesCategoriesNav from '../components/NoticesElements/NoticesCategoriesNav/NoticesCategoriesNav';
import NoticesSearch from '../components/NoticesElements/NoticesSearch/NoticesSearch';
import NoticesGallary from '../components/NoticesElements/NoticesGallary';
// import NoticesCategoriesListSecond from '../components/NoticesElements/NoticesCategoriesListSecond';
// import NoticeSpiner from '../components/NoticesElements/NoticeSpiner';
const NoticesPage = () => {
  return (
    <>
      <Helmet>
        <title>NoticesPage</title>
      </Helmet>
      <SectionContainer title="Find your favorite pet">
        {/* <NoticeSpiner /> */}
        <NoticesSearch />
        <NoticesCategoriesNav />
        {/* <NoticesCategoriesListSecond /> */}
        <NoticesGallary />
        {/* <GalleryPagination /> */}
      </SectionContainer>

      {/* <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense> */}
    </>
  );
};

export default NoticesPage;
