"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: { message: string }[];
    action?: string;
    ref?: string;
    ref_type?: string;
  };
}

function getEventDescription(event: GitHubEvent): string {
  switch (event.type) {
    case "PushEvent":
      return event.payload.commits?.[0]?.message || "Pushed code";
    case "CreateEvent":
      return `Created ${event.payload.ref_type}: ${event.payload.ref || ""}`;
    case "PullRequestEvent":
      return `${event.payload.action} pull request`;
    case "WatchEvent":
      return "Starred repository";
    case "ForkEvent":
      return "Forked repository";
    case "IssuesEvent":
      return `${event.payload.action} issue`;
    default:
      return event.type.replace("Event", "");
  }
}

function getEventIcon(type: string): string {
  switch (type) {
    case "PushEvent": return "⬆";
    case "CreateEvent": return "✦";
    case "PullRequestEvent": return "⎇";
    case "WatchEvent": return "★";
    case "ForkEvent": return "⑂";
    case "IssuesEvent": return "◉";
    default: return "●";
  }
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function GitHubFeed() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(
          "https://api.github.com/users/ChiragDodia36/events?per_page=5"
        );
        if (res.ok) {
          const data = await res.json();
          setEvents(data.slice(0, 5));
        }
      } catch {
        // Silently fail — widget just shows empty state
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
    const interval = setInterval(fetchEvents, 5 * 60 * 1000); // Refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-xl border border-[rgba(255,255,255,0.06)] p-3 w-full">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="text-xs">⌘</span>
          <span className="text-[10px] font-medium text-white/50 uppercase tracking-wider">
            GitHub Activity
          </span>
        </div>
        <div className="flex items-center gap-1">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-[#28c840]"
          />
          <span className="text-[9px] text-white/25">Live</span>
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 rounded-md bg-[rgba(255,255,255,0.02)] animate-pulse" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <p className="text-[10px] text-white/20 text-center py-3">
          No recent activity
        </p>
      ) : (
        <div className="space-y-1.5">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-2 p-1.5 rounded-md hover:bg-[rgba(255,255,255,0.03)] transition-colors"
            >
              <span className="text-[10px] text-white/30 mt-0.5 shrink-0">
                {getEventIcon(event.type)}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-white/50 truncate">
                  {getEventDescription(event)}
                </p>
                <p className="text-[9px] text-white/20 truncate">
                  {event.repo.name.split("/")[1]}
                </p>
              </div>
              <span className="text-[9px] text-white/15 shrink-0">
                {timeAgo(event.created_at)}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
