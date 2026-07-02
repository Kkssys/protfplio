import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

function StarButton() {
  const [starCount, setStarCount] = useState(null);
  const [isStarred, setIsStarred] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const username = process.env.REACT_APP_GITHUB_USERNAME || 'Kkssys';
  const repo = process.env.REACT_APP_GITHUB_REPO || 'GD';
  const token = process.env.REACT_APP_GITHUB_TOKEN;

  // Fetch current star count
  useEffect(() => {
    const fetchStarData = async () => {
      try {
        // Get star count (no token needed for public repos)
        const repoRes = await fetch(`https://api.github.com/repos/${username}/${repo}`);
        if (repoRes.ok) {
          const repoData = await repoRes.json();
          setStarCount(repoData.stargazers_count || 0);
        }
      } catch (err) {
        console.error('Error fetching star data:', err);
      }
    };

    fetchStarData();
  }, [username, repo]);

  const handleStar = async () => {
    if (!token) {
      setError('⚠️ GitHub token not configured. Add REACT_APP_GITHUB_TOKEN to .env');
      setTimeout(() => setError(null), 5000);
      return;
    }

    setIsLoading(true);
    setError(null);
    setMessage('');

    try {
      const method = isStarred ? 'DELETE' : 'PUT';
      const response = await fetch(
        `https://api.github.com/user/starred/${username}/${repo}`,
        {
          method: method,
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Length': '0',
          },
        }
      );

      if (response.status === 204) {
        setIsStarred(!isStarred);
        setStarCount(prev => (isStarred ? prev - 1 : prev + 1));
        setMessage(isStarred ? 'Unstarred! ⭐' : 'Starred! ⭐');
        setTimeout(() => setMessage(''), 3000);
      } else if (response.status === 401) {
        setError('Invalid token. Please check your GitHub token.');
      } else if (response.status === 403) {
        setError('Rate limit exceeded. Try again later.');
      } else {
        setError('Something went wrong. Try again.');
      }
    } catch (err) {
      setError('Network error. Check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // ALWAYS render the button (no condition here)
  return (
    <div className="star-button-container">
      <button
        className={`star-button ${isStarred ? 'starred' : ''}`}
        onClick={handleStar}
        disabled={isLoading}
        aria-label={isStarred ? 'Unstar this repository' : 'Star this repository'}
      >
        <FaStar className={`star-icon ${isStarred ? 'active' : ''}`} />
        <span className="star-text">
          {isLoading ? '...' : isStarred ? 'Starred' : 'Star'}
        </span>
        {starCount !== null && (
          <span className="star-count">{starCount}</span>
        )}
      </button>
      {error && <span className="star-error">{error}</span>}
      {message && <span className="star-message">{message}</span>}
    </div>
  );
}

export default StarButton;