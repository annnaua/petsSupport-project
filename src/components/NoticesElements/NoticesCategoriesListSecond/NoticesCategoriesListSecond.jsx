import {
  NoticesList,
  NoticesItem,
  NoticesTop,
  NoticesNav,
  NoticesImage,
  NoticesBadge,
  // NoticesButtonFavorite,
  NoticesDescription,
  NoticesTitle,
  NoticesTags,
  NoticesTag,
  NoticesButton,
  NoticesFavorite,
  NoticesButtonFavoriteV2,
} from './NoticesCategoriesListSecond.styled';
import {
  getOwnerNotices,
  getPetAge,
  getUserFavoriteNotices,
} from '../../../helpers/noticesHelpers';
import notFoundNoticesImage from '../../../img/notFoundNoticesImage.jpg';
// import { PER_PAGE } from '../../../redux/notices/operations ';
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
//import useAuth from '../../../hooks/useAuth.js';
import {
  selectNotices,
  // selectFavoriteNotices,
  selectNoticesObj,
} from '../../../redux/notices/selectors';
import { selectFavoriteList } from '../../../redux/favorite/selectors';
import { deletefavoriteNotice } from '../../../redux/notices/noticesSlice';
import { selectUser } from '../../../redux/auth/selectors.js';
// import { display, height } from '@mui/system';
import { getNoticesById } from '../../../redux/current/operations ';
// import { useLocation } from 'react-router-dom';
import {
  addToFavorite,
  removeFromFavorite,
} from '../../../redux/favorite/operations ';
//import { deleteNotices } from '../../../redux/notices/operations ';

// import LearnMoreButton from '../NoticesDetailsCard/NoticesButton/NoticesButton';

const NoticesCategoriesListSecond = () => {
  const notices = useSelector(selectNotices);
  const favorite = useSelector(selectFavoriteList);
  const { _id } = useSelector(selectUser);
  const dispatch = useDispatch();
  const { category } = useSelector(selectNoticesObj);

  const noticesUpdated = getPetAge(
    getOwnerNotices(getUserFavoriteNotices(notices, favorite), _id)
  );
  const onFavoriteToggle = (_id, favorite) => {
    if (favorite) {
      dispatch(removeFromFavorite(_id));
      if (category === '/notices/favorite') {
        dispatch(deletefavoriteNotice(_id));
      }

      return;
    }
    dispatch(addToFavorite(_id));
  };

  return (
    <NoticesList>
      {noticesUpdated.map(
        ({
          _id,
          categoryName,
          petImageURL,
          title,
          breed,
          location,
          age,
          price,
          favorite,
          isOwner,
        }) => (
          <NoticesItem key={_id}>
            <NoticesTop>
              <NoticesNav>
                <NoticesBadge>{categoryName}</NoticesBadge>
                {/* <NoticesButtonFavorite
                  onClick={() => onFavoriteToggle(_id, favorite)}
                ></NoticesButtonFavorite> */}
                <NoticesButtonFavoriteV2
                  onClick={() => onFavoriteToggle(_id, favorite)}
                >
                  <NoticesFavorite isfavorite={favorite.toString()} />
                </NoticesButtonFavoriteV2>
              </NoticesNav>

              <NoticesImage
                src={petImageURL ? petImageURL : notFoundNoticesImage}
                alt={title}
              />
            </NoticesTop>
            <NoticesDescription>
              <NoticesTitle>{title}</NoticesTitle>
              <NoticesTags>
                {/* <NoticesTag>id: {_id}</NoticesTag> */}
                <NoticesTag>Breed: {breed}</NoticesTag>
                <NoticesTag>Place: {location}</NoticesTag>
                <NoticesTag>Age: {age}</NoticesTag>
                {categoryName === 'sell' && (
                  <NoticesTag>Price: {price}$</NoticesTag>
                )}
                {/* {favorite && isLogined && <NoticesTag>Favorite </NoticesTag>}
                {isOwner && isLogined && <NoticesTag>Owner </NoticesTag>} */}
              </NoticesTags>

              {/* <LearnMoreButton /> */}

              <NoticesButton
                onClick={() => {
                  console.log('LearnMore', _id, categoryName);
                  dispatch(getNoticesById(`${category}/${_id}`));
                }}
              >
                Learn More
              </NoticesButton>

              {/* {!favorite && (
                <NoticesButton onClick={() => dispatch(addToFavorite(_id))}>
                  add to favorite
                </NoticesButton>
              )} */}
              {/* {favorite && isLogined && (
                <NoticesButton
                  onClick={() => dispatch(removeFromFavorite(_id))}
                >
                  remove from favorite
                </NoticesButton>
              )} */}
              {/* {isOwner && isLogined && (
                <NoticesButton onClick={() => dispatch(deleteNotices(_id))}>
                  delete
                </NoticesButton>
              )} */}
            </NoticesDescription>
          </NoticesItem>
        )
      )}
    </NoticesList>
  );
};

export default NoticesCategoriesListSecond;
