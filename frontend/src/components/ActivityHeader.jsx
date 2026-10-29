/* Shariff Muhammad 23611732 */

import { Link } from 'react-router-dom';

import Avatar from './Avatar';
import { timeAgo } from '../utils/time';

import './ActivityHeader.css';

function ActivityHeader({ owner, date, children }){

  return (
    <div className="activity-header">
      <Avatar user={owner} size="sm" />
      <div className="activity-header__text">
        <p className="activity-header__line">
          <Link to={`/profile/${owner._id}`} className="activity-header__user">
            @{owner.username}
          </Link>{' '}
          {children}
        </p>
        <time className="activity-header__time" dateTime={date}>
          {timeAgo(date)}
        </time>
      </div>
    </div>
  );
  
}

export default ActivityHeader;