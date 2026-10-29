/* Shariff Muhammad u23611732 */

import { useState } from 'react';
import { API_URL } from '../api';

import './ReportPost.css';

function ReportPost({ alreadyReported, onSubmit }){

  const [open, setOpen] = useState(false);
  const [reasons, setReasons] = useState([]);
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');

  async function openForm(){

    setOpen(true);
    setError('');

    if (reasons.length > 0) return;

    try {
      const response = await fetch(`${API_URL}/reasons`);
      const data = await response.json();

      if (data.success){
        setReasons(data.reasons);
      } else {
        setError(data.message);
      }

    } catch {
      setError('Could not load report reasons.');
    }

  }

  async function handleSubmit(e){

    e.preventDefault();

    if (!selected){
      setError('Please choose a reason.');
      return;
    }

    const message = await onSubmit(selected);

    if (message){
      setError(message);
      return;
    }

    setOpen(false);
    setSelected('');
    setError('');

  }

  if (alreadyReported){
    return <p className="report__done">You have reported this post.</p>;
  }

  if (!open){
    return (
      <button className="report__open-btn" onClick={openForm}>
        Report post
      </button>
    );
  }

  return (
    <form className="report" onSubmit={handleSubmit} noValidate>
      <fieldset className="report__fieldset">
        <legend>Why are you reporting this post?</legend>
        {reasons.map((reason) => (
          <div key={reason._id} className="report__option">
            <input
              type="radio"
              id={`reason-${reason._id}`}
              name="reason"
              value={reason.label}
              checked={selected === reason.label}
              onChange={() => setSelected(reason.label)}
            />
            <label htmlFor={`reason-${reason._id}`}>{reason.label}</label>
          </div>
        ))}
      </fieldset>

      {error && <span className="report__error">{error}</span>}

      <div className="report__actions">
        <button type="submit">Submit report</button>
        <button type="button" onClick={() => setOpen(false)}>Cancel</button>
      </div>
    </form>
  );
  
}

export default ReportPost;