import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import "../styles/ToolCard.css";

const ToolCard = ({
  id,
  title,
  createdTime,
  description,
  tags,
  contributors,
  gitlink,
  liveLink,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (id) {
      navigate(`/projects/${id}`);
    } else {
      // Fallback for state-based navigation
      navigate(`/card-details`, {
        state: {
          id,
          type: "tool",
          title,
          createdTime,
          description,
          tags,
          contributors,
          gitlink,
          liveLink,
        },
      });
    }
  };

  const isExternalLive = liveLink && (liveLink.startsWith("http://") || liveLink.startsWith("https://"));
  const detailUrl = id ? `#/projects/${id}` : null;

  return (
    <div
      className="tool-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      {/* Top Bar: Created Date, Badge, Actions */}
      <div className="tool-card-top-bar">
        <div className="tool-card-meta-left">
          {createdTime && <span className="tool-created-time">created: {createdTime}</span>}
          <span className="tool-badge">Tool</span>
        </div>

        <div className="tool-card-actions">
          {gitlink && (
            <a
              href={gitlink}
              target="_blank"
              rel="noopener noreferrer"
              className="tool-github-link"
              title="View on GitHub"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub />
            </a>
          )}
          {isExternalLive ? (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="tool-live-link"
              onClick={(e) => e.stopPropagation()}
            >
              Live <span>↗</span>
            </a>
          ) : detailUrl ? (
            <a
              href={detailUrl}
              className="tool-live-link"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleClick();
              }}
            >
              Live <span>↗</span>
            </a>
          ) : null}
        </div>
      </div>

      {/* Tool Title & Author */}
      <div className="tool-card-header">
        <h2 className="tool-card-title">{title}</h2>
        <p className="tool-card-by">
          by: <span>ProfNITT</span>
        </p>
      </div>

      {/* Description */}
      {description && <p className="tool-card-description">{description}</p>}

      {/* Tool Tags */}
      {tags && tags.length > 0 && (
        <div className="tool-card-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tool-tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Tool Information Bar ONLY (No trading performance metrics) */}
      <div className="tool-card-info-bar">
        <div className="tool-info-left">
          <span className="tool-info-label">Contributors:</span>
          <span className="tool-info-value">
            {contributors && contributors.length > 0 ? contributors.join(", ") : "ProfNITT Team"}
          </span>
        </div>
        {gitlink && (
          <div className="tool-status-pill">
            <span className="status-dot">●</span> Source Available
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolCard;
