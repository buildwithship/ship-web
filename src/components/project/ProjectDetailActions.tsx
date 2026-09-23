'use client';

import { useState } from 'react';

import {
  ArrowUp,
  Check,
  Share2,
} from 'lucide-react';

interface ProjectDetailActionsProps {
  initialPushCount: number;
  projectName: string;
}

export default function ProjectDetailActions({
  initialPushCount,
  projectName,
}: ProjectDetailActionsProps) {
  const [isPushed, setIsPushed] = useState(false);
  const [copied, setCopied] = useState(false);

  const pushCount =
    initialPushCount + (isPushed ? 1 : 0);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: projectName,
        url,
      });

      return;
    }

    await navigator.clipboard.writeText(url);

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1600);
  };

  return (
    <div className="project-detail-actions">
      <button
        type="button"
        className={`project-detail-push ${
          isPushed
            ? 'project-detail-push--active'
            : ''
        }`}
        onClick={() => {
          setIsPushed((prev) => !prev);
        }}
      >
        <ArrowUp size={18} strokeWidth={2.2} />

        PUSH {pushCount}
      </button>

      <button
        type="button"
        className="project-detail-share"
        onClick={handleShare}
      >
        {copied ? (
          <Check size={17} />
        ) : (
          <Share2 size={17} />
        )}

        {copied ? '링크 복사됨' : '공유'}
      </button>
    </div>
  );
}