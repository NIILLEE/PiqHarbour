/* Shariff Muhammad u23611732 */

import './ProfileTabs.css';

function ProfileTabs({ tab, onChange, postCount, albumCount }){

  return (
    <div className="profile-tabs" role="tablist">

      <button
        role="tab"
        aria-selected={tab === 'posts'}
        className={tab === 'posts' ? 'profile-tabs__tab profile-tabs__tab--active' : 'profile-tabs__tab'}
        onClick={() => onChange('posts')}
      >
        Posts ({postCount})
      </button>
      <button
        role="tab"
        aria-selected={tab === 'albums'}
        className={tab === 'albums' ? 'profile-tabs__tab profile-tabs__tab--active' : 'profile-tabs__tab'}
        onClick={() => onChange('albums')}
      >
        Albums ({albumCount})
      </button>

    </div>
  );
  
}

export default ProfileTabs;