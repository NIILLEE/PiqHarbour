/* Shariff Muhammad u23611732 */

import './Avatar.css';

function Avatar({ user, size = 'md' }){

    const className = `avatar avatar--${size}`;

    if (user.avatarUrl){
        return <img src={user.avatarUrl} alt={`${user.username}'s avatar`} className={className} />;
    }

    return (
        <div className={`${className} avatar--placeholder`} aria-label={`${user.username}'s avatar`}>
            {user.username.charAt(0).toUpperCase()}
        </div>
    );

}

export default Avatar;